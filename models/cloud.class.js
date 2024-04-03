class Cloud extends MovableObject {
  y = 20;
  height = 250;

  /**
   * Constructor for initializing the object.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');

    this.x = 200 + Math.random() * 500;
    this.width = 500;

    this.animate();
  }

  /**
   * A description of the entire function.
   *
   */
  animate() {
    this.moveLeft();
  }

}