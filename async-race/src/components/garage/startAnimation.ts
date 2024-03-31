// export function startAnimation(carId: number, distance: number, velocity: number ): number {

//     let animationTime = Math.round(distance / velocity);

//     const carElement = document.getElementById(`car-id-div-${carId}`) as HTMLElement;
//     if (!carElement) {
//         console.error(`Element with ID 'car-id-div-${carId}' not found`);
//         return -1;
//     }

//     const startPosition = carElement.offsetLeft;
//     const screenWidth = window.innerWidth;
//     let endPosition = screenWidth - 200;
//     let speed = (endPosition - startPosition) / animationTime;

//     if(distance == 0){
//         endPosition = startPosition;
//         console.log(endPosition, startPosition)
//     }

//     const updatePosition = (timestamp: number) => {

//         const elapsedTime = timestamp - startTime;
//         let newPosition = startPosition + speed * elapsedTime;

//         if(distance == 0) {
//             newPosition = startPosition;
//             console.log(newPosition)
//             console.log("я во втором ифе")
//         }

//         carElement.style.left = `${newPosition}px`;

//         if (distance != 0 && newPosition < endPosition) {
//             requestAnimationFrame(updatePosition);
//         }
//     };

//     const startTime = performance.now()
//     if(distance == 0) {
//         return startPosition;
//     }
//     else {
//         return requestAnimationFrame(updatePosition); 
//     }
// }

// export function startAnimation(carId: number, distance: number, velocity: number ): number {

//     let animationTime = Math.round(distance / velocity);


//     const carElement = document.getElementById(`car-id-div-${carId}`);
//     if (!carElement) {
//         console.error(`Element with ID 'car-id-div-${carId}' not found`);
//         return -1;
//     }

//     const startPosition = carElement.offsetLeft;
//     const screenWidth = window.innerWidth;
//     let endPosition = screenWidth - 200;
//     let speed = (endPosition - startPosition) / animationTime;


//     const updatePosition = (timestamp: number) => {

//         let elapsedTime = timestamp - startTime;
//         const newPosition = startPosition + speed * elapsedTime;
//         carElement.style.left = `${newPosition}px`;

//         if (newPosition < endPosition) {
//             requestAnimationFrame(updatePosition);
//         }
//     };

//     const startTime = performance.now();
//     return requestAnimationFrame(updatePosition); 
// }


// export function startAnimation(carId: number, distance: number, velocity: number): Promise<number> {
//     return new Promise((resolve, reject) => {
//         let animationTime = Math.round(distance / velocity);

//         const carElement = document.getElementById(`car-id-div-${carId}`);
//         if (!carElement) {
//             console.error(`Element with ID 'car-id-div-${carId}' not found`);
//             reject(-1);
//             return;
//         }

//         const startPosition = carElement.offsetLeft;
//         const screenWidth = window.innerWidth;
//         let endPosition = screenWidth - 200;
//         let speed = (endPosition - startPosition) / animationTime;

//         const updatePosition = (timestamp: number) => {
//             let elapsedTime = timestamp - startTime;
//             const newPosition = startPosition + speed * elapsedTime;
//             carElement.style.left = `${newPosition}px`;

//             if (newPosition >= endPosition) {
//                 console.log(elapsedTime)
//                 resolve(elapsedTime);
            
//             } else {
//                 requestAnimationFrame(updatePosition);
//             }
//         };

//         const startTime = performance.now();
//         requestAnimationFrame(updatePosition);
//     });
// }

//--------------------------------------------------------------

// export function startAnimation(carId: number, distance: number, velocity: number): Promise<number> {
//     return new Promise((resolve, reject) => {
//         let animationTime = Math.round(distance / velocity);

//         const carElement = document.getElementById(`car-id-div-${carId}`);
//         if (!carElement) {
//             console.error(`Element with ID 'car-id-div-${carId}' not found`);
//             reject(-1);
//             return;
//         }

//         const startPosition = carElement.offsetLeft;
//         const screenWidth = window.innerWidth;
//         let endPosition = screenWidth - 200;
//         let speed = (endPosition - startPosition) / animationTime;

//         let animationId: number | null = null; // Идентификатор запроса для отмены анимации

//         const updatePosition = (timestamp: number) => {
//             let elapsedTime = timestamp - startTime;
//             const newPosition = startPosition + speed * elapsedTime;
//             carElement.style.left = `${newPosition}px`;

//             if (newPosition >= endPosition) {
//                 console.log(elapsedTime);
//                 resolve(elapsedTime);
//             } else {
//                 animationId = requestAnimationFrame(updatePosition);
//             }
//         };

//         const startTime = performance.now();
//         animationId = requestAnimationFrame(updatePosition);

//         // Метод для отмены анимации
//         const cancelAnimation = () => {
//             if (animationId !== null) {
//                 cancelAnimationFrame(animationId);
//                 animationId = null;
//                 // reject('Animation cancelled');
//                 console.log('Animation cancelled');
//             }
//         };

//         // Пример использования cancelAnimation
//         setTimeout(cancelAnimation, 2000); // Отменить анимацию через 1 секунду
//     });
// }

//--------------------------------------------------------------

// export function startAnimation(carId: number, distance: number, velocity: number): Promise<number>  {
//     return new Promise((resolve, reject) => {
//         let animationTime = Math.round(distance / velocity);

//         const carElement = document.getElementById(`car-id-div-${carId}`);
//         if (!carElement) {
//             console.error(`Element with ID 'car-id-div-${carId}' not found`);
//             reject(-1);
//             return;
//         }

//         const startPosition = carElement.offsetLeft;
//         const screenWidth = window.innerWidth;
//         let endPosition = screenWidth - 200;
//         let speed = (endPosition - startPosition) / animationTime;

//         let animationId: number | null = null; // Идентификатор запроса для отмены анимации

//         const updatePosition = (timestamp: number) => {
//             let elapsedTime = timestamp - startTime;
//             const newPosition = startPosition + speed * elapsedTime;
//             carElement.style.left = `${newPosition}px`;

//             if (newPosition >= endPosition) {
//                 console.log(elapsedTime);
//                 resolve(elapsedTime);
//             } else {
//                 animationId = requestAnimationFrame(updatePosition);
//             }
//         };

//         const startTime = performance.now();
//         animationId = requestAnimationFrame(updatePosition);

//         // Метод для отмены анимации
//         const cancelAnimation = () => {
//             if (animationId !== null) {
//                 cancelAnimationFrame(animationId);
//                 animationId = null;
//                 // reject('Animation cancelled');
//                 console.log('Animation cancelled');
//             }
//         };

//         // Пример использования cancelAnimation
//         // setTimeout(cancelAnimation, 2000); // Отменить анимацию через 1 секунду     
//         return cancelAnimation; // Возвращаем функцию отмены

//     });
// }




export function startAnimation(carId: number, distance: number, velocity: number): [Promise<number>, () => void] {
    let animationId: number | null = null; // Идентификатор запроса для отмены анимации

    const promise = new Promise<number>((resolve, reject) => {
        let animationTime = Math.round(distance / velocity);

        const carElement = document.getElementById(`car-id-div-${carId}`);
        if (!carElement) {
            console.error(`Element with ID 'car-id-div-${carId}' not found`);
            reject(-1);
            return;
        }

        const startPosition = carElement.offsetLeft;
        const screenWidth = window.innerWidth;
        let endPosition = screenWidth - 200;
        let speed = (endPosition - startPosition) / animationTime;

        const updatePosition = (timestamp: number) => {
            let elapsedTime = timestamp - startTime;
            const newPosition = startPosition + speed * elapsedTime;
            carElement.style.left = `${newPosition}px`;

            if (newPosition >= endPosition) {
                console.log(elapsedTime);
                resolve(elapsedTime);
            } else {
                animationId = requestAnimationFrame(updatePosition);
            }
        };

        const startTime = performance.now();
        animationId = requestAnimationFrame(updatePosition);
    });

    // Метод для отмены анимации
    const cancelAnimation = () => {
        if (animationId !== null) {
            cancelAnimationFrame(animationId);
            animationId = null;
            console.log('Animation cancelled');
        }
    };

    return [promise, cancelAnimation]; 
}
