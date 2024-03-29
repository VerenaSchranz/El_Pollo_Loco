let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let backgroundMusic = new Audio('./audio/background_music.mp3');
backgroundMusic.volume = 0.2;
backgroundMusic.loop = true;
// let backgroundSound = true;
let backgroundSound = true;
let mainSound = false;
playBackgroundMusic();

function popupToggleFirst() {
  const popupFirst = document.getElementById('popupIntroTextFirst');
  const popupContentFirst = document.getElementById('popupContentFirst');
  popupFirst.classList.toggle('popupHideWrapperFirst');
  popupContentFirst.classList.toggle('popupHideInnerContentFirst');
  changeImage(popupFirst, 'imageChangeFirst', 'book');
}

function popupToggleSecond() {
  const popupSecond = document.getElementById('popupIntroTextSecond');
  const popupContentSecond = document.getElementById('popupContentSecond');
  popupSecond.classList.toggle('popupHideWrapperSecond');
  popupContentSecond.classList.toggle('popupHideInnerContentSecond');
  changeImage(popupSecond, 'imageChangeSecond', 'info');
}

function changeImage(popup, imageId, iconType) {
  const imageElement = document.getElementById(imageId);
  const isHidden = popup.classList.contains('popupHideWrapperFirst') ||
                  popup.classList.contains('popupHideWrapperSecond');

  if (isHidden) {
    imageElement.src = "./img/12_icons/close.svg"; 
  } else {
    if (iconType === 'book') {
      imageElement.src = "./img/12_icons/book.svg"; 
    } else if (iconType === 'info') {
      imageElement.src = "./img/12_icons/info.svg"; 
    }
  }
}

// Am Anfang die Close-Icons anzeigen
changeImage(document.getElementById('popupIntroTextFirst'), 'imageChangeFirst', 'book');
changeImage(document.getElementById('popupIntroTextSecond'), 'imageChangeSecond', 'info');



function init() {
  startScreenClose();
  playBackgroundMusic();
  canvas = document.getElementById('canvas');
  initLevel();
  world = new World(canvas, keyboard);
}


function startScreenClose() {
  document.getElementById('startScreen').classList.add('d-none');
  document.getElementById('gameOverScreen').classList.add('d-none');
  document.getElementById('infoBtn').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
}

function backToMenu() {
  document.getElementById('startScreen').classList.remove('d-none');
  document.getElementById('infoBtn').classList.remove('d-none');
  document.getElementById("gameOverScreen").classList.add('d-none');
  document.getElementById("winGameScreen").classList.add('d-none');
  document.getElementById("canvas").classList.remove('d-none');
  document.getElementById("mute").classList.remove('d-none');
}



function gameOver() {
  document.getElementById("gameOverScreen").classList.remove('d-none');
  stopGame();
  document.getElementById("mute").classList.add('d-none');
  backgroundMusic.pause();
}

function winGame() {
  document.getElementById("winGameScreen").classList.remove('d-none');
  stopGame();
  document.getElementById("mute").classList.add('d-none');
  backgroundMusic.pause();
}

function restartGame() {
  world = new World(canvas, keyboard);
  document.getElementById("gameOverScreen").classList.add('d-none');
  document.getElementById("winGameScreen").classList.add('d-none');
  document.getElementById("canvas").classList.remove('d-none');
  document.getElementById("mute").classList.remove('d-none');
  startScreenClose();
  init();
}

function stopGame() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}


function playBackgroundMusic() {
  if (backgroundSound) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
}

function toggleMute() {
  mainSound = !mainSound;
  backgroundSound = !backgroundSound;
  playBackgroundMusic();
  updateMuteIcon();
}

function updateMuteIcon() {
  let muteIcon = document.getElementById('muteIcon');
  if (backgroundSound) {
    muteIcon.src = './img/12_icons/sound_on.svg';
  } else {
    muteIcon.src = './img/12_icons/sound_off.svg';
  }
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