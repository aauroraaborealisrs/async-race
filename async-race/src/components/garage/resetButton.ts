export function resetButtonHandler() {
  const carElements = document.querySelectorAll('[id^="stop-btn-"]');
  const raceBtn = document.getElementById("race-btn") as HTMLButtonElement;
  const resetBtn = document.getElementById("reset-btn") as HTMLButtonElement;

  raceBtn.disabled = false;
  resetBtn.disabled = true;

  carElements.forEach((carElement) => {
    if (carElement instanceof HTMLButtonElement) {
      carElement.disabled = false;
      carElement.click();
    }
  });
}
