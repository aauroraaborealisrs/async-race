import "./winners.css";
import { getWinners } from "./getWinners";

export default function winnersView() {
  const modal = document.createElement("div");
  modal.id = "winnersModal";
  modal.className = "modal";
  modal.style.display = "none";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const toWinnersButton = document.getElementById(
    "winners-btn",
  ) as HTMLButtonElement;
  const toGarageButton = document.getElementById(
    "garage-btn",
  ) as HTMLButtonElement;
  toGarageButton.disabled = false;

  if (toWinnersButton) {
    toWinnersButton.disabled = true;
  }

  if (toGarageButton) {
    toGarageButton.onclick = function () {
      closeModal();
    };
  }
  const h2 = document.createElement("h2");
  h2.textContent = "Winners";
  const p = document.createElement("p");
  p.textContent = "Some text";

  modalContent.appendChild(h2);
  modalContent.appendChild(p);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  function showModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.removeChild(modal);
    toWinnersButton.disabled = false;
    if (toGarageButton) {
      toGarageButton.disabled = true;
    }
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  showModal();
  getWinners();
}
