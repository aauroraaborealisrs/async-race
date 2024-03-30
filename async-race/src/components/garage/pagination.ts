import { updateGarageHeaderWithCarCount, Pages } from "./updateGarageHeaderWithCarCount";
import { createCarLine } from "./carLineCreator";

import { Car } from "../types/Car";

import "./garage.css";

const lastCarId = 5;
const carsNumber = 0;
let currentPage = 1;

let cars: Car[] = []; 

(async () => {
    cars = await getCars(); 
    displayCarsForPage(currentPage);
})();

async function getTotalPages() {
    let totalPages = await Pages();
    console.log(totalPages);
    return totalPages;
}

let totalPages: number;
(async () => {
    totalPages = await getTotalPages();
})();

export function displayCarsForPage(page: number) {
    const startIndex = (page - 1) * 7;
    const endIndex = startIndex + 7;
    const carsForPage = cars.slice(startIndex, endIndex);
    carsForPage.forEach(car => {
        createCarLine(car);
    })
    // displayCars(carsForPage);
    
}

displayCarsForPage(currentPage);

document.getElementById('prevPage')?.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayCarsForPage(currentPage);
    }
});

document.getElementById('nextPage')?.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayCarsForPage(currentPage);
    }
});


async function fetchCars(): Promise<Car[]> {
    try {
        const response = await fetch("http://127.0.0.1:3000/garage");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const cars = await response.json();
        console.log(cars);
        return cars; 
    } catch (error) {
        console.error(
            "There has been a problem with your fetch operation:",
            error,
        );
        return []; 
    }
}

async function getCars(): Promise<Car[]> {
    let cars = await fetchCars();
    console.log(cars);
    return cars; 
}
