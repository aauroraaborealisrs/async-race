// interface WinnerCandidate {
//     res: number;
//     id: number;
//    }
  
// export function showWinner (winner: WinnerCandidate) {
//     console.log("bgnjvfkd");
//     console.log(winner);
// }

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
    // console.log(`The winner is: ${carName} for ${winner.res}`);
    const showCurWin = document.createElement("div");
    let formTime = (winner.res / 1000).toFixed(3);
    showCurWin.classList.add("currentWin");
    showCurWin.textContent = `The winner is: ${carName} (${formTime} seconds!)`;
    const carCont = document.getElementById("car-container");
    carCont?.appendChild(showCurWin);
}