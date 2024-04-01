import { startAnimation } from "./startAnimation";

export async function animation(carId: number, status: string) {
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

    if (driveResponse.status === 404 || driveResponse.status === 429) {
        console.log(`Это баг сервака в дс говорили не снимайте пж(( status: ${driveResponse.status}`);
    }
      if (driveResponse.status  === 500) {
        const broken = document.getElementById(`car-id-div-${carId}`);
        if (broken) {
          if (broken.style.left != "0px") {
            broken.classList.add("red");
          }
        }

        cancelAnimation();
        console.log(
          `У вас двигатель умер. status: ${driveResponse.status}`,
        );
      }
    }

    return data;
  } catch (error) {
    console.log("There was a problem with your fetch operation:", error);
  }
}
