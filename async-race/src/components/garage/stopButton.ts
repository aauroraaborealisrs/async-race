// export async function stopButtonHandler (carId: number, status: string) {
//     console.log("stop")
//     const url = `http://127.0.0.1:3000/engine?id=${carId}&status=${status}`;
//     try {
//         const response = await fetch(url, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//             if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         console.log(response)
//     }
//      catch (error) {
//         console.error('There was a problem with your fetch operation:', error);
//     }
// }

import { startAnimation } from "./startAnimation";

export function stopButtonHandler(carId: number) {
  const carElement = document.getElementById(`car-id-div-${carId}`);
  if (carElement) {
    console.log("я буду ставить");
  }
}
