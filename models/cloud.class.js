class Cloud extends MovableObject {
  y = 20;
  height = 250;

  /**
   * Initializes a new instance of the class and loads an image.
   *
   * @return {void} 
   */
  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');

    this.x = 200 + Math.random() * 500;
    this.width = 500;

    this.animate();
  }

  /**
   * A method to animate something.
   */
  animate() {
    this.moveLeft();
  }
}