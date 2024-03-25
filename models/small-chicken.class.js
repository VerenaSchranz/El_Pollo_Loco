class Smallchicken extends MovableObject {
  speed = 5;
  y = 360;
  height = 60;
  width = 60;
  isDead = false;
  offset = {
    top: 60 ,
    bottom: 100,
    left: 50,
    right: 50
  }
  IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
];
  constructor() {
      super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);

      this.x = 200 + Math.random() * 500;
      this.speed = 0.15 + Math.random() * 0.25;
      this.animate();
      this.randomizePosition();
    }
    
    randomizePosition() {
      this.x = 200 + Math.random() * 1800;
    }
  
  animate() {
    // Animation für das Bewegen nach links
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    
    // Animation basierend auf dem Status des Gegners
    setInterval(() => {
      if (this.isDead === false) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      if (this.isDead === true) {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 200);
  }
  
}
