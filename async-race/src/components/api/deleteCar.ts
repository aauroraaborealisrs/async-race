export async function deleteCar(carId: number): Promise<void> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
