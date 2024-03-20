class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accleration = 2.5;
    energy = 100;
    energyBottle = 0;
    energyCoin = 0;
    lastHit = 0;
    enemyStatus = true;

    applyGravity() {
        setInterval(()  => {
            if(this.isAboveGround() || this.speedY > 0 ){
                this.y -= this.speedY;
                this.speedY -= this.accleration;
            }
        }, 1000 / 25); 
    }

    isAboveGround() {
      if(this instanceof ThrowableObject) { // Throwable object should alwalys fall
        return true; 
      } else {
        return this.y < 150;
      }
    }

    // character.isColliding(chicken);
    isColliding(mo) {
      return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height;
    }

    // character.isColliding(chicken Head);
    hitEnemyTop(mo) {
      return this.y + this.height - this.offset.bottom > mo.y + mo.offset-top && this.y + this.offset.top > mo.y + mo.height - mo.offset-bottom && this.character.speedY < 0;
    }
    
    hit() {
      this.energy -= 5;
      if(this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
    addEnergyBottle() {
      this.energyBottle += 5;
      if(this.energyBottle < 100) {
        this.energyBottle = 100;
      }
    }

    addEnergyCoin() {
      this.energyCoin += 5;
      if(this.energyCoin < 100) {
        this.energyCoin = 100;
      }
    }
    
    isDead() {
      return this.energy == 0;
    }
    isHurt() {
      let timepassed = new Date().getTime() - this.lastHit;
      timepassed = timepassed / 1000;
      return timepassed < 1;
    }

    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 0 % 6; 0, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
      this.x += this.speed;
    }

    moveLeft() {
      this.x -= this.speed;
    }
    jump() {
      this.speedY = 30;
    }
}

