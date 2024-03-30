import { Car } from "../types/Car";
import { updateGarageHeaderWithCarCount, Pages } from "./updateGarageHeaderWithCarCount";

async function getTotalPages() {
  let totalPages = await Pages();
  console.log(totalPages);
}

const selectedCarId = null;
let verifyId: number;

async function deleteCar(carId: number): Promise<void> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Car deleted successfully");
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function updateCar(
  carId: number,
  updatedCarData: { name: string; color: string },
): Promise<void> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCarData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Car updated successfully");
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

export function createCarLine(car: Car): HTMLDivElement {
  const carLine = document.createElement("div");
  carLine.className = "car-line";
  carLine.id = `car-id-${car.id}`;

  const carDiv = document.createElement("div");
  carDiv.className = "car";
  carDiv.id = `car-id-${car.id}`;

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
    console.log("Select button clicked");

    console.log("внизу будет selectedCar ");
    const selectedCar = { name: car.name, color: car.color, id: car.id };
    verifyId = selectedCar.id;

    console.log(selectedCar);

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

  carLine.appendChild(carDiv);
  carLine.appendChild(carNameSpan);
  carLine.appendChild(buttonsPlaceholder);
  buttonsPlaceholder.appendChild(selectButton);
  buttonsPlaceholder.appendChild(removeButton);

  return carLine;
}
