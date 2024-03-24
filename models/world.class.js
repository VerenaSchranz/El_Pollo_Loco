class World {
  character = new Character();
  level = level1;
  enemies = level1.enemies;
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
      this.checkEndbossGetHit()
    }, 200);
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsWithGround();
    }, 25);
  }
  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + 0, this.character.y + 100, this.character.otherDirection);
      this.throwableObjects.push(bottle);
      this.character.minusEnergyBottle();
      this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
      console.log(world.statusBarBottle.percentageBottle);
    }
  }
  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {

        if (this.character.isAboveGround() && this.character.speedY <= 0) {
          this.character.jump();
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
    this.level.collectableBottles.forEach((bottles, index) => {
      if (this.character.isColliding(bottles)) {
        this.character.addEnergyBottle();
        this.addedBottles.push({ bottle: bottles, index: index });
        this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
        this.level.collectableBottles.splice(index, 1);
        // console.log(world.statusBarBottle.percentageBottle);
      }
    });
  }

  checkEndbossGetHit() {
    this.throwableObjects.forEach((throwableObject, index) => {
      this.level.enemies.forEach((enemy, index) => {
        if (throwableObject.isColliding(enemy)) {
          this.isDead = true;
          // breakAndSplash();
          // this.endboss.breakAndSplash();
          this.throwableObjects.splice(index, 1);
        }
      });

      if (this.level.endboss) {
        this.level.endboss.forEach((endboss, index) => {
          if (throwableObject.isColliding(endboss)) {
            console.log('ENdboss: leben', world.statusBarEndboss.percentageEndboss)

            this.level.endboss.hitBottleEndboss();
            this.level.endboss.minusEnergyEndboss();
            this.statusBarEndboss.setPercentageEndboss(this.level.endboss[0].energyEndboss);
            this.throwableObjects.splice(index, 1);
            console.log('ENdboss: leben', world.statusBarEndboss.percentageEndboss)


          }
          /*           setTimeout(() => {
                      
                      this.endboss.splice(index, 1);
                    }, 1500); */
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