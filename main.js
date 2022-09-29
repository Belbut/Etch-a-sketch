let rangeInput = document.getElementById("grid-size-range");
let gridSizeLabel = document.getElementById("grid-size-label");

const gridContent = document.getElementById("grid-content-container");

const clearButton = document.getElementById("clear-button");
const eraserButton = document.getElementById("eraser-button");

onStart();

function onStart() {
    gridSizeLabel.textContent = `Grid Size:${rangeInput.value}`;
    renderGrid(rangeInput.value);

    // TODO: Find a way to auto update this with out a Event Listener
    rangeInput.addEventListener("click", () => {
        rangeInput = document.getElementById("grid-size-range");
        gridSizeLabel = document.getElementById("grid-size-label");
        gridSizeLabel.textContent = `Grid Size:${rangeInput.value}`;

        clearGrid();
        renderGrid(rangeInput.value);
    });

    clearButton.addEventListener("click", () => {
        clearGrid();
        renderGrid(rangeInput.value);
    });
}

function renderGrid(gridSize) {
    for (let line = 1; line <= gridSize; line++) {
        const gridLine = document.createElement("div");
        gridLine.setAttribute("class", "grid-line");
        gridContent.append(gridLine);
        for (let colum = 1; colum <= gridSize; colum++) {
            const gridSquare = document.createElement("div");
            gridSquare.setAttribute("class", "grid-square");
            gridLine.append(gridSquare);
        }
    }

}

function clearGrid() {
    const endOfLifeGridBox = document.getElementsByClassName("grid-line");
    for (let i = endOfLifeGridBox.length; i > 0; i--) {
        endOfLifeGridBox[i - 1].remove();
    }
}


