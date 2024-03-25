class CollectableCoin extends MovableObject {
  height = 150;
  width = 150;
  IMAGES_COINS = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];

  offset = {
    top: 50, 
    bottom: 100, 
    left: 50, 
    right: 50, 
  }; 


  constructor() {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.animate();
    this.randomizePosition();
  }
  
  randomizePosition() {
    this.x = 500 + Math.random() * 1800;
    this.y = 125 + Math.random() * 200;
  }

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
    top: 15, 
    bottom: 30, 
    left: 50, 
    right: 50, 
  }; 

  IMAGES_BOTTLES = [
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_BOTTLES[0]);
    this.loadImages(this.IMAGES_BOTTLES);
    this.animate();
    this.randomizePosition();
  }
  
  randomizePosition() {
    this.x = 500 + Math.random() * 1800;
  }
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 300);
  }
}

