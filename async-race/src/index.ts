import "./style.css";

import GarageView from "./components/garage/garageView";
import winnersView from "./components/winners/winnersView";

const buttonsContainer = document.createElement('div');
buttonsContainer.id = 'buttons-container';

const garageBtn = document.createElement('button');
garageBtn.className = 'switch-button';
garageBtn.id = 'garage-btn';
const garageBtnText = document.createTextNode('to Garage');
garageBtn.appendChild(garageBtnText);

const winnersBtn = document.createElement('button');
winnersBtn.className = 'switch-button';
winnersBtn.id = 'winners-btn';
const winnersBtnText = document.createTextNode('to Winners');
winnersBtn.appendChild(winnersBtnText);

buttonsContainer.appendChild(garageBtn);
buttonsContainer.appendChild(winnersBtn);

const curPage = document.createElement('div');
curPage.id = 'cur-page';

const menuContainer = document.createElement('div');
menuContainer.id = 'menu-container';

const garageHeader = document.createElement('h2');
garageHeader.id = 'garage-header';
garageHeader.textContent = 'Garage';

const carContainer = document.createElement('div');
carContainer.id = 'car-container';

const prevPageBtn = document.createElement('button');
prevPageBtn.id = 'prevPage';
prevPageBtn.className = 'button page-switcher';
prevPageBtn.textContent = 'Previous';

const nextPageBtn = document.createElement('button');
nextPageBtn.id = 'nextPage';
nextPageBtn.className = 'button page-switcher';
nextPageBtn.textContent = 'Next';

const overflowDiv = document.createElement('div');
overflowDiv.className = 'overflowDiv';

document.body.appendChild(buttonsContainer);
document.body.appendChild(curPage);
document.body.appendChild(menuContainer);
document.body.appendChild(garageHeader);
document.body.appendChild(carContainer);
document.body.appendChild(prevPageBtn);
document.body.appendChild(nextPageBtn);
document.body.appendChild(overflowDiv);


GarageView.renderMenu();

const toWinnersButton = document.getElementById("winners-btn");

if (toWinnersButton) {
  toWinnersButton.addEventListener("click", () => {
    winnersView();
  });
}
