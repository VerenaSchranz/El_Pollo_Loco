class ThrowableObject extends MovableObject {
  
  constructor(x, y, direction) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.x = x;
    this.y = y;
    this.height = 120;
    this.width = 110;
    this.otherDirection = direction;
    this.throw();
  }

  throw() {


    this.speedY = 30;
    this.applyGravity();
    if (this.otherDirection == true) { 
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