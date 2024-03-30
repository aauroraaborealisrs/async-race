export async function updateCar(
  carId: number,
  updatedCarData: { name: string; color: string },
): Promise<void> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCarData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Car updated successfully");
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
