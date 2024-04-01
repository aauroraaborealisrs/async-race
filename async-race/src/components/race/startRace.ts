import { animation } from "../garage/animation";

export function startRaceListener() {
  const raceButton = document.getElementById("race-btn") as HTMLButtonElement;
  if (raceButton) {
    raceButton.addEventListener("click", startRace);
  }
}

function startRace() {
  const resetButton = document.getElementById("reset-btn") as HTMLButtonElement;
  resetButton.disabled = false;

  const raceButton = document.getElementById("race-btn") as HTMLButtonElement;
  raceButton.disabled = true;

  const startButtons = document.querySelectorAll(
    ".start-btn",
  ) as NodeListOf<HTMLButtonElement>;
  const stopButtons = document.querySelectorAll(
    ".stop-btn",
  ) as NodeListOf<HTMLButtonElement>;

  startButtons.forEach((button) => {
    button.disabled = true;
  });

  stopButtons.forEach((button) => {
    button.disabled = false;
  });

  const carElements = document.querySelectorAll('[id^="car-id-div-"]');
  carElements.forEach((carElement) => {
    const carId = parseInt(carElement.id.replace("car-id-div-", ""), 10);
    animation(carId, "started");
  });
}
