class MovableObject extends DrawableObject {

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
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }

  
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

  hit(){
    if (!this.immune) {
        this.immune = true;
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

  addEnergyBottle() {
    this.energyBottle += 20;
    if(this.energyBottle > 100) {
      this.energyBottle = 100;
    }
  }

  minusEnergyBottle() {
    this.energyBottle -= 20;
    if (this.energyBottle < 0) {
        this.energyBottle = 0;
        // console.log("Nicht genug Energie");
    }
}

  addEnergyCoin() {
    this.energyCoin += 20;
    if(this.energyCoin > 100) {
      this.energyCoin = 100;
    }
  }
  
  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 1;
  }


  playAnimation(images){
     let i = this.currentImage % images.length;
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

  jumpOnEnemy() {
    // Prüfen, ob der Charakter noch nicht auf einen Gegner gesprungen ist und die y-Position über 150 liegt
    if (!this.hasJumpedOnEnemy && this.y >= 150) {
      this.hasJumpedOnEnemy = true; // Den Status setzen, dass der Charakter gesprungen ist
      this.speedY = -20; // Negative Geschwindigkeit für den Sprung nach oben
    }
  }
  
  // In Ihrer Animationsschleife oder Bewegungsmethode
  animate() {
    // Annahme: Diese Funktion wird in einer Animationsschleife aufgerufen
    // Hier wird die y-Position basierend auf der Geschwindigkeit aktualisiert
    this.y += this.speedY; // Verwenden Sie += für die Bewegung nach oben (-20) oder unten (z. B. 10 für die Gravitation)
  
    // Fügen Sie hier Ihre Kollisions- und Bewegungslogik hinzu
  
    // Überprüfen, ob der Charakter den Boden erreicht hat (z. B. y-Position ist größer als oder gleich 150)
    if (this.y >= 150) {
      this.hasJumpedOnEnemy = false; // Zurücksetzen für den nächsten Sprung
      this.y = 150; // Oder verwenden Sie this.y = Math.max(this.y, 149);
      this.speedY = 0; // Zurücksetzen der Geschwindigkeit nach dem Sprung
    }
  }
   
  
}




