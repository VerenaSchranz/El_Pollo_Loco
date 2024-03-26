class World {
  character = new Character();
  level = level1;
  enemies = level1.enemies;
  enemies = level1.smallEnemies;
  endboss = level1.endboss;
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
  bottleSplash = false;

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
      this.checkThrowObjects();
    }, 500);
    setInterval(() => {
      this.checkEndbossGetHit()
    }, 200);
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsWithGround();
      this.checkCollisionThrowableWithChicken();
    }, 25);
  }
  checkThrowObjects() {
    if (this.character.energyBottle > 0) {
       if (this.keyboard.D) {
        this.character.setNewTimePassed();
        let bottle = new ThrowableObject(this.character.x + 0, this.character.y + 100, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.character.minusEnergyBottle();
        this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
      } 

    }
  }
  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy, index)) {

        if (this.character.isAboveGround() && this.character.speedY <= 0) {
          this.character.jumpOnEnemy();
          if (!enemy.isDead) {
            enemy.isDead = true;
            this.character.immune = true;
            console.log(this.character.immune);
            setTimeout(() => {
              this.level.enemies.splice(index, 1);
            }, 250);
          }
        }
        else {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });

    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });

    this.level.collectableCoins.forEach((coins, index) => {
      if (this.character.isColliding(coins)) {
        this.character.addEnergyCoin();
        this.addedCoins.push({ coin: coins, index: index });
        this.level.collectableCoins.splice(index, 1);
        this.statusBarCoin.setPercentageCoin(this.character.energyCoin);
        console.log(world.statusBarCoin.percentageCoin);

      }
    });
    this.level.collectableBottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        if (this.character.energyBottle < 100) {
          this.character.addEnergyBottle();
          this.addedBottles.push({ bottle: bottle, index: index });
          this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
          this.level.collectableBottles.splice(index, 1);
        
        }
      }
    });

  }

  checkEndbossGetHit() {
    this.throwableObjects.forEach((throwableObject, throwableIndex) => {

      if (this.level.endboss) {
        this.level.endboss.forEach((endboss, endbossIndex) => {
          if (throwableObject.isColliding(endboss)) {
            endboss.hitBottleEndboss();
            endboss.minusEnergyEndboss();
            this.statusBarEndboss.setPercentageEndboss(this.level.endboss[0].energyEndboss);
            this.throwableObjects.splice(throwableIndex, 1);
            if (endboss.isDead) {
              setTimeout(() => {
                this.level.endboss.splice(endbossIndex, 1);
              }, 500);
            }
          }
        });
      }
    });
  }


  checkCollisionsWithGround() {
    this.throwableObjects.forEach((throwableObject, index) => {

      if (throwableObject.speedY < -38) {
        throwableObject.breakAndSplash();
        setTimeout(() => {
          this.throwableObjects.splice(index, 1);
        }, 100);
      }
    });
  }

  checkCollisionThrowableWithChicken() {
    this.throwableObjects.forEach((throwableObject, throwableIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (throwableObject.isColliding(enemy)) {
          console.log('Throwable collides with enemy');

          if (!enemy.isDead) {
            enemy.isDead = true;
            this.character.immune = true;
            console.log(this.character.immune);
            setTimeout(() => {

              this.level.enemies.splice(enemyIndex, 1);
            }, 250);
          }

          throwableObject.breakAndSplash();
          setTimeout(() => {
            this.throwableObjects.splice(throwableIndex, 1);
          }, 100);

        }
      });
    });
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
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.collectableCoins);
    this.addObjectsToMap(this.collectableBottles);

    this.ctx.translate(-this.camera_x, 0);

    // Draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
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