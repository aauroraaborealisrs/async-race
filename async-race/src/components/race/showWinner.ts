interface WinnerCandidate {
    res: number;
    id: number;
}

async function fetchCarNameById(id: number): Promise<string> {
    try {
        const response = await fetch(`http://127.0.0.1:3000/garage/${id}`);
        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.name;
    } catch (error) {
        console.log('Fetch failed:', error);
        throw error; 
    }
}

export async function showWinner(winner: WinnerCandidate) {
    
    const nextButton = document.getElementById("nextPage") as HTMLButtonElement;
    nextButton.disabled = false;
    const prevButton = document.getElementById("prevPage") as HTMLButtonElement;
    prevButton.disabled = false;

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
        const response = await fetch(`http://127.0.0.1:3000/winners/${winner.id}`);
        let data;

        if (response.ok) {
            data = await response.json();
            const currentTime = data.time;

            if (winner.res < currentTime) {
                const updateResponse = await fetch(`http://127.0.0.1:3000/winners/${winner.id}`, {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: winner.id,
                        wins: data.wins + 1,
                        time: winner.res, 
                    }),
                });

                if (!updateResponse.ok) {
                    console.log(`HTTP error! status: ${updateResponse.status}`);
                }
            } else {
                const updateResponse = await fetch(`http://127.0.0.1:3000/winners/${winner.id}`, {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: winner.id,
                        wins: data.wins + 1, 
                        time: currentTime, 
                    }),
                });

                if (!updateResponse.ok) {
                    console.log(`HTTP error! status: ${updateResponse.status}`);
                }
            }
        } else {
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
        console.log('Failed to update or create winner record:', error);
    }
}