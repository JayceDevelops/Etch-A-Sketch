const colors = [
    "red",
    "green",
    "blue",
    "purple",
    "yellow",
    "black",
    "brown",
    "cyan",
    "grey",
    "orange",
    "wheat",
    "skyblue",
    "silver",
    "tan",
    "seagreen"
]

let currentColor = 'white';
let onEraser = false;
let onDelete = false;

let rows = 16;
let columns = 16;

let isLeftMouseDown = false;

const GenerateColorPalette = (() => {
    const colorPalette = document.querySelector("#colorPalette");

    for (let i = 0; i <= 16; i++){

        const color = document.createElement("div");
        color.className = "color";

        if (i < 15){
            color.style.backgroundColor = colors[i];
        }
        else if (i < 16){
            color.style.background = "url('assets/eraser.svg')";
            color.style.backgroundPosition = "center";
            color.style.backgroundSize = "cover";
            color.style.backgroundRepeat = "no-repeat";
        }
        else {
            color.style.background = "url('assets/delete.svg')";
            color.style.backgroundColor = "tomato";
            color.style.backgroundPosition = "center";
            color.style.backgroundSize = "cover";
            color.style.backgroundRepeat = "no-repeat";
        }

        color.style.padding = "1rem";
        color.style.borderRadius = "10px";
        color.style.cursor = "pointer";

        color.addEventListener("click",() => {
            console.log(color.style.backgroundColor);
            if (color.style.backgroundColor === "tomato"){
                const removeGrid = document.querySelector("#gridHolder");
                removeGrid.remove();
                GenerateGrid(rows, columns);
            }
            else if (color.style.backgroundSize === "cover"){
                currentColor = "white";
            }
            else{
                currentColor = color.style.backgroundColor; 
            }
        });

        colorPalette.appendChild(color);
    }
});

const GenerateGrid = ((rows, columns) => {
    const grid = document.createElement("div");
    grid.id = "gridHolder";
    grid.style.display = "grid";
    grid.style.gridTemplateRows = `repeat(${rows}, auto)`;
    grid.style.gridTemplateColumns = `repeat(${columns}, auto)`;

    const gridParent = document.querySelector(".grid");
    gridParent.appendChild(grid);

    let numOfSquares = rows * columns;

    for (let i = 0; i < numOfSquares; i++){

        const square = document.createElement("div");
        square.className = "square";

        square.addEventListener("mousedown", () => {
            isLeftMouseDown = true;
            square.style.backgroundColor = currentColor;
        });

        square.addEventListener("mouseup", () => {
            isLeftMouseDown = false;
        });

        square.addEventListener("mouseover", () => {
            if (isLeftMouseDown){
                square.style.backgroundColor = currentColor;
            }
        });

        grid.appendChild(square);
    }

    const gridDim = document.querySelector("#gridSize");
    const gridDimParent = document.querySelector(".grid");

    gridDimParent.insertBefore(grid, gridDim);
});

const rowsInput = document.querySelector(".row");
rowsInput.addEventListener('input', () => {

    if (Number(rowsInput.value) > 100){
        alert("Limit Reached: 100 rows");
        rows = 100;
        rowsInput.textContent = "100";
    }else {
        rows = Number(rowsInput.value);
    }

    const removeGrid = document.querySelector("#gridHolder");
    removeGrid.remove();
    GenerateGrid(rows, columns);
    
});

rowsInput.onkeydown = function(event) {
    if (isNaN(event.key) && event.key !== 'Backspace' && event.key !== 'Delete'){
        event.preventDefault();
    }
}

const columnsInput = document.querySelector(".columns");
columnsInput.addEventListener('input', () => {

    if (Number(columnsInput.value) > 100){
        alert("Limit Reached: 100 columns");
        columns = 100;
    }
    else {
        columns = Number(columnsInput.value);
    }
    
    const removeGrid = document.querySelector("#gridHolder");
    removeGrid.remove();
    GenerateGrid(rows, columns);
});

columnsInput.onkeydown = function(event) {
    if (isNaN(event.key) && event.key !== 'Backspace' && event.key !== 'Delete'){
        event.preventDefault();
    }
}
GenerateColorPalette();
GenerateGrid(rows, columns);