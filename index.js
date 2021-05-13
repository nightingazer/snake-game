const grid = document.querySelector('.grid')
const startButton = document.getElementById('start-btn')
const score = document.getElementById('score')
const width = 20;

//1 is right; -1 is left; width is down; -width is up;
let direction = 1;

//prevents double key presses in one tick
let isKeyPressed = false;

let field = [];
let snake = [2, 1, 0];

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i = 0; i < 400; i++) {
        //create element
        const square = document.createElement('div')
        console.log(square)
        //add styling to the element
        square.classList.add('square')
        //put the element into our grid
        grid.appendChild(square)
        //push it into a new squares array
        field.push(square);
    }
}

function doGameCycle() {
    move();
}

function checkCollision() {
    if (
        ((snake[0] - width < 0) && direction === -width)            ||  //snake hits top wall!
        ((snake[0] % width === width - 1) && direction === 1)       ||  //snake hits right wall!
        ((snake[0] + width > width * width) && direction === width) ||  //snake hits bottom wall!
        ((snake[0] % width === 0) && direction === -1)              ||  //snake hits left wall!
        (field[snake[0] + direction].classList.contains('snake'))     //snake bit its tail!
    ) {
        clearInterval(gameTick);
        return true;
    }
    return false;
}

function move() {
    if (!checkCollision()) {
        field[(snake.pop())].classList.remove('snake');
        snake.unshift(snake[0] + direction);
        field[snake[0]].classList.add('snake');
        isKeyPressed = false;
    }
}

function keyHandler(event) {
    if (!isKeyPressed) {
        isKeyPressed = true;
        switch (event.key) {
            case 'ArrowUp':
                direction = direction === width ? width : -width;
                break;
            case 'ArrowRight':
                direction = direction === -1 ? -1 : 1;
                break;
            case 'ArrowDown':
                direction = direction === -width ? -width : width
                break;
            case 'ArrowLeft':
                direction = direction === 1 ? 1 : -1;
                break;
            case 'Escape':
                clearInterval(gameTick);
                break;
        }
    }
}



createGrid();

snake.forEach((frag) => {
    field[frag].classList.add('snake');
})


let gameTick = setInterval(doGameCycle, 100);





document.addEventListener('keydown', keyHandler);

