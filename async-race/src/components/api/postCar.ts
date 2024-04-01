export async function postCar(postCar: any): Promise<any> {
  try {
    const response = await fetch("http://127.0.0.1:3000/garage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postCar),
    });

    if (!response.ok) {
      console.log("Network response was not ok");
    }

    const createdCar = await response.json();
    return createdCar;
  } catch (error) {
    console.log("There has been a problem with your fetch operation:", error);
  }
}
