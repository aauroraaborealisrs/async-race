import "./style.css";

import GarageView from "./components/garage/garageView";
import winnersView from "./components/winners/winnersView";

GarageView.renderMenu();

const toWinnersButton = document.getElementById("winners-btn");

if (toWinnersButton) {
  toWinnersButton.addEventListener("click", () => {
    winnersView();
  });
}