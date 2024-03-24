class ThrowableObject extends MovableObject {
  throwBottleAir = false;
  bottleSplash = false;
  isBreaking = false;
  offset = { 
    top: 40 ,
    bottom: 60,
    left: 40,
    right: 40
  };

  constructor(x, y, direction) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);

    this.x = x;
    this.y = y;
    this.height = 120;
    this.width = 110;
    this.otherDirection = direction;
    this.throw();
    this.animate();
  }

  IMAGES_ROTATE = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
];

IMAGES_BOTTLE_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
];

  throw() {
    this.throwBottleAir = true;
    this.speedY = 30;
    console.log(this.speedY)
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

  breakAndSplash() {
    this.isBreaking = true;
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    this.speedY = 0;
    this.speedX = 0;
    this.deletable = true;
  }

  animate() {

    setInterval(() => {

      if (this.throwBottleAir) {
        this.playAnimation(this.IMAGES_ROTATE);

      } else if (this.bottleSplash) {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
      }
    }, 9000 / 60);
  }

}
