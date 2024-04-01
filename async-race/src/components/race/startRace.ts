import { animation } from "../garage/animation";
import { showWinner } from "./showWinner";

export function startRaceListener() {
  const raceButton = document.getElementById("race-btn") as HTMLButtonElement;
  if (raceButton) {
    raceButton.addEventListener("click", startRace);
  }
}

interface WinnerCandidate {
  res: number;
  id: number;
 }

async function startRace() {
  const resetButton = document.getElementById("reset-btn") as HTMLButtonElement;
  resetButton.disabled = false;

  const raceButton = document.getElementById("race-btn") as HTMLButtonElement;
  raceButton.disabled = true;

  const nextButton = document.getElementById("nextPage") as HTMLButtonElement;
  nextButton.disabled = true;

  const prevButton = document.getElementById("prevPage") as HTMLButtonElement;
  prevButton.disabled = true;

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

  let results: WinnerCandidate[] = [];
  let winners: WinnerCandidate [] = [];
  let finalWinner: WinnerCandidate;

  const carElements = document.querySelectorAll('[id^="car-id-div-"]');
  carElements.forEach(async (carElement) => {
    const carId = parseInt(carElement.id.replace("car-id-div-", ""), 10);
    const winnerData = await animation(carId, "started", results);
    const winner = { id: winnerData?.id, res: winnerData?.time } as WinnerCandidate
    winners.push(winner);
    if (winners.length === 1){
      finalWinner = winners[0];
      // console.log(finalWinner);
      showWinner(finalWinner);
    }
  });
}