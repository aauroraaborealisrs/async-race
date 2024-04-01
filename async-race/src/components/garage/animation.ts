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
      //   throw new Error(`HTTP error! status: ${response.status}`);
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
          //   broken.style.backgroundColor = "red";
          // broken.classList.add("red");
          if (broken.style.left != "0px") {
            // Если условие выполняется, добавляем класс
            broken.classList.add("red");
          }
        }

        cancelAnimation();
        // console.error(
        //   `Drive mode switch failed! status: ${driveResponse.status}`,
        // );
      }
    }

    return data;
  } catch (error) {
    // console.error("There was a problem with your fetch operation:", error);
  }
}
