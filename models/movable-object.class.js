class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accleration = 2.5;

    applyGravity() {
        setInterval(()  => {
            if(this.isAboveGround() || this.speedY > 0 ){
                this.y -= this.speedY;
                this.speedY -= this.accleration;
            }
        }, 1000 / 25); 
    }

    isAboveGround() {
        return this.y < 150;
    }

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementbyId('image') <img id="image" src="">
        this.img.src =  path;
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

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; 0, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
      this.x += this.speed;
    }

    moveLeft() {
      this.x -= this.speed;
    }
    jump() {
      this.speedY = 30;
    }
}