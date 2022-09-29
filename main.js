let rangeInput = document.getElementById("grid-size-range");
let gridSizeLabel = document.getElementById("grid-size-label");

const gridContent = document.getElementById("grid-content-container");

const colorPallet = document.getElementById("color-pallet");

const clearButton = document.getElementById("clear-button");
const eraserButton = document.getElementById("eraser-button");

let colorBrush = colorPallet.value;
console.log(colorBrush);

onStart();

function onStart() {
    gridSizeLabel.textContent = `Grid Size:${rangeInput.value}`;
    renderGrid(rangeInput.value);

    // TODO: Find a way to auto update this with out a Event Listener
    rangeInput.addEventListener("input", () => {
        rangeInput = document.getElementById("grid-size-range");
        gridSizeLabel = document.getElementById("grid-size-label");
        gridSizeLabel.textContent = `Grid Size:${rangeInput.value}`;
        clearGrid();
        renderGrid(rangeInput.value);
    });

    colorPallet.addEventListener("input", () => colorBrush = colorPallet.value);

    clearButton.addEventListener("click", () => {
        clearGrid();
        renderGrid(rangeInput.value);
    });

    eraserButton.addEventListener("click", () =>
        colorBrush = window.getComputedStyle(gridContent, null).getPropertyValue("background-color"));

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
            gridSquare.addEventListener("mouseover", (square) => paintSquare(square));
        }
    }
}

function paintSquare(square) {
    square.target.style.backgroundColor = colorBrush;
}

function clearGrid() {
    const endOfLifeGridBox = document.getElementsByClassName("grid-line");
    for (let i = endOfLifeGridBox.length; i > 0; i--) {
        endOfLifeGridBox[i - 1].remove();
    }
}


