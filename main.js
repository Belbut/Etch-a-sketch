let rangeInput = document.getElementById("grid-size-range");
let gridSizeLabel = document.getElementById("grid-size-label");

const gridContent = document.getElementById("grid-content-container");
const colorPallet = document.getElementById("color-pallet");
const rainbowButton = document.getElementById("rainbow-button");
const shadowButton = document.getElementById("shadow-button");
const clearButton = document.getElementById("clear-button");
const eraserButton = document.getElementById("eraser-button");



const MODES_OF_PAINTING = ["normal", "rainbow", "shadowing"];
let colorBrush;
let isMouseDown;
let brushInUse;


function onStart() {
    colorBrush = colorPallet.value;
    normalBrush();

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

    colorPallet.addEventListener("input", () => {
        normalBrush();
        colorBrush = colorPallet.value;
    });

    rainbowButton.addEventListener("click", () => rainbowBrush());

    shadowButton.addEventListener("click", ()=> shadowBrush());

    clearButton.addEventListener("click", () => {
        clearGrid();
        renderGrid(rangeInput.value);
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
                square.target.style.opacity="";
                break;
            //rainbow
            case MODES_OF_PAINTING[1]:
                square.target.style.backgroundColor = randomColor();
                square.target.style.opacity="";
                break;
            //shadowing
            case MODES_OF_PAINTING[2]:
                square.target.style.backgroundColor = colorBrush;
                square.target.style.opacity=Number(square.target.style.opacity)+0.1;
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

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


// created by "bionicvapourboy";
function percentToHex (p) {
    const percent = Math.max(0, Math.min(100, p)); // bound percent from 0 to 100
    const intValue = Math.round(percent / 100 * 255); // map percent to nearest integer (0 - 255)
    const hexValue = intValue.toString(16); // get hexadecimal representation
    return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
}


function normalBrush() { brushInUse = MODES_OF_PAINTING[0] };
function rainbowBrush() { brushInUse = MODES_OF_PAINTING[1] };
function shadowBrush() { brushInUse = MODES_OF_PAINTING[2] }

onStart();
