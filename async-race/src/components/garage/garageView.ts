import { Car } from "../types/Car";
import { createCarLine } from "./carLineCreator";
import { postCar } from "../api/postCar";
import { updateGarageHeaderWithCarCount, Pages } from "./updateGarageHeaderWithCarCount";
import { displayCarsForPage } from './pagination';
import "./garage.css";

const lastCarId = 5;
const carsNumber = 0;
let currentPage = 1;

// async function getTotalPages() {
//     let totalPages = await Pages();
//     console.log(totalPages);
// }

async function getTotalPages(): Promise<number> {
    let totalPages = await Pages();
    console.log(totalPages);
    return totalPages; 
}

let totalPages = getTotalPages();



export default class GarageView {
  public static renderMenu(): void {
    const menuContainer = document.getElementById("menu-container");
    if (menuContainer) {
      console.log("menuContainer");
      // я уберу потом этот иннер не ругайся пж(((
      menuContainer.innerHTML = `
        <div class="menu">
          <div class="form">
            <form action="" id="create-car">
              <input type="text" id="create-car-name" name="car-name">
              <input type="color" id="create-car-color" name="car-color" value="#60A333">
              <input type="submit" value="create" class="btn create-btn" id="create-btn">
            </form>
          </div>
          <div class="form">
            <form action="" id="update-car">
              <input type="text" id="update-car-name" name="car-name">
              <input type="color" id="update-car-color" name="car-color" value="#ffffff">
             <input type="submit" id="update-btn" value="update" class="btn update-btn btn-disabled" disabled>
            </form>
          </div>
          <div class="buttons">
            <button class="btn race-btn">race</button>
            <button class="btn reset-btn btn-disabled" disabled>reset</button>
            <button class="btn generate-btn">generate cars</button>
          </div>
        </div>
      `;
    }
  }

  public static async fetchCarsAndRender(): Promise<void> {
    try {
      const response = await fetch("http://127.0.0.1:3000/garage");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const cars = await response.json();
      this.renderCars(cars);
      console.log(cars);
      return cars;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error,
      );
    }
  }

  public static renderCars(cars: Car[]): void {
    const carContainer = document.getElementById("car-container");
    if (carContainer) {
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
          console.error("Error posting car:", error);
        }

        if (carContainer) {
          const carLine = createCarLine(createdCar);
          carContainer.appendChild(carLine);
          getTotalPages();

        }
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  GarageView.addCreateCarHandler();
  GarageView.fetchCarsAndRender();
  updateGarageHeaderWithCarCount();
});
