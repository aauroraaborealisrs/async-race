import { Pages } from "./updateGarageHeaderWithCarCount";

const nextPageButton = document.getElementById("nextPage") as HTMLButtonElement;
const previousPageButton = document.getElementById(
  "prevPage",
) as HTMLButtonElement;

async function getTotalPages(): Promise<number> {
  const totalPages = await Pages();
  console.log(totalPages);
  return totalPages;
}

const totalPages = getTotalPages();
export function buttonsState(currentPg: number) {
  if (currentPg === 1) {
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
