import { Car } from "../types/Car";
import { createCarLine } from "./carLineCreator";
import { postCar } from "../api/postCar";
import {
  updateGarageHeaderWithCarCount,
  Pages,
} from "./updateGarageHeaderWithCarCount";
import "./garage.css";
import { carBrands, carModels, carColors } from "../types/randomCarData";
import { buttonsState } from "./buttonsState";
import { startRaceListener } from "../race/startRace";
import { resetButtonHandler } from "./resetButton";

const lastCarId = 5;
const carsNumber = 0;
const currentPage = 1;

async function getTotalPages(): Promise<number> {
  const totalPages = await Pages();
  return totalPages;
}

const totalPages = getTotalPages();

export default class GarageView {
  public static renderMenu(): void {
    const menuContainer = document.getElementById("menu-container");
    if (menuContainer) {
      // я уберу потом этот иннер не ругай пж(((
      menuContainer.innerHTML = `
        <div class="menu">
          <div class="form">
            <form action="" id="create-car">
              <input type="text" id="create-car-name" name="car-name">
              <input type="color" id="create-car-color" name="car-color" value="#60A333">
              <input type="submit" value="create" class="btn create-btn button" id="create-btn">
            </form>
          </div>
          <div class="form">
            <form action="" id="update-car">
              <input type="text" id="update-car-name" name="car-name">
              <input type="color" id="update-car-color" name="car-color" value="#ffffff">
             <input type="submit" id="update-btn" value="update" class="btn update-btn button btn-disabled" disabled>
            </form>
          </div>
          <div class="buttons">
            <button class="btn race-btn button" id="race-btn">race</button>
            <button class="btn reset-btn btn-disabled button" id="reset-btn" disabled>reset</button>
            <button class="btn generate-btn button" id="generate-btn">generate cars</button>
          </div>
        </div>
      `;
    }
  }

  public static async fetchCarsAndRender(
    page: number = 1,
    limit: number = 7,
  ): Promise<void> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`,
      );
      if (!response.ok) {
        console.log("Network response was not ok");
      }
      const cars = await response.json();
      this.renderCars(cars);
      return cars;
    } catch (error) {
      console.log(
        "There has been a problem with your fetch operation:",
        error,
      );
    }
  }

  public static renderCars(cars: Car[]): void {
    const carContainer = document.getElementById("car-container");
    if (carContainer) {
      carContainer.innerHTML = "";
      cars.forEach((car) => {
        const carLine = createCarLine(car);
        carContainer.appendChild(carLine);
      });
    }
  }

  public static addCreateCarHandler(): void {
    const createButton = document.getElementById(
      "create-btn",
    ) as HTMLButtonElement;
    if (createButton) {
      createButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const carName = (
          document.getElementById("create-car-name") as HTMLInputElement
        ).value;
        const carColor = (
          document.getElementById("create-car-color") as HTMLInputElement
        ).value;
        const carContainer = document.getElementById("car-container");

        const postCarData = {
          name: carName,
          color: carColor,
        };

        try {
          var createdCar = await postCar(postCarData);
          updateGarageHeaderWithCarCount();
        } catch (error) {
          console.log("Error posting car:", error);
        }

        if (carContainer) {
          const carLine = createCarLine(createdCar);
          carContainer.appendChild(carLine);
          getTotalPages();
        }
      });
    }
  }

  public static addGenerateCarsHandler(): void {
    const generateButton = document.getElementById(
      "generate-btn",
    ) as HTMLButtonElement;
    if (generateButton) {
      generateButton.addEventListener("click", async () => {
        for (let i = 0; i < 100; i++) {
          const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
          const model = carModels[Math.floor(Math.random() * carModels.length)];
          const color = carColors[Math.floor(Math.random() * carColors.length)];

          const carData = {
            name: `${brand} ${model}`,
            color,
          };

          try {
            const carToPost = await postCar(carData);
            updateGarageHeaderWithCarCount();
          } catch (error) {
            console.log(`Error creating car ${i + 1}:`, error);
          }
        }
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  GarageView.addCreateCarHandler();
  GarageView.fetchCarsAndRender();
  updateGarageHeaderWithCarCount();
  GarageView.addGenerateCarsHandler();
  startRaceListener();
  const resetButton = document.getElementById("reset-btn");
  resetButton?.addEventListener("click", resetButtonHandler);
});

let currentPg = 1;

function curPageUpdate(currentPg: number) {
  const curPageDisplay = document.getElementById("cur-page");
  if (curPageDisplay) {
    curPageDisplay.textContent = `Page № ${currentPg}`;
  }
}
const nextPageButton = document.getElementById("nextPage") as HTMLButtonElement;
if (nextPageButton) {
  nextPageButton.addEventListener("click", () => {
    currentPg++;
    GarageView.fetchCarsAndRender(currentPg);
    curPageUpdate(currentPg);
    buttonsState(currentPg);
    const raceButton = document.getElementById("race-btn") as HTMLButtonElement;
    raceButton.disabled = false;
  });
} else {
  console.log('Element with ID "nextPage" not found');
}

const previousPageButton = document.getElementById(
  "prevPage",
) as HTMLButtonElement;
if (previousPageButton) {
  previousPageButton.addEventListener("click", () => {
    currentPg--;
    GarageView.fetchCarsAndRender(currentPg);
    curPageUpdate(currentPg);
    buttonsState(currentPg);
    const raceButton = document.getElementById("race-btn") as HTMLButtonElement;
    raceButton.disabled = false;
  });
} else {
  console.log('Element with ID "nextPage" not found');
}

curPageUpdate(currentPg);
buttonsState(currentPg);
