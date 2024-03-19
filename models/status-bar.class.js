class StatusBar extends DrawableObject {
  
  IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
  ]
  percentage = 100;


  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
    this.setPercentageBottle(0);
  }

  //setPercentage(50);
  setPercentage(percentage) {
    this.percentage = percentage; // => 0...5
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

resolveImageIndex() {
   if(this.percentage == 100) {
     return 5; 
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}

class StatusBarBottle extends DrawableObject {
  
  IMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',

  ]
  percentageBottle = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 250;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentageBottle(0);
  }

  //setPercentage(50);
  setPercentageBottle(percentageBottle) {
    this.percentageBottle = percentageBottle; // => 0...5
    let path = this.IMAGES[this.resolveImageIndexBottle()];
    this.img = this.imageCache[path];
  }

resolveImageIndexBottle() {
   if(this.percentageBottle == 100) {
     return 5; 
    } else if (this.percentageBottle > 80) {
      return 4;
    } else if (this.percentageBottle > 60) {
      return 3;
    } else if (this.percentageBottle > 40) {
      return 2;
    } else if (this.percentageBottle > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}