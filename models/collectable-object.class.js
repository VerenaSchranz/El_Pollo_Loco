class CollectableCoin extends DrawableObject {
  height = 50;
  width = 40;
  x = 500;
  y = 90;
  IMAGES_COINS = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    // this.x = 500;
    // this.animate();
  }
  
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 200);
  }
}