const grid = document.querySelector(".grid");
const startButton = document.getElementById("start-btn");
const scoreboard = document.getElementById("score");
const width = 20;

let tick = 250;

//1 is right; -1 is left; width is down; -width is up;
let direction = 1;

let field = [];
let snake = [2, 1, 0];
let appleIndex = 0;
let score = 0;

function createGrid() {
	//create 100 of these elements with a for loop
	for (let i = 0; i < 400; i++) {
		//create element
		const square = document.createElement("div");
		console.log(square);
		//add styling to the element
		square.classList.add("square");
		//put the element into our grid
		grid.appendChild(square);
		//push it into a new squares array
		field.push(square);
	}
}

function doGameCycle() {
	move();
}

function checkCollision() {
	if (
		(snake[0] - width < 0 && direction === -width) || //snake hits top wall!
		(snake[0] % width === width - 1 && direction === 1) || //snake hits right wall!
		(snake[0] + width > width * width && direction === width) || //snake hits bottom wall!
		(snake[0] % width === 0 && direction === -1) || //snake hits left wall!
		field[snake[0] + direction].classList.contains("snake") //snake bit its tail!
	) {
		clearInterval(gameTick);
		return true;
	}
	return false;
}

function move() {
	if (!checkCollision()) {
		if (field[snake[0]].classList.contains("apple")) {
			eatApple();
			generateApple();
		} else {
			field[snake.pop()].classList.remove("snake");
		}
		snake.unshift(snake[0] + direction);
		field[snake[0]].classList.add("snake");
		isKeyPressed = false;
	}
}

function eatApple() {
	field[appleIndex].classList.remove("apple");
	tick = tick * 0.9;
	score++;
	scoreboard.textContent = score;
	clearInterval(gameTick);
	gameTick = setInterval(doGameCycle, tick);
}

function generateApple() {
	do {
		appleIndex = Math.floor(Math.random() * 401);
	} while (field[appleIndex].classList.contains("snake"));
	field[appleIndex].classList.add("apple");
}

function keyHandler(event) {
	switch (event.key) {
		case "ArrowUp":
			if (field[snake[0] - width].classList.contains("snake")) {
				break;
			}
			direction = -width;
			break;
		case "ArrowRight":
			if (field[snake[0] + 1].classList.contains("snake")) {
				break;
			}
			direction = 1;
			break;
		case "ArrowDown":
			if (field[snake[0] + width].classList.contains("snake")) {
				break;
			}
			direction = width;
			break;
		case "ArrowLeft":
			if (field[snake[0] - 1].classList.contains("snake")) {
				break;
			}
			direction = -1;
			break;
		case "Escape":
			clearInterval(gameTick);
			break;
	}
}

createGrid();
generateApple();

snake.forEach((frag) => {
	field[frag].classList.add("snake");
});

let gameTick = setInterval(doGameCycle, tick);

document.addEventListener("keydown", keyHandler);
