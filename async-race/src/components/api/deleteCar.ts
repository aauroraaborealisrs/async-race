export async function deleteCar(carId: number): Promise<void> {
 try {
    const responseGarage = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
      method: "DELETE",
    });

    if (!responseGarage.ok) {
      console.log("Network response was not ok for garage");
    }

    const responseWinners = await fetch(`http://127.0.0.1:3000/winners/${carId}`, {
      method: "DELETE",
    });

    if (!responseWinners.ok) {
      console.log("Network response was not ok for winners");
    }
 } catch (error) {
    console.log("There has been a problem with your fetch operation:", error);
 }
}