import { Pages } from "./updateGarageHeaderWithCarCount";

async function getTotalPages(): Promise<number> {
  const totalPages = await Pages();
  return totalPages;
}

const totalPages = getTotalPages();

export function buttonsState(currentPg: number) {

  const nextPageButton = document.getElementById("nextPage") as HTMLButtonElement;
const previousPageButton = document.getElementById(
  "prevPage",
) as HTMLButtonElement;

  if (currentPg == 1) {
    if (previousPageButton) {
      previousPageButton.disabled = true;
    }
    if (nextPageButton) {
      nextPageButton.disabled = false;
    }
  } else {
    (async () => {
      const totalPagesNumber = await totalPages;
      if (currentPg === totalPagesNumber) {
        if (nextPageButton) {
          nextPageButton.disabled = true;
        }
        if (previousPageButton) {
          previousPageButton.disabled = false;
        }
      } else {
        if (previousPageButton) {
          previousPageButton.disabled = false;
        }
        if (nextPageButton) {
          nextPageButton.disabled = false;
        }
      }
    })();
  }
}
