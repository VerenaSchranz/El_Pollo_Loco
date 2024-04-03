class Endboss extends MovableObject {
  speedAngry = 2;
  speed = 0.15;
  isDead = false;
  inDamage = false;
  isAlert = false;
  moveLeftAngry = false;
  aggressive = false;
  endbossImmune = false;
  energyEndboss = 100;
  otherDirection = false;
  height = 400;
  width = 280;
  y = 60;
  endbossdead_sound = new Audio('./audio/endbossdead.mp3');
  alert_sound = new Audio('./audio/alert.mp3');
  offset = {
    top: 150,
    bottom: 100,
    left: 45,
    right: 30
  }

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];

  IMAGES_IDLE = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png'
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
  ];

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',

  ];

  
  /**
   * Constructor function that initializes the object with various images and starting position.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ALERT);
    this.x = 2200;
    this.moveLeftAngry = false;
    this.animate();
  }






  /**
   * Executes the hitBottleEndboss function, which sets inDamage to true and then sets it to false after 400 milliseconds.
   */
  hitBottleEndboss() {
    this.inDamage = true;
    setTimeout(() => {
      this.inDamage = false;
    }, 400);
  }

  
  /**
   * Minus energy from the endboss, making it immune if not already, and checking if it's dead.
   */
  minusEnergyEndboss() {
    if (!this.endbossImmune) {
      this.endbossImmune = true;
      this.energyEndboss -= 20;
      this.speed += 0.3;
      if (this.energyEndboss < 0) {
        this.energyEndboss = 0;
        this.isDeadEndboss();
      } else {
        this.lastHit = new Date().getTime();
      }
      setTimeout(() => {
        this.endbossImmune = false;
      }, 200);
    }
    this.checkAngryEndboss();
  }
  
  
  /**
   * Checks if the energy level of the endboss is below or equal to 20 and sets the isAlert flag to true. 
   * Also sets the speed to 0, moveLeftAngry to false, and plays an alert sound. 
   * After 1500ms, sets the isAlert flag to false and moveLeftAngry to true. 
   */
  checkAngryEndboss() {
    if (this.energyEndboss <= 20) {
      this.isAlert = true;
      this.moveLeftAngry = false;
      setTimeout(() => {
        if (!mainSound) {
          this.alert_sound.cloneNode(true).play();
        }
      }, 10);
      setTimeout(() => {
        this.isAlert = false;
        this.moveLeftAngry = true;

      }, 1500);
    }
  }


/**
 * move the endboss angry to the left
 *
 */
moveLeftEndbossAngry() {
  this.x -= this.speedAngry;
}


/**
 * move the endboss angry to the right
 */
moveRightEndbossAngry() {
  this.x += this.speedAngry;
}


  /**
   * Checks if the Endboss is dead based on the energy level.
   */
  isDeadEndboss() {
    if (this.energyEndboss <= 0) {
      this.isDead = true;
    }
  }


  /**
   * A method to animate the component.
   */
  animate() {
    this.setupMovementInterval();
    this.setupStateInterval();
  }
  


  /**
 * Set up an interval for movement actions based on conditions.
 */
setupMovementInterval() {
  setInterval(() => {
    if (this.isAlert) {
      this.speed = 0;
      return;
    }
    if (this.moveLeftAngry) {
      if (this.otherDirection) {
        this.moveRightEndbossAngry();
      } else {
        this.moveLeftEndbossAngry();
      }
    } else {
      if (this.otherDirection) {
        this.moveRight();
      } else {
        this.moveLeft();
      }
    }
  }, 1000 / 60);
}

  
  /**
   * Set up and start an interval to update the character state periodically.
   */
  setupStateInterval() {
    setInterval(() => {
      this.updateCharacterState();
    }, 9000 / 60);
  }
  
  
  /**
   * Update the character state based on certain conditions.
   */
  updateCharacterState() {
    if (this.isDead) {
      this.handleCharacterDead();
    } else if (this.aggressive) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (this.isAlert) {
      this.playAnimation(this.IMAGES_ALERT);
    } else if (this.inDamage) {
      this.playAnimation(this.IMAGES_HURT);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }
  
  
  /**
   * Handles the character when it is dead.
   *
   */
  handleCharacterDead() {
    this.playAnimation(this.IMAGES_DEAD);
    if (!mainSound) {
      this.endbossdead_sound.cloneNode(true).play();
    }
    setTimeout(() => {
      winGame();
    }, 700);
  }
  
}