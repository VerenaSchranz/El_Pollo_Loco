let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let muteSoundsInGame = false;

function init() {
  startScreenClose();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}


function startScreenClose() {
  document.getElementById('startScreen').classList.add('d-none');
  document.getElementById('gameOverScreen').classList.add('d-none');

  document.getElementById('canvas').classList.remove('d-none');
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

function gameOver() {
  document.getElementById("gameOverScreen").classList.remove('d-none');
  gameisOver();
}

function winGame() {
  // document.getElementById("winGameScreen").remove.classList('d-none');
  document.getElementById("canvas").add.classList('d-none');
  document.getElementById("winGameScreen").remove.classList('d-none');
  gameisOver();
}

function gameisOver() {
  for (let i = 1; i < 9999; i++){ 
    window.clearInterval(i);
  }
}

function restartGame() {
  world = new World(canvas, keyboard);
  document.getElementById("gameOverScreen").classList.add('d-none');
  document.getElementById("winGameScreen").classList.add('d-none');
  document.getElementById("canvas").classList.remove('d-none');
  startScreenClose();
  stopGame();
  init();
}

function stopGame() {
intervalIds = [];}


function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}
