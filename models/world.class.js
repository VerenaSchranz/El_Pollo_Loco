class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    collectableCoins = level1.collectableCoins;
    collectableBottles = level1.collectableBottles;
    addedCoins = [];
    addedBottles = [];
    throwableObjects = [];
    fullscreen = new Fullscreen();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }
    
    run() {
      setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }
  checkThrowObjects() {
    if(this.keyboard.D){
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y+ 100);
      this.throwableObjects.push(bottle);
    }
  }
    checkCollisions() { 
        this.level.enemies.forEach((enemy) => {
          if( this.character.isColliding(enemy) ) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
          }
        });
        this.level.collectableCoins.forEach((coins, index) => {
          if( this.character.isColliding(coins)) {
            this.addedCoins.push({ coin: coins, index: index });
            this.level.collectableCoins.splice(index, 1);
          }
        });
        this.level.collectableBottles.forEach((bottles, index) => {
          if( this.character.isColliding(bottles)) {
            this.addedBottles.push({ bottle: bottles, index: index });
            this.level.collectableBottles.splice(index, 1);
            console.log(world.level.collectableBottles);
            console.log(world.addedBottles);
          }
        });
      }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); //Back
        // ----- Space for fixed objects ----- //
        this.addToMap(this.statusBar);
        this.addToMap(this.fullscreen);
        this.ctx.translate(this.camera_x, 0); //Forwards

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.collectableCoins);
        this.addObjectsToMap(this.collectableBottles);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
    addToMap(mo) {
        if (mo.otherDirection) {
          this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
          this.flipImageBack(mo);
        }
      }
    
      flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
      }
    
      flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
      }
}