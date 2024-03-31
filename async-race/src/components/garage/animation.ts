import {startAnimation} from "../garage/startAnimation"


export async function animation(carId: number, status: string) {
    const url = `http://127.0.0.1:3000/engine?id=${carId}&status=${status}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); 

        const { velocity, distance } = JSON.parse(JSON.stringify(data));
        
        startAnimation(carId, distance, velocity);

        //смотрим разрешение на движение
        if (response.ok) {
            const driveResponse = await fetch(`http://127.0.0.1:3000/engine?id=${carId}&status=drive`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!driveResponse.ok) {
                let broken = document.getElementById(`car-id-div-${carId}`)
                if(broken)
                {broken.style.backgroundColor = "red";
                startAnimation(carId, distance, 0);
                }

                throw new Error(`Drive mode switch failed! status: ${driveResponse.status}`);
            }
        }

        return data;

    } catch (error) {
        let broken = document.getElementById(`car-id-div-${carId}`)
        if(broken){broken.style.backgroundColor = "red";}
        console.error('There was a problem with your fetch operation:', error);
    }
}
