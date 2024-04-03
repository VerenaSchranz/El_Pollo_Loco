class ThrowableObject extends MovableObject {
  /**
   * Constructor for setting the initial position and attributes of the salsa bottle.
   *
   * @param {type} x - the x coordinate
   * @param {type} y - the y coordinate
   * @return {type} undefined
   */
  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.x = x;
    this.y = y;
    this.height = 120;
    this.width = 110;
    this.throw();
  }

  /**
   * A function that throws the object to a new position.
   *
   * @param {type} x - description of parameter
   * @param {type} y - description of parameter
   * @return {type} description of return value
   */
  throw(x, y) {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}