class ThrowableObject extends MovableObject {
  
  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.x = x;
    this.y = y;
    this.height = 120;
    this.width = 110;
    this.throw();
  }

  throw(x, y) {
    this.speedY = 30;
    this.applyGravity();
    if (this.character.otherDirection == true) { // Korrekte Syntax für die Bedingung
      setInterval(() => {
        this.x -= 10;
      }, 25);
    } else {
      setInterval(() => {
        this.x += 10;
      }, 25);
    }
  }  
}