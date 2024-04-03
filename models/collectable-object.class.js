class CollectableCoin extends MovableObject {
  height = 150;
  width = 150;
  IMAGES_COINS = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];

  offset = {
    left: 50,
    top: 60,
    right: 50,
    bottom: 60,
  };


  /**
   * Constructor function that loads an image, loads multiple images, animates, and randomizes position.
   */
  constructor() {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.animate();
    this.randomizePosition();
  }


  /**
   * Randomizes the position of the object within a specified range.
   */
  randomizePosition() {
    this.x = 500 + Math.random() * 1500;
    this.y = 125 + Math.random() * 200;
  }


  /**
   * A method that continuously plays the animation using a set interval.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 300);
  }
}


class CollectableBottle extends MovableObject {
  height = 120;
  width = 120;
  x = 300;
  y = 330;

  offset = {
    left: 40,
    top: 20,
    right: 40,
    bottom: 30,
  };

  IMAGES_BOTTLES = [
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  /**
   * Constructor function that initializes the object.
   */
  constructor() {
    super().loadImage(this.IMAGES_BOTTLES[0]);
    this.loadImages(this.IMAGES_BOTTLES);
    this.animate();
    this.randomizePosition();
  }


  /**
   * Randomizes the position of the object.
   */
  randomizePosition() {
    this.x = 200 + Math.random() * 1500;
  }

  /**
   * A function that continuously plays animation with a set interval.
   *
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 300);
  }
}

