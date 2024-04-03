class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;
  R = false;
  dPressedLastInterval = false;

  /**
   * A constructor method that binds key press and button press events.
   */
  constructor() {
    this.bindKeyPressEvents();
    this.bindBtsPressEvents();
  }

  /**
   * Binds key press events to set keyboard properties accordingly.
   *
   */
  bindKeyPressEvents() {
    window.addEventListener('keydown', (e) => {
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

      if (e.keyCode == 82) {
        keyboard.R = true;
      }
    });

    window.addEventListener('keyup', (e) => {
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
  }

  /**
   * Binds touch events to corresponding buttons for left, right, jump, and throw actions.
   */
  bindBtsPressEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.SPACE = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.D = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.D = false;
    });

  }
}
