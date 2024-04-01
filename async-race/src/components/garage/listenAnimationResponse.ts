// import { startAnimation } from "./startAnimation";

// export function listenAnimationResponse(carId: number, distance: number, velocity: number) {
//  const [animationPromise, cancelAnimation] = startAnimation(carId, distance, velocity);

//  animationPromise
//     .then((elapsedTime) => {
//       console.log(`Анимация для автомобиля с ID ${carId} заняла ${elapsedTime} миллисекунд.`);
//     })
//     .catch((error) => {
//       console.error(`Ошибка в анимации для автомобиля с ID ${carId}:`, error);
//       cancelAnimation(); 
//     });
// }

// import { startAnimation } from "./startAnimation";

// // Массивы для хранения времени анимации для автомобилей с и без класса 'red'
// let timesWithoutRed: number[] = [];
// let timesWithRed: number[] = [];

// export function listenAnimationResponse(carId: number, distance: number, velocity: number) {
//  const [animationPromise, cancelAnimation] = startAnimation(carId, distance, velocity);

//  animationPromise
//     .then((elapsedTime) => {
//       const carElement = document.getElementById(`car-id-div-${carId}`);
//       if (carElement && carElement.classList.contains('red')) {
//         timesWithRed.push(elapsedTime);
//       } else {
//         timesWithoutRed.push(elapsedTime);
//       }
//       console.log(`Анимация для автомобиля с ID ${carId} заняла ${elapsedTime} миллисекунд.`);
//       console.log(timesWithoutRed, timesWithRed)
//     })
//     .catch((error) => {
//       console.error(`Ошибка в анимации для автомобиля с ID ${carId}:`, error);
//       cancelAnimation(); // Отменить анимацию в случае ошибки
//     });
// }