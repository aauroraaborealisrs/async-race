import { Car } from "../types/Car";
import { deleteCar } from "../api/deleteCar";
import { updateCar } from "../api/updateCar";
import { animation } from "./animation";

import {
  updateGarageHeaderWithCarCount,
  Pages,
} from "./updateGarageHeaderWithCarCount";

async function getTotalPages() {
  const totalPages = await Pages();
  console.log(totalPages);
}

let verifyId: number;

export function createCarLine(car: Car): HTMLDivElement {
  const carLine = document.createElement("div");
  carLine.className = "car-line";
  carLine.id = `car-id-${car.id}`;

  const horizontalStuff = document.createElement("div");
  horizontalStuff.className = "car-line-horizontal";

  const carDiv = document.createElement("div");
  carDiv.className = "car";
  carDiv.id = `car-id-div-${car.id}`;
  carDiv.style.backgroundColor = car.color;

  const carNameSpan = document.createElement("div");
  carNameSpan.textContent = car.name;
  carNameSpan.className = "car-name";

  const buttonsPlaceholder = document.createElement("div");

  const selectButton = document.createElement("button");
  selectButton.className = "select-btn button";
  selectButton.textContent = "Select";

  selectButton.addEventListener("click", (event) => {
    event.preventDefault();
    const selectedCar = { name: car.name, color: car.color, id: car.id };
    verifyId = selectedCar.id;

    const updateCarNameInput = document.getElementById(
      "update-car-name",
    ) as HTMLInputElement;
    const updateCarColorInput = document.getElementById(
      "update-car-color",
    ) as HTMLInputElement;
    updateCarNameInput.value = selectedCar.name;
    updateCarColorInput.value = selectedCar.color;

    const updateButton = document.getElementById(
      "update-btn",
    ) as HTMLButtonElement;
    updateButton.disabled = false;

    updateButton.addEventListener("click", async (event) => {
      event.preventDefault();
      updateButton.disabled = true;

      const updatedCarName = document.getElementById(
        "update-car-name",
      ) as HTMLInputElement;
      const updatedCarColor = document.getElementById(
        "update-car-color",
      ) as HTMLInputElement;

      const updatedCarData = {
        name: updatedCarName.value,
        color: updatedCarColor.value,
      };

      updatedCarName.value = "";

      if (verifyId !== null) {
        try {
          await updateCar(verifyId, updatedCarData);
          console.log("Selected car updated successfully");

          const updatedCarLine = createCarLine({ ...car, ...updatedCarData });
          const oldCarElement = document.getElementById(`car-id-${verifyId}`);
          if (oldCarElement) {
            oldCarElement.replaceWith(updatedCarLine);
          }
        } catch (error) {
          console.error("Error updating selected car:", error);
        }
      } else {
        console.error("No car selected for update");
      }
    });
  });

  const removeButton = document.createElement("button");
  removeButton.className = "remove-btn button";
  removeButton.textContent = "Remove";

  removeButton.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      await deleteCar(car.id);
      const carBlock = document.getElementById(`car-id-${car.id}`);
      if (carBlock) {
        carBlock.remove();
        updateGarageHeaderWithCarCount();
        getTotalPages();
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  });

  const statePlaceholder = document.createElement("div");
  statePlaceholder.className = "state-btn";

  const startButton = document.createElement("button");
  startButton.className = "start-btn button";
  startButton.textContent = "▶";
  // startButton.id = `${car.id}`;
  startButton.addEventListener("click", () => {
      animation(car.id, "started");
      stopButton.disabled = false;
      startButton.disabled = true;
  });
  const stopButton = document.createElement("button");
  stopButton.className = "stop-btn button";
  stopButton.textContent = "❚❚";
  stopButton.disabled = true;

  const hr = document.createElement("hr");
  hr.className = "striped-line";

  const flagDiv = document.createElement("div");
  flagDiv.className = "flag";

  const carContainer = document.getElementById('car-container');
  
  if (carContainer) {
      const childCount = carContainer.children.length;
        if (childCount >= 7) {
        flagDiv.style.display = 'none'; //.style.visibility = 'hidden';
      } else {
          flagDiv.style.display = 'block'; //.style.visibility = 'visible';
      }
  }

  carLine.appendChild(horizontalStuff);
  horizontalStuff.appendChild(statePlaceholder);
  statePlaceholder.appendChild(startButton);
  statePlaceholder.appendChild(stopButton);
  horizontalStuff.appendChild(carDiv);
  horizontalStuff.appendChild(carNameSpan);
  horizontalStuff.appendChild(buttonsPlaceholder);
  buttonsPlaceholder.appendChild(selectButton);
  buttonsPlaceholder.appendChild(removeButton);
  horizontalStuff.appendChild(flagDiv);
  carLine.appendChild(hr);

  return carLine;
}
