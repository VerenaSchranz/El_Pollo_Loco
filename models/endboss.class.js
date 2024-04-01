class Endboss extends MovableObject {
  speedAngry = 1;
  speed = 0.15;
  isDead = false;
  inDamage = false;
  isAlert = false;
  moveLeftAngry = false;
  aggressive = false;
  endbossImmune = false;
  energyEndboss = 100;
  height = 400;
  width = 280;
  y = 60;
  endbossdead_sound = new Audio('./audio/endbossdead.mp3');
  alert_sound = new Audio('./audio/alert.mp3');
  offset = {
    top: 150,
    bottom: 100,
    left: 45,
    right: 0
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
   * Initializes the object by loading images, setting initial position,
   * and starting animation.
   *
   * @constructor
   * @return {void}
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
   * A function that sets 'inDamage' to true, then after 400ms sets it back to false.
   *
   */

  hitBottleEndboss(){
    this.inDamage = true;
    setTimeout(() => {
      this.inDamage = false;
    }, 400);
  }
  
  
  /**
   * Decreases the energy of the endboss by 20 units, sets the endboss to be immune for 200 milliseconds,
   * and checks if the endboss is dead. If the endboss is not dead, it sets the last hit time to the current time.
   * After 200 milliseconds, the endboss becomes vulnerable again. Finally, it checks if the endboss is angry.
   *
   * @return {void} This function does not return a value.
   */
  minusEnergyEndboss() {
    if (!this.endbossImmune) {
      this.endbossImmune = true;
      this.energyEndboss -= 20;
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
   * Checks if the endboss is angry and performs actions accordingly.
   *
   */
  checkAngryEndboss() {
    if (this.energyEndboss <= 20) { 
      this.isAlert = true; 
      this.speed = 0
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
   * Moves the endboss angry to the left based on its speed.
   */
  moveLeftEndbossAngry () {
    this.x -= this.speedAngry;
  }
  

  /**
   * Checks if the end boss is dead based on energy level.
   */
  
  isDeadEndboss() {
    if (this.energyEndboss <= 0) {
      this.isDead = true;
    }
  }
  
  
  /**
   * Method to animate the character's movements and actions.
   */
  animate() {
    setInterval(() => {
      if(this.moveLeftAngry) {
        this.moveLeftEndbossAngry();
      } else {
        this.moveLeft();
      }
    }, 1000 / 60);
    
    setInterval(() => {
      if (this.isDead) {
        this.playAnimation(this.IMAGES_DEAD);
        if (!mainSound) {
          this.endbossdead_sound.cloneNode(true).play();
        }
        setTimeout(() => {
          winGame();
        }, 700);
      } else if (this.aggressive) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (this.isAlert) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.inDamage) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 9000 / 60);
  }
}