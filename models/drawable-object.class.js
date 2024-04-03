class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

/**
 * Loads an image from the given path.
 *
 * @param {string} path - The path to the image.
 */
loadImage(path) {
  this.img = new Image();
  this.img.src =  path;
}

/**
 * Draws an image on the canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
 */
draw(ctx) {
ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}


/**
 * Draws a frame around the object if it belongs to certain classes.
 *
 * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
 */
drawFrame(ctx) {
  if (
    this instanceof Character ||
    this instanceof Chicken ||
    this instanceof CollectableCoin ||
    this instanceof CollectableBottle ||
    this instanceof Endboss ||
    this instanceof ThrowableObject ||
    this instanceof Smallchicken
  ) {
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "deeppink";
    ctx.rect(
      this.x + this.offset.left,
      this.y + this.offset.top,
      this.width - this.offset.right - this.offset.left,
      this.height - this.offset.bottom - this.offset.top
    );
    ctx.stroke();
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