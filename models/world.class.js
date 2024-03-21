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
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    collectableCoins = level1.collectableCoins;
    collectableBottles = level1.collectableBottles;
    addedCoins = [];
    addedBottles = [];
    throwableObjects = [];

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
      this.checkCollisionJump();
      // this.checkEndbossGetHit()
    }, 200);
  }
  checkThrowObjects() {
    if(this.keyboard.D){
      let bottle = new ThrowableObject(this.character.x + 0
        , this.character.y+ 100, this.character.otherDirection);
      this.throwableObjects.push(bottle);
      this.character.minusEnergyBottle();
      this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
      console.log(world.statusBarBottle.percentageBottle);
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
            this.character.addEnergyCoin();
            this.addedCoins.push({ coin: coins, index: index });
            this.level.collectableCoins.splice(index, 1);
            this.statusBarCoin.setPercentageCoin(this.character.energyCoin);
            console.log(world.statusBarCoin.percentageCoin);

          }
        });
        this.level.collectableBottles.forEach((bottles, index) => {
          if( this.character.isColliding(bottles)) {
            this.character.addEnergyBottle();
            this.addedBottles.push({ bottle: bottles, index: index });
            this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
            this.level.collectableBottles.splice(index, 1);
            // console.log(world.statusBarBottle.percentageBottle);
          }
        });
      }

      checkCollisionJump() { 
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy, index)) {
                enemy.enemyStatus = false;
                setTimeout(() => {
                    // Entferne den Feind aus dem Array
                    this.level.enemies.splice(index, 1);
                }, 250);
            }
        });
    }
    
  checkEndbossGetHit(){
      this.level.enemies.forEach((enemy, enemyIndex) => {
        this.ThrowableObject.forEach(bottle, bottleIndex => {
          if (bottle.isColliding(enemy, enemyIndex)) {
            console.log('treffer')
            enemy.enemyStatus = false;
            // this.statusBarEndboss.setPercentage(this.level.enemies[3].energyEndboss);
          }
          this.ThrowableObject.splice(bottleIndex.index, 1);
        })
      })
 }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); //Back
        // ----- Space for fixed objects ----- //
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
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