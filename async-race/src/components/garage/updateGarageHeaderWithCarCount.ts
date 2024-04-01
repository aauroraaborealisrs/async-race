async function fetchCarCount(): Promise<number> {
  try {
    const response = await fetch("http://127.0.0.1:3000/garage");
    if (!response.ok) {
      console.log("Network response was not ok");
    }
    const cars = await response.json();
    return cars.length;
  } catch (error) {
    console.log("There has been a problem with your fetch operation:", error);
    return 0;
  }
}

export async function updateGarageHeaderWithCarCount(): Promise<void> {
  const carCount = await fetchCarCount();
  const garageHeader = document.getElementById("garage-header");
  if (garageHeader) {
    garageHeader.textContent = `Garage (${carCount})`;
  }
}

export async function Pages(): Promise<number> {
  const carCount = await fetchCarCount();
  const totalPages = Math.ceil(carCount / 7);
  return totalPages;
}
