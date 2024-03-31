export function startAnimation(carId: number, distance: number, velocity: number ): number {
    console.log("Animation started");

    let animationTime = Math.round(distance / velocity);


    const carElement = document.getElementById(`car-id-div-${carId}`);
    if (!carElement) {
        console.error(`Element with ID 'car-id-div-${carId}' not found`);
        return -1;
    }

    const startPosition = carElement.offsetLeft;
    const screenWidth = window.innerWidth;
    const endPosition = screenWidth - 200;
    let speed = (endPosition - startPosition) / animationTime;

    if (velocity === 0) {
        speed = 0;
        animationTime = 0;
    }

    const updatePosition = (timestamp: number) => {

        const elapsedTime = timestamp - startTime;
        const newPosition = startPosition + speed * elapsedTime;

        carElement.style.left = `${newPosition}px`;

        if (newPosition < endPosition) {
            requestAnimationFrame(updatePosition);
        }
    };

    const startTime = performance.now();
    return requestAnimationFrame(updatePosition); 
}