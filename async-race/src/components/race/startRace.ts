import { animation } from "../garage/animation";

export function startRaceListener() {
    const raceButton = document.getElementById('race-btn') as HTMLButtonElement;
    if (raceButton) {
        raceButton.addEventListener('click', startRace);
    }
}

let raceTimes = [];

function startRace(){
    const raceButton = document.getElementById('race-btn') as HTMLButtonElement;
    raceButton.disabled = true;
    
    const carElements = document.querySelectorAll('[id^="car-id-div-"]');
    carElements.forEach(carElement => {
        const carId = parseInt(carElement.id.replace('car-id-div-', ''), 10);
        animation(carId, "started");
    });
}
