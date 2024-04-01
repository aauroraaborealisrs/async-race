// export async function getWinners(page:number, sort: string, order: string) {
//     try {
//         // const response = await fetch('http://127.0.0.1:3000/winners');
//         // let page = 1;
//         // const response = await fetch(`http://127.0.0.1:3000/winners?_page=${page}&_limit=10`);
//         const response = await fetch(`http://127.0.0.1:3000/winners?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`);


//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         displayWinners(data);

//         const totalCount = response.headers.get('X-Total-Count');
//         if (totalCount) {
//             // console.log(`Total number of records: ${totalCount}`);
//         }
//     } catch (error) {
//         console.log('Failed to fetch winners data:', error);
//     }
// }

export async function getWinners(page: number, sort: string = '', order: string = '') {
    try {
        // Создаем строку запроса с параметрами сортировки, если они указаны
        let queryParams = `_page=${page}&_limit=10`;
        if (sort) {
            queryParams += `&_sort=${sort}`;
        }
        if (order) {
            queryParams += `&_order=${order}`;
        }

        const response = await fetch(`http://127.0.0.1:3000/winners?${queryParams}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWinners(data);

        const totalCount = response.headers.get('X-Total-Count');
        if (totalCount) {
            // console.log(`Total number of records: ${totalCount}`);
        }
    } catch (error) {
        console.log('Failed to fetch winners data:', error);
    }
}

async function fetchCarDetailsById(id: number): Promise<{ name: string, color: string }> {
    try {
        const response = await fetch(`http://127.0.0.1:3000/garage/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { name: data.name, color: data.color };
    } catch (error) {
        console.error('Failed to fetch car details:', error);
        throw error; 
    }
}


async function displayWinners(winners: any[]) {
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent) {
        console.error('Element with class "modal-content" not found');
        return;
    }

    modalContent.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = 'Winners';
    modalContent.appendChild(header);

    const winHeader = document.createElement('div');
    winHeader.classList.add('winHead')

    const h1 = document.createElement('div');
    h1.textContent = 'Number';
    h1.classList.add("centrize");
    winHeader.appendChild(h1);

    const h2 = document.createElement('div');
    h2.textContent = 'Car';
    h2.classList.add("centrize");
    winHeader.appendChild(h2);

    const h3 = document.createElement('div');
    h3.textContent = 'Name';
    h3.classList.add("centrize");
    winHeader.appendChild(h3);

    const h4 = document.createElement('div');
    h4.textContent = 'Wins';
    h4.classList.add("centrize");
    winHeader.appendChild(h4);

    const h5 = document.createElement('div');
    h5.textContent = 'Best Time';
    h5.classList.add("centrize");
    winHeader.appendChild(h5);

    const numberCol = document.createElement('div');
    numberCol.classList.add("column");
    h1.appendChild(numberCol);

    const carCol = document.createElement('div');
    carCol.classList.add("column");
    h2.appendChild(carCol);

    const nameCol = document.createElement('div');
    nameCol.classList.add("column");
    h3.appendChild(nameCol);

    const winsCol = document.createElement('div');
    winsCol.classList.add("column");
    h4.appendChild(winsCol);

    const timesCol = document.createElement('div');
    timesCol.classList.add("column");
    h5.appendChild(timesCol);

    modalContent.appendChild(winHeader);


    const ul = document.createElement('ul');

    for (const [index, winner] of winners.entries()) {
        const li = document.createElement('li');
        li.classList.add('win-row');
    
        try {
            const { name, color } = await fetchCarDetailsById(winner.id);
    
            // Создаем div для номера
            const numberDiv = document.createElement('div');
            numberDiv.textContent = `${index + 1}`;
            // li.appendChild(numberDiv);
            numberCol.appendChild(numberDiv);

    
            // Создаем div для имени
            const nameDiv = document.createElement('div');
            nameDiv.textContent = `${name}`;
            // li.appendChild(nameDiv);
            nameCol.appendChild(nameDiv);
            
    
            // Создаем div для количества побед
            const winsDiv = document.createElement('div');
            winsDiv.textContent = `${winner.wins}`;
            // li.appendChild(winsDiv);
            winsCol.appendChild(winsDiv);
    
            // Создаем div для времени
            const timeDiv = document.createElement('div');
            timeDiv.textContent = `${winner.time} sec`;
            // li.appendChild(timeDiv);
            timesCol.appendChild(timeDiv);
        
    
            const carImage = document.createElement('div');
            carImage.classList.add("winCarImage");
            carImage.style.backgroundColor = `${(color)}`;

            // li.appendChild(carImage);
            carCol.appendChild(carImage);

        } catch (error) {
            console.log('Failed to fetch car details for winner:', error);
            const numberDiv = document.createElement('div');
            numberDiv.textContent = `Number: ${index + 1}`;
            li.appendChild(numberDiv);
    
            const winsTimeDiv = document.createElement('div');
            winsTimeDiv.textContent = `Wins: ${winner.wins}, Time: ${winner.time} seconds (Car details not available)`;
            li.appendChild(winsTimeDiv);
        }
        ul.appendChild(li);
    }
    modalContent.appendChild(ul);
}