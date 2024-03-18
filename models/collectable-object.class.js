class CollectableCoin extends MovableObject {
  height = 150;
  width = 150;
  x = 500;
  y = 250;
  IMAGES_COINS = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.animate();
  }
  
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 300);
  }
}

}