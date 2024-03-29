import Car from "../car/Car";

export default class GarageView {
 public static renderMenu(): void {
    const menuContainer = document.getElementById("menu-container");
    if (menuContainer) {
      console.log("menuContainer")
      menuContainer.innerHTML = `
        <div class="menu">
          <div class="form">
            <form action="" id="create-car">
              <input type="text" id="create-car-name" name="car-name"><br>
              <input type="color" id="create-car-color" name="car-color" value="#ffffff">
              <input type="submit" value="create" class="btn create-btn" id="create-btn">
            </form>
          </div>
          <div class="form">
            <form action="" id="update-car">
              <input type="text" id="update-car-name" name="car-name"><br>
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

 public static addCreateCarHandler(): void {
   const createButton = document.getElementById("create-btn") as HTMLButtonElement;
   if (createButton) {
      createButton.addEventListener("click", (event) => {
        event.preventDefault(); 
  
        const carName = (document.getElementById("create-car-name") as HTMLInputElement).value;
        const carColor = (document.getElementById("create-car-color") as HTMLInputElement).value;
  
        const newCar = new Car(carName, carColor);
        console.log(newCar); 
      });
   }
 }
}

document.addEventListener("DOMContentLoaded", () => {
 GarageView.addCreateCarHandler();
});