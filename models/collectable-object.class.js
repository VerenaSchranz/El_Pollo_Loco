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
   * Constructor for initializing the object.
   *
   */
  constructor() {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.animate();
    this.randomizePosition();
  }

  
  /**
   * A description of the entire function.
   *
   */
  randomizePosition() {
    this.x = 500 + Math.random() * 1800;
    this.y = 125 + Math.random() * 200;
  }

  
  /**
   * Animate the element at regular intervals.
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
   * Constructor for initializing the object.
   */
  constructor() {
    super().loadImage(this.IMAGES_BOTTLES[0]);
    this.loadImages(this.IMAGES_BOTTLES);
    this.animate();
    this.randomizePosition();
  }


  /**
   * This function randomizes the position.
   *
   */
  randomizePosition() {
    this.x = 200 + Math.random() * 1800;
  }
  
  
  /**
   * Animates the object by playing the animation with the given bottle images
   * every 300 milliseconds.
   *
   * @return {undefined} This function does not return a value.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 300);
  }
}

