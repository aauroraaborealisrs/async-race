
import { Car } from "../types/Car";

async function deleteCar(carId: number): Promise<void> {
    try {
        const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log('Car deleted successfully');
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export function createCarLine(car: Car): HTMLDivElement {
 const carLine = document.createElement("div");
 carLine.className = "car-line";
 //тут баг и всегда начинается с 5 но при обновлении страницы все ок
 carLine.id = `car-id-${car.id}`;

 const carDiv = document.createElement("div");
 carDiv.className = "car";
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
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
});

 carLine.appendChild(carDiv);
 carLine.appendChild(carNameSpan);
 carLine.appendChild(buttonsPlaceholder);
 buttonsPlaceholder.appendChild(selectButton);
 buttonsPlaceholder.appendChild(removeButton);

 return carLine;
}