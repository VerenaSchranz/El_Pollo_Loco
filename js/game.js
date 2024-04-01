let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let backgroundMusic = new Audio('./audio/background_music.mp3');
backgroundMusic.volume = 0.2;
backgroundMusic.loop = true;
let backgroundSound = true;
let mainSound = false;
let isLoading = false;
playBackgroundMusic();


/**
 * Starts the game by closing the start screen, showing the loading screen, initializing the level, setting up the canvas, playing background music, and creating a new world.
 *
 * @return {Promise<void>} 
 */
async function startGame() {
  startScreenClose()
  showLoadingScreen();
  initLevel();
  canvas = document.getElementById('canvas');
  playBackgroundMusic();
  world = new World(canvas, keyboard);
}


/**
 * Function to show a loading screen briefly on the web page.
 *
 */
async function showLoadingScreen() {
  document.getElementById('loadingScreen').classList.remove('hide');
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hide');
  }, 800);
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


/**
 * Function to handle the game over logic.
 *
 */
function gameOver() {
  document.getElementById("gameOverScreen").classList.remove('d-none');
  stopGame();
  document.getElementById("mute").classList.add('d-none');
  backgroundMusic.pause();
}

/**
 * Function to display the win game screen, stop the game, hide the mute button, and pause the background music.
 *
 * No parameters
 * No return value
 */
function winGame() {
  document.getElementById("winGameScreen").classList.remove('d-none');
  stopGame();
  document.getElementById("mute").classList.add('d-none');
  backgroundMusic.pause();
}

/**
 * Restarts the game by creating a new World object, hiding the game over and win game screens,
 * showing the canvas and mute button, and starting the game again.
 *
 */
function restartGame() {
  world = new World(canvas, keyboard);
  document.getElementById("gameOverScreen").classList.add('d-none');
  document.getElementById("winGameScreen").classList.add('d-none');
  document.getElementById("canvas").classList.remove('d-none');
  document.getElementById("mute").classList.remove('d-none');
  startScreenClose();
  startGame();
}


/**
 * Stops the game by clearing all intervals.
 *
 * @return {void} 
 */
function stopGame() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}


/**
 * Sets an interval that can be stopped by calling the `clearStoppableIntervals` function.
 *
 * @param {function} fn - The function to be executed at each interval.
 * @param {number} time - The time interval in milliseconds.
 * @return {number} The ID of the interval.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}


/**
 * Plays or pauses the background music based on the value of the `backgroundSound` variable.
 *
 * @return {void} This function does not return a value.
 */
function playBackgroundMusic() {
  if (backgroundSound) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
}

/**
 * Toggles the mute state of the main sound and background sound.
 *
 */
function toggleMute() {
  mainSound = !mainSound;
  backgroundSound = !backgroundSound;
  playBackgroundMusic();
  updateMuteIcon();
}

/**
 * Updates the mute icon based on the current state of the background sound.
 *
 * @return {void} This function does not return a value.
 */
function updateMuteIcon() {
  let muteIcon = document.getElementById('muteIcon');
  if (backgroundSound) {
    muteIcon.src = './img/12_icons/sound_on.svg';
  } else {
    muteIcon.src = './img/12_icons/sound_off.svg';
  }
}


/**
 * Function to toggle the visibility of the first popup element.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function popupToggleFirst() {
  const popupFirst = document.getElementById('popupIntroTextFirst');
  const popupContentFirst = document.getElementById('popupContentFirst');
  popupFirst.classList.toggle('popupHideWrapperFirst');
  popupContentFirst.classList.toggle('popupHideInnerContentFirst');
  changeImage(popupFirst, 'imageChangeFirst', 'book');
}


/**
 * Toggles the visibility of a popup and its content by modifying their CSS classes.
 *
 */
function popupToggleSecond() {
  const popupSecond = document.getElementById('popupIntroTextSecond');
  const popupContentSecond = document.getElementById('popupContentSecond');
  popupSecond.classList.toggle('popupHideWrapperSecond');
  popupContentSecond.classList.toggle('popupHideInnerContentSecond');
  changeImage(popupSecond, 'imageChangeSecond', 'info');
}


/**
 * Change the image source based on the visibility of the popup and the icon type.
 *
 * @param {Element} popup - The popup element
 * @param {string} imageId - The id of the image element
 * @param {string} iconType - The type of the icon
 * @return {void} 
 */
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


/**
 * Toggles the visibility of a popup and updates the image source based on the popup's visibility.
 *
 * @return {void} This function does not return a value.
 */
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
