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
let isLoading = false;
playBackgroundMusic();




async function startGame() {
  startScreenClose()
  showLoadingScreen();
  initLevel();
  canvas = document.getElementById('canvas');
  playBackgroundMusic();
  world = new World(canvas, keyboard);
}

async function showLoadingScreen() {
  document.getElementById('loadingScreen').classList.remove('hide');
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hide');
  }, 400);
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
  startGame();
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
  const isHidden = popup.classList.contains('popupHideWrapperFirst') || popup.classList.contains('popupHideWrapperSecond');

  if (isHidden) {
    imageElement.src = "./img/12_icons/close.svg"; 
  } else {
    if (iconType === 'info') {
      imageElement.src = "./img/12_icons/book.svg"; 
    }
    if (iconType === 'book') {
      imageElement.src = "./img/12_icons/info.svg"; 
    }
  }
}


function popupToggle() {
  const popup = document.getElementById('popupIntroText');
  const popupContent = document.getElementById('popupContent');
  const imageChange = document.getElementById('imageChange');
  popup.classList.toggle('popupHideWrapper');
  popupContent.classList.toggle('popupHideInnerContent');
  
  if (popup.classList.contains('popupHideWrapper')) {
    imageChange.src = "./img/12_icons/close.svg"; // Pfad zum anderen Bild ändern
  } else {
    imageChange.src = "./img/12_icons/info.svg"; // Pfad zum Bild ändern
  }
}
