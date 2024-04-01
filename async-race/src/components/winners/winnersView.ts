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

  modalContent.appendChild(h2);
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

  // window.onclick = function (event) {
  //   if (event.target == modal) {
  //     closeModal();
  //   }
  // };

  getWinners(1);

  let currentPage = 1;

  const pagButtons = document.createElement('div');
  pagButtons.classList.add("pagButtons");
  modal.appendChild(pagButtons);

  const sortButtons = document.createElement('div');
  sortButtons.classList.add("pagButtons");
  modal.appendChild(sortButtons);


  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.classList.add("button");
  prevButton.onclick = () => {
      if (currentPage > 1) {
          currentPage--;
          getWinners(currentPage);
      }
  };

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.classList.add("button");

  nextButton.onclick = () => {
    {      currentPage++;
          getWinners(currentPage);
      }
  };

  pagButtons.appendChild(prevButton);
  pagButtons.appendChild(nextButton);


  const sortByWinsAButton = document.createElement('button');
  sortByWinsAButton.textContent = 'sort By Wins (Acs)';
  sortByWinsAButton.classList.add("button");

  const sortByWinsDButton = document.createElement('button');
  sortByWinsDButton.textContent = 'sort By Wins (Des)';
  sortByWinsDButton.classList.add("button");

  const sortByTimeAButton = document.createElement('button');
  sortByTimeAButton.textContent = 'sort By Time (Acs)';
  sortByTimeAButton.classList.add("button");

  const sortByTimeDButton = document.createElement('button');
  sortByTimeDButton.textContent = 'sort By Time (Des)';
  sortByTimeDButton.classList.add("button");

  sortButtons.appendChild(sortByWinsAButton);
  sortButtons.appendChild(sortByWinsDButton);
  sortButtons.appendChild(sortByTimeAButton);
  sortButtons.appendChild(sortByTimeDButton);

sortByWinsAButton.onclick = () => {
  getWinners(currentPage, 'wins', 'ASC');
};

sortByWinsDButton.onclick = () => {
  getWinners(currentPage, 'wins', 'DESC');
};

sortByTimeAButton.onclick = () => {
  getWinners(currentPage, 'time', 'ASC');
};

sortByTimeDButton.onclick = () => {
  getWinners(currentPage, 'time', 'DESC');
};


  showModal();
  // getWinners(1);
}
