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
    const stopBtn = document.getElementById(
      `stop-btn-${carId}`,
    ) as HTMLButtonElement;
    const startBtn = document.getElementById(
      `start-btn-${carId}`,
    ) as HTMLButtonElement;
    const carDiv = document.getElementById(
      `car-id-div-${carId}`,
    ) as HTMLElement;

    if (stopBtn) {
      stopBtn.addEventListener("click", () => {
        cancelAnimation();
        carElement.style.left = `0px`;
        stopBtn.disabled = true;
        startBtn.disabled = false;
        carDiv.classList.remove("red");
      });
    }

    const screenWidth = window.innerWidth;
    const endPosition = screenWidth - 200;
    const speed = (endPosition - startPosition) / animationTime;

    const updatePosition = (timestamp: number) => {
      const elapsedTime = timestamp - startTime;
      const newPosition = startPosition + speed * elapsedTime;
      carElement.style.left = `${newPosition}px`;

      if (newPosition >= endPosition) {
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
    }
  };

  return [promise, cancelAnimation];
}
