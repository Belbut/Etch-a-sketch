//----------------------------------------------------------------- ELements

let inputRangeGrid = document.getElementById("grid-size-range");
let gridSizeLabel = document.getElementById("grid-size-label");

const gridContent = document.getElementById("grid-content-container");
const colorPallet = document.getElementById("color-pallet");
const rainbowButton = document.getElementById("rainbow-button");
const shadowButton = document.getElementById("shadow-button");
const clearButton = document.getElementById("clear-button");
const eraserButton = document.getElementById("eraser-button");

//----------------------------------------------------------------- Variables

const MODES_OF_PAINTING = ["normal", "rainbow", "shadowing"];
let colorBrush;
let isMouseDown;
let brushInUse;

//----------------------------------------------------------------- Functions
//Initialize all listener and variables
function onStart() {
    colorBrush = colorPallet.value;
    normalBrush();

    gridSizeLabel.textContent = `Grid Size:${inputRangeGrid.value}`;
    renderGrid(inputRangeGrid.value);

    inputRangeGrid.addEventListener("input", () => {
        inputRangeGrid = document.getElementById("grid-size-range");
        gridSizeLabel = document.getElementById("grid-size-label");
        gridSizeLabel.textContent = `Grid Size:${inputRangeGrid.value}`;
        clearGrid();
        renderGrid(inputRangeGrid.value);
    });

    colorPallet.addEventListener("input", () => {
        normalBrush();
        colorBrush = colorPallet.value;
    });

    rainbowButton.addEventListener("click", () => rainbowBrush());

    shadowButton.addEventListener("click", () => shadowBrush());

    clearButton.addEventListener("click", () => {
        clearGrid();
        renderGrid(inputRangeGrid.value);
    });

    eraserButton.addEventListener("click", () => {
        normalBrush();
        colorBrush = window.getComputedStyle(gridContent, null).getPropertyValue("background-color");
    });

    gridContent.addEventListener("mousedown", () => isMouseDown = true);
    gridContent.addEventListener("mouseup", () => isMouseDown = false);
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
    if (isMouseDown) {
        switch (brushInUse) {
            //normal
            case MODES_OF_PAINTING[0]:
                square.target.style.backgroundColor = colorBrush;
                square.target.style.opacity = "";
                break;
            //rainbow
            case MODES_OF_PAINTING[1]:
                square.target.style.backgroundColor = randomColor();
                square.target.style.opacity = "";
                break;
            //shadowing
            case MODES_OF_PAINTING[2]:
                square.target.style.backgroundColor = colorBrush;
                square.target.style.opacity = Number(square.target.style.opacity) + 0.1;
                break;
        }
    }
}

function clearGrid() {
    const endOfLifeGridBox = document.getElementsByClassName("grid-line");
    for (let i = endOfLifeGridBox.length; i > 0; i--) {
        endOfLifeGridBox[i - 1].remove();
    }
}

const randomColor =() => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
const normalBrush = ()=>brushInUse = MODES_OF_PAINTING[0];
const rainbowBrush=() => brushInUse = MODES_OF_PAINTING[1];
const shadowBrush=() => brushInUse = MODES_OF_PAINTING[2];


//----------------------------------------------------------------- Run
onStart();