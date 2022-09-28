let rangeInput = document.getElementById("grid-size-range");
let gridSizeLabel = document.getElementById("grid-size-label");
gridSizeLabel.textContent = `Grid Size:${rangeInput.value}`;

const gridContent = document.getElementById("grid-content-container");

const clearButton = document.getElementById("clear-button");
const eraserButton = document.getElementById("eraser-button");


// TODO: Find a way to auto update this with out a Event Listener
rangeInput.addEventListener("click", () => {
    rangeInput = document.getElementById("grid-size-range");
    gridSizeLabel = document.getElementById("grid-size-label");
    gridSizeLabel.textContent = `Grid Size:${rangeInput.value}`;

    clearGrid();
    renderGrid(rangeInput.value);
});

clearButton.addEventListener("click", ()=>  {
    clearGrid();
    renderGrid();
});



function renderGrid(gridSize) {
    for (let i = 1; i <= rangeInput.value; i++) {
        const squareGrid = document.createElement("div");
        squareGrid.setAttribute("class", "grid-box");
        gridContent.append(squareGrid);
    }


}

function clearGrid() {
    const endOfLifeGridBox = document.getElementsByClassName("grid-box");
    for(let i=endOfLifeGridBox.length; i>0;i--){
        endOfLifeGridBox[i-1].remove();
    }
}
    
  

renderGrid(rangeInput.value);
