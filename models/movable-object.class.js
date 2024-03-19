class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accleration = 2.5;
    energy = 100;
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

    setEnemyStatus() {
      return enemyStatus = false;
      //sterben animate noch rein
    }

    // character.isColliding(chicken);
    isColliding(mo) {
      return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height;
      if( this.x + this.width > mo.x) {
        return console.log('Pepe Huhn aua')
      }
    }

    // character.isColliding(chicken Head);
    hitEnemyTop(mo) {
      return  this.x + this.width > mo.x
    }
    
    hit() {
      this.energy -= 5;
      if(this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
    
    isDead() {
      return this.energy == 0;
    }

    isHurt() {
      let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
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

