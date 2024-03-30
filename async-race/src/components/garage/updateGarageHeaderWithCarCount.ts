async function fetchCarCount(): Promise<number> {
 try {
    const response = await fetch("http://127.0.0.1:3000/garage");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const cars = await response.json();
    return cars.length;
 } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return 0; // Возвращаем 0 в случае ошибки
 }
}

export async function updateGarageHeaderWithCarCount(): Promise<void> {
 const carCount = await fetchCarCount();
 const garageHeader = document.getElementById("garage-header");
 if (garageHeader) {
    garageHeader.textContent = `Garage (${carCount})`;
 }
}