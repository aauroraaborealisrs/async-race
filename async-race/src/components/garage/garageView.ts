import {Car} from "../types/Car";
import { createCarLine } from "./carLineCreator"; 
import { postCar } from "../api/postCar";

import './garage.css';

let lastCarId = 5;


export default class GarageView {

 public static renderMenu(): void {
    const menuContainer = document.getElementById("menu-container");
    if (menuContainer) {
      console.log("menuContainer")
      menuContainer.innerHTML = `
        <div class="menu">
          <div class="form">
            <form action="" id="create-car">
              <input type="text" id="create-car-name" name="car-name">
              <input type="color" id="create-car-color" name="car-color" value="#ffffff">
              <input type="submit" value="create" class="btn create-btn" id="create-btn">
            </form>
          </div>
          <div class="form">
            <form action="" id="update-car">
              <input type="text" id="update-car-name" name="car-name">
              <input type="color" id="update-car-color" name="car-color" value="#ffffff">
             <input type="submit" value="update" class="btn update-btn btn-disabled" disabled>
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
       const response = await fetch('http://127.0.0.1:3000/garage');
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       const cars = await response.json();
       this.renderCars(cars);
     } catch (error) {
       console.error('There has been a problem with your fetch operation:', error);

     }
  }
 
  public static renderCars(cars: Car[]): void {
      const carContainer = document.getElementById("car-container");
      if (carContainer) {
        cars.forEach(car => {
          const carLine = createCarLine(car);
          carContainer.appendChild(carLine);
        });
      }
  }

 public static addCreateCarHandler(): void {
   const createButton = document.getElementById("create-btn") as HTMLButtonElement;
   if (createButton) {
      createButton.addEventListener("click", async (event) => {
        event.preventDefault(); 
  
        const carName = (document.getElementById("create-car-name") as HTMLInputElement).value;
        const carColor = (document.getElementById("create-car-color") as HTMLInputElement).value;
        const newCar = new Car(carName, carColor, lastCarId++);
        const carContainer = document.getElementById("car-container");

        const postCarData = {
          name: carName,
          color: carColor
      };

       try {
              const createdCar = await postCar(postCarData);
              console.log(createdCar);
          } catch (error) {
              console.error('Error posting car:', error);
          }

    //    try {
    //     const response = await fetch('http://127.0.0.1:3000/garage', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(postCar)
    //     });

    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }

    //     const createdCar = await response.json();
    //     console.log(createdCar);

    // } catch (error) {
    //     console.error('There has been a problem with your fetch operation:', error);
    // }

      if (carContainer) {
        const carLine = createCarLine(newCar);
        carContainer.appendChild(carLine);
      }

        console.log(newCar); 
      });

      
   }
 }


}

document.addEventListener("DOMContentLoaded", () => {
 GarageView.addCreateCarHandler();
 GarageView.fetchCarsAndRender(); 
});
