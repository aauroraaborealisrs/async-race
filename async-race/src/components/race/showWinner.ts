interface WinnerCandidate {
    res: number;
    id: number;
}

async function fetchCarNameById(id: number): Promise<string> {
    try {
        const response = await fetch(`http://127.0.0.1:3000/garage/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error; 
    }
}

export async function showWinner(winner: WinnerCandidate) {
    const carName = await fetchCarNameById(winner.id);
    const showCurWin = document.createElement("div");
    showCurWin.classList.add("currentWin");
    showCurWin.textContent = `The winner is: ${carName} (${winner.res} seconds!)`;
    const carCont = document.getElementById("car-container");
    carCont?.appendChild(showCurWin);

    await createWinnerRecord(winner);

    const stopButtons = document.querySelectorAll(".stop-btn",) as NodeListOf<HTMLButtonElement>;
    
    stopButtons.forEach((button) => {
        button.disabled = true;
    });
}


async function createWinnerRecord(winner: WinnerCandidate) {
    try {
        // Попытка получить текущую запись о победителе с данным ID
        const response = await fetch(`http://127.0.0.1:3000/winners/${winner.id}`);
        let data;

        if (response.ok) {
            // Если запись существует, обновить её
            data = await response.json();
            const updatedWins = data.wins + 1;
            const updateResponse = await fetch(`http://127.0.0.1:3000/winners/${winner.id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: winner.id,
                    wins: updatedWins,
                    time: winner.res,
                }),
            });

            if (!updateResponse.ok) {
                console.log(`HTTP error! status: ${updateResponse.status}`);
            }
        } else {
            // Если запись не существует, создать новую
            const createResponse = await fetch('http://127.0.0.1:3000/winners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: winner.id,
                    wins: 1,
                    time: winner.res,
                }),
            });

            if (!createResponse.ok) {
                console.log(`HTTP error! status: ${createResponse.status}`);
            }
        }

    } catch (error) {
        console.error('Failed to update or create winner record:', error);
    }
}