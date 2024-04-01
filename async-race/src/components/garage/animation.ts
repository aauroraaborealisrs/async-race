import { startAnimation } from "./startAnimation";

interface WinnerCandidate {
 res: number;
 id: number;
}

export async function animation(carId: number, status: string, results: WinnerCandidate[]) {
  const url = `http://127.0.0.1:3000/engine?id=${carId}&status=${status}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const { velocity, distance } = JSON.parse(JSON.stringify(data));
    const [animationPromise, cancelAnimation] = startAnimation(
      carId,
      distance,
      velocity,
    );

    if (response.ok) {
      const driveResponse = await fetch(
        `http://127.0.0.1:3000/engine?id=${carId}&status=drive`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!driveResponse.ok) {
        const broken = document.getElementById(`car-id-div-${carId}`);
        if (broken) {
          if (broken.style.left != "0px") {
            broken.classList.add("red");
          }
        }
        cancelAnimation();
        // console.log(
        //   `У вас двигатель умер. ${carId}status: ${driveResponse.status}`,
        // );
      }

      // console.log(animationPromise)
      const result = await animationPromise;

      let winnerCandidate = {
      res: result,
      id: carId
      }

      const carElement = document.getElementById(`car-id-div-${carId}`);
      if (carElement){
        if (!carElement.classList.contains('red')){
          results.push(winnerCandidate);
        }
      }
      

    if (driveResponse.status === 404 || driveResponse.status === 429) {
        console.log(`Это баг сервака в дс говорили не снимайте пж(( status: ${driveResponse.status}`);
    }
    // if (!driveResponse.ok) {
    //   const broken = document.getElementById(`car-id-div-${carId}`);
    //   if (broken) {
    //     if (broken.style.left != "0px") {
    //       broken.classList.add("red");
    //     }
    //   }
    //   cancelAnimation();
    //   console.log(
    //     `У вас двигатель умер. ${carId}status: ${driveResponse.status}`,
    //   );
    // }
    }


let winner = results[0].id;
let winnerTime = results[0].res;

let winnerSend = {
 id: winner,
 time: winnerTime
};

    return winnerSend;

  } catch (error) {
    console.log("There was a problem with your fetch operation:", error);
  }
}
