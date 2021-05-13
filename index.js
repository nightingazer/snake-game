const grid = document.querySelector('.grid')
const startButton = document.getElementById('start-btn')
const score = document.getElementById('score')

//1 is right; -1 is left; 20 is down; -20 is up;
let direction = 1;
let isKeyPressed = false;

let squares = [];
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
        squares.push(square);
    }
}

function doGameCycle() {
    move();
}

function checkCollision() {
    if (
        ((snake[0] - 20 < 0) && direction === -20) ||  //snake hits top wall!
        ((snake[0] % 20 === 19) && direction === 1) ||  //snake hits right wall!
        ((snake[0] + 20 > 400) && direction === 20) ||  //snake hits bottom wall!
        ((snake[0] % 20 === 0) && direction === -1) ||  //snake hits left wall!
        (squares[snake[0] + direction].classList.contains('snake'))
    ) {
        clearInterval(gameTick);
        return true;
    }
    return false;
}

function move() {
    if (!checkCollision()) {
        squares[(snake.pop())].classList.remove('snake');
        snake.unshift(snake[0] + direction);
        squares[snake[0]].classList.add('snake');
        isKeyPressed = false;
    }
}

function keyHandler(event) {
    if (!isKeyPressed) {
        isKeyPressed = true;
        switch (event.key) {
            case 'ArrowUp':
                direction = direction === 20 ? 20 : -20;
                break;
            case 'ArrowRight':
                direction = direction === -1 ? -1 : 1;
                break;
            case 'ArrowDown':
                direction = direction === -20 ? -20 : 20
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
    squares[frag].classList.add('snake');
})


let gameTick = setInterval(doGameCycle, 100);





document.addEventListener('keydown', keyHandler);

