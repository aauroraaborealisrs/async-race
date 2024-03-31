export function startAnimation(
  carId: number,
  distance: number,
  velocity: number,
): [Promise<number>, () => void] {
  let animationId: number | null = null; // Идентификатор запроса для отмены анимации

  const promise = new Promise<number>((resolve, reject) => {
    const animationTime = Math.round(distance / velocity);

    const carElement = document.getElementById(`car-id-div-${carId}`);
    if (!carElement) {
      console.error(`Element with ID 'car-id-div-${carId}' not found`);
      reject(-1);
      return;
    }

    const startPosition = carElement.offsetLeft;
    const screenWidth = window.innerWidth;
    const endPosition = screenWidth - 200;
    const speed = (endPosition - startPosition) / animationTime;

    const updatePosition = (timestamp: number) => {
      const elapsedTime = timestamp - startTime;
      const newPosition = startPosition + speed * elapsedTime;
      carElement.style.left = `${newPosition}px`;

      if (newPosition >= endPosition) {
        console.log(elapsedTime);
        resolve(elapsedTime);
      } else {
        animationId = requestAnimationFrame(updatePosition);
      }
    };

    const startTime = performance.now();
    animationId = requestAnimationFrame(updatePosition);
  });

  const cancelAnimation = () => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
      console.log("Animation cancelled");
    }
  };

  return [promise, cancelAnimation];
}
