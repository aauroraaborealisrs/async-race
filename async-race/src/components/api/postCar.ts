
export async function postCar(postCar: any): Promise<any> {
    try {
        const response = await fetch('http://127.0.0.1:3000/garage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postCar)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const createdCar = await response.json();
        console.log(createdCar);
        return createdCar;

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}