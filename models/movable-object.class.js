class MovableObject extends DrawableObject {
  speedAngry = 0.15;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  accleration = 2.5;
  energy = 100;
  energyBottle = 0;
  energyCoin = 0;
  energyEndboss = 100;
  lastHit = 0;
  immune = false;
  hurt_sound = new Audio('./audio/hurt.mp3');
  jump_sound = new Audio('./audio/jump.mp3');

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  

  /**
   * Apply gravity to the object by adjusting its position and speed.
   *
   */
  applyGravity() {
      setInterval(()  => {
          if(this.isAboveGround() || this.speedY > 0 ){
              this.y -= this.speedY;
              this.speedY -= this.accleration;
          }
      }, 1000 / 25); 
  }


  /**
   * Check if the object is above ground level.
   *
   * @return {boolean} true if above ground, false otherwise
   */
  isAboveGround() {
    if(this instanceof ThrowableObject) { 
      return true; 
    } else {
      return this.y < 150;
    }
  }


  /**
   * Check if this object is colliding with another object.
   *
   * @param {Object} mo - The other object to check collision with
   * @return {boolean} Whether the objects are colliding or not
   */
  isColliding(mo) {
    return (
        this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }


  /**
   * A description of the entire function.
   */
  hit(){
    if (!this.immune) {
        this.immune = true;
        if (!mainSound) {
          this.hurt_sound.play();
        }
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        setTimeout(() => {
            this.immune = false;
        }, 1000);
    }
}


  /**
   * Adds 20 to the energyBottle property and caps it at 100.
   */
  addEnergyBottle() {
    this.energyBottle += 20;
    if(this.energyBottle > 100) {
      this.energyBottle = 100;
    }
  }


  /**
   * Decreases the energyBottle value by 20 and ensures it cannot go below 0.
   *
   */
  minusEnergyBottle() {
    this.energyBottle -= 20;
    if (this.energyBottle < 0) {
        this.energyBottle = 0;
    }
}


  /**
   * A function that adds 20 to the energyCoin property and caps it at 100.
   */
  addEnergyCoin() {
    this.energyCoin += 20;
    if(this.energyCoin > 100) {
      this.energyCoin = 100;
    }
  }
  

  /**
   * Check if the entity is dead based on its energy level.
   *
   * @return {boolean} true if the energy level is 0, false otherwise
   */
  isDead() {
    return this.energy == 0;
  }


  /**
   * A function to check if the entity is hurt based on the time since the last hit.
   *
   * @return {boolean} true if the entity is hurt, false otherwise
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 1;
  }


  /**
   * A function that plays an animation using the provided images.
   *
   * @param {Array} images - an array of image paths for the animation
   * @return {undefined} this function does not return anything
   */
  playAnimation(images){
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }


  /**
   * Moves the object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
   * A method to make the character jump.
   *
   */
  jump() {
    if (!mainSound) {
      this.jump_sound.cloneNode(true).play();
    }
    this.speedY = 30;
    if (this.y <= 150) {
      this.y = 150; 
    }
  }


  /**
   * jumpOnEnemy function sets the speedY property to 15.
   */
  jumpOnEnemy() {
    this.speedY = 15;    
  }
  
}




