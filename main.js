let rangeInput = document.getElementById("grid-size-range");
let gridSizeLabel = document.getElementById("grid-size-label");
gridSizeLabel.textContent = `Grid Size:${rangeInput.value}`;

// TODO: Find a way to auto update this with out a EventListener
rangeInput.addEventListener("click", () => {
    rangeInput = document.getElementById("grid-size-range");
    gridSizeLabel = document.getElementById("grid-size-label");
    gridSizeLabel.textContent = `Grid Size:${rangeInput.value}`;
});
