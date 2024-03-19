class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  offset = {top: 0, bottom: 0, left: 0, right: 0, };

loadImage(path) {
  this.img = new Image(); // this.img = document.getElementbyId('image') <img id="image" src="">
  this.img.src =  path;
}

draw(ctx) {
ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

drawFrame(ctx) {
  if (this instanceof Character || this instanceof Chicken || this instanceof CollectableCoin || this instanceof CollectableBottle) {
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'deeppink';
    ctx.rect(   
      this.x + this.offset.left,
      this.y + this.offset.top,
      this.width - this.offset.right - this.offset.left,
      this.height - this.offset.bottom);
    ctx.stroke(); // Rahmen zeichnen
  }
}

/**
 * 
 * @param {Array} arr  - ['img/image1.png', 'img/image2.png', ...]
 */
loadImages(arr) {
    arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    })
  }
}