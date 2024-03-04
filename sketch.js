const main = document.querySelector ('html');
const body = document.querySelector ('body');

const container = document.createElement ('div');
body.appendChild (container);
container.classList.add ('container');

const h1 = document.createElement ('h1');
h1.textContent = "ETCH-A-SKETCH";
container.appendChild (h1);
const h3 = document.createElement ('h3');
h3.textContent = "Start a Sketch!";
container.appendChild (h3);


//creating resetting buttons
const buttonContainer = document.createElement ('div');
container.appendChild (buttonContainer);
const resize = document.createElement ('button');
resize.textContent = "resize";
const reset = document.createElement ('button');
reset.textContent = "reset";
const clear = document.createElement ('button');
clear.textContent = "clear";
buttonContainer.appendChild (resize);
buttonContainer.appendChild (reset);
buttonContainer.appendChild (clear);
buttonContainer.classList.add ('buttons');

//creating radio buttons
const switchContainer = document.createElement ('div');
buttonContainer.appendChild (switchContainer);
const black = document.createElement ('input');
const shade = document.createElement ('input');
const RGB = document.createElement ('input');
black.type = 'radio'; 
shade.type = 'radio'; 
RGB.type = 'radio'; 
const blacklabel = document.createElement ('label');
blacklabel.htmlFor = black; blacklabel.innerHTML = "black";
const shadelabel = document.createElement ('label');
shadelabel.htmlFor = shade; shadelabel.innerHTML = "shade";
const RGBlabel = document.createElement ('label');
RGBlabel.htmlFor = RGB; RGBlabel.innerHTML = "RGB";
switchContainer.setAttribute('style', 'display: flex; gap: 8px;')

switchContainer.appendChild (black);
switchContainer.appendChild (blacklabel);
switchContainer.appendChild (shade);
switchContainer.appendChild (shadelabel);
switchContainer.appendChild (RGB);
switchContainer.appendChild (RGBlabel);


const gridContainer = document.createElement ('div');
container.appendChild (gridContainer);
const grid = document.createElement ('div');
gridContainer.appendChild (grid);
gridContainer.classList.add ('grid-container');
grid.classList.add ('grid');

black.addEventListener ('click', function () {
    if (RGB.checked) RGB.checked = false;
    if (shade.checked) shade.checked = false;
});

RGB.addEventListener ('click', function () {
    if (black.checked) black.checked = false;
    if (shade.checked) shade.checked = false;
});

shade.addEventListener ('click', function () {
    if (black.checked) black.checked = false;
    if (RGB.checked) RGB.checked = false;
});


//Event Listeners
reset.addEventListener ('click', resetGrid);
resize.addEventListener ('click', resizeGrid);

//Add squares to container
function createGrid (gridSize) {
    grid.innerHTML = ''; //Empties the grid
    const gridSquareNumber = gridSize * gridSize;

    for (let i = 0; i < (gridSquareNumber ? gridSquareNumber : 256); i ++) {
        const square = document.createElement ('div');
        square.classList.add ('square');
        square.style.opacity = '0';
        square.style.flex = '0 0 calc(100% / ' + gridSize + ')';
        grid.appendChild (square);

        //mark squares on hover
        square.addEventListener ('mouseenter', function () {
            if (black.checked) {
                this.style.opacity = 1;
                if (this.classList.contains ('marked-rgb') || this.classList.contains ('marked-shade')) {
                    this.classList.remove ('marked-rgb');
                    this.classList.remove ('marked-shade');
                }
                this.classList.add ('marked-black');
            }
            else if (RGB.checked) {
                this.style.opacity = 1;
                if (this.classList.contains ('marked-black') || this.classList.contains ('marked-shade')) {
                    this.classList.remove ('marked-black');
                    this.classList.remove ('marked-shade');
                }
                this.classList.add ('marked-rgb');
                this.style.setProperty ('--red', Math.floor (Math.random () * 256));
                this.style.setProperty ('--blue', Math.floor (Math.random () * 256));
                this.style.setProperty ('--green', Math.floor (Math.random () * 256));
            }
            else if (shade.checked) {
                if (this.classList.contains ('marked-rgb') || this.classList.contains ('marked-black')) {
                    this.classList.remove ('marked-black');
                    this.classList.remove ('marked-rgb');
                }
                this.classList.add ('marked-shade');
                if (parseFloat (this.style.opacity) < 1) {
                    this.style.opacity = parseFloat (this.style.opacity) + 0.1;
                }
            }
        });

        //clear the board
        clear.addEventListener ('click', function () {
            square.style.opacity = '0';
            square.classList.remove ('marked-black');
            square.classList.remove ('marked-shade');
            square.classList.remove ('marked-rgb');
        });
    } 
};

//function to run on window load
(function () {
    createGrid (16);
}) ();

//reset 
function resetGrid () {
    createGrid (16);
}

//resizing this grid
function resizeGrid () {
    const gridSize = prompt ('Enter a number: ');
    if (!gridSize) return ;
    if (gridSize > 100 || gridSize <= 0 || (gridSize % 1 !== 0)) {
        alert ('Number invalid!');
        resizeGrid();
    }
    else {
        const markedSquares = document.querySelectorAll ('.marked-black');
        markedSquares.forEach (function (element) {
            element.classList.remove ('marked-black');
            element.classList.remove ('marked-shade');
            element.classList.remove ('marked-rgb');
        });
        createGrid (gridSize);
    }
};