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
  alert_sound = new Audio('./audio/alert.mp3');
  dead_sound = new Audio('./audio/chickenDead.mp3');
  collectcoin_sound = new Audio('./audio/collectcoin.mp3');
  collectbottle_sound = new Audio('./audio/collectbottle.mp3');



  /**
   * Initializes a new instance of the class.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {Keyboard} keyboard - The keyboard object for input handling.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }


  /**
   * Set the world for the character.
   */
  setWorld() {
    this.character.world = this;
  }


  /**
   * Runs multiple setInterval functions to check for various game conditions periodically.
   *
   * @param None
   * @return None
   */
  run() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 300);
    setInterval(() => {
      this.checkEndbossGetHit()
    }, 200);
    setInterval(() => {
      this.checkCollisions();
    }, 25);
  }


  /**
   * Checks if there is an energy bottle available and if the "D" key is pressed to throw objects.
   */
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

  /**
   * Check for collisions between the character and enemies, endboss, collectable coins, and collectable bottles
   *
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkEndbossCollision();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
    this.checkCollisionsWithGround();
    this.checkCollisionThrowableWithChicken();
  }


  /**
   * Checks for collisions with enemies and handles the character's actions accordingly.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy, index)) {
        if (this.character.isAboveGround() && this.character.speedY <= 0) {
          this.character.jumpOnEnemy();
          this.handleJumpEnemyCollision(enemy, index);
        } else {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }


  /**
   * Handles collision between character and enemy.
   *
   * @param {Object} enemy - the enemy object
   * @param {number} index - the index of the enemy in the array
   * @return {void} 
   */
  handleJumpEnemyCollision(enemy) {
    const enemyIndex = this.level.enemies.indexOf(enemy);
    if (enemyIndex !== -1 && !enemy.isDead) {
      this.character.immune = true;
      if (!mute) {
        this.dead_sound.cloneNode(true).play();
      }
      setTimeout(() => {
        this.level.enemies.splice(enemyIndex, 1);
        this.character.immune = false;
      }, 250);
      enemy.isDead = true;
    }
  }


  /**
   * Check for collision with the end boss and handle character hit accordingly.
   */
  checkEndbossCollision() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }


  /**
   * Checks for coin collisions and collects the coins if a collision is detected.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  checkCoinCollisions() {
    this.level.collectableCoins.forEach((coins, index) => {
      if (this.character.isColliding(coins)) {
        this.collectCoin(coins, index);
      }
    });
  }


  /**
   * Collects a coin and updates the player's energy and the game state.
   *
   * @param {Array} coins - The array of coins in the game.
   * @param {number} index - The index of the coin to be collected.
   * @return {void} This function does not return a value.
   */
  collectCoin(coins, index) {
    this.character.addEnergyCoin();
    this.addedCoins.push({ coin: coins, index: index });
    if (!mute) {
      this.collectcoin_sound.cloneNode(true).play();
    }
    this.level.collectableCoins.splice(index, 1);
    this.statusBarCoin.setPercentageCoin(this.character.energyCoin);
  }


  /**
   * Checks for collisions between the character and collectable bottles, and collects the bottle if the character is colliding and has less than 100 energy.
   *
   * @return {void} This function does not return a value.
   */
  checkBottleCollisions() {
    this.level.collectableBottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle) && this.character.energyBottle < 100) {
        this.collectBottle(bottle, index);
      }
    });
  }


  /**
   * Collects a bottle and updates the game state accordingly.
   *
   * @param {Object} bottle - The bottle object to be collected.
   * @param {number} index - The index of the bottle in the collectableBottles array.
   */
  collectBottle(bottle, index) {
    this.character.addEnergyBottle();
    this.addedBottles.push({ bottle: bottle, index: index });
    if (!mute) {
      this.collectbottle_sound.cloneNode(true).play();
    }
    this.level.collectableBottles.splice(index, 1);
    this.statusBarBottle.setPercentageBottle(this.character.energyBottle);
  }


  /**
   * Checks if any throwable objects are colliding with the endboss and performs the corresponding actions.
   *
   * @param {type} throwableObject - the throwable object to check for collision
   * @param {type} throwableIndex - the index of the throwable object in the array
   * @return {type} undefined
   */
  checkEndbossGetHit() {
    this.throwableObjects.forEach((throwableObject, throwableIndex) => {
      this.level.endboss.forEach((endboss, endbossIndex) => {
        if (throwableObject.isColliding(endboss)) {
          this.handleEndbossCollision(throwableObject, endboss, throwableIndex, endbossIndex);
        }
      });
    });
  }


  /**
   * Handles the collision between a throwable object and the endboss.
   *
   * @param {Object} throwableObject - the throwable object involved in the collision
   * @param {Object} endboss - the endboss involved in the collision
   * @param {number} throwableIndex - the index of the throwable object in the array
   * @param {number} endbossIndex - the index of the endboss in the array
   * @return {void} 
   */
  handleEndbossCollision(throwableObject, endboss, throwableIndex, endbossIndex) {
    endboss.hitBottleEndboss();
    endboss.minusEnergyEndboss();
    this.statusBarEndboss.setPercentageEndboss(this.level.endboss[0].energyEndboss);
    throwableObject.breakAndSplash();
    setTimeout(() => {
      this.throwableObjects.splice(throwableIndex, 1);
    }, 100);
    if (endboss.isDead) {
      setTimeout(() => {
        this.level.endboss.splice(endbossIndex, 1);
      }, 500);
    }
  }


  /**
   * Checks for collisions between throwable objects and the ground.
   *
   * This function iterates over each throwable object in the `throwableObjects` array
   * and checks if its speed in the vertical direction is less than -38. If it is,
   * the object is broken and splashed, and it is removed from the array after a delay of 300 milliseconds.
   *
   * @return {void} This function does not return a value.
   */
  checkCollisionsWithGround() {
    this.throwableObjects.forEach((throwableObject, index) => {

      if (throwableObject.speedY < -38) {
        throwableObject.breakAndSplash();
        setTimeout(() => {
          this.throwableObjects.splice(index, 1);
        }, 300);
      }
    });
  }


  /**
   * Check for collisions between throwable objects and chickens,
   * handle enemy deaths and remove objects accordingly.
   */
  checkCollisionThrowableWithChicken() {
    this.throwableObjects.forEach((throwableObject, throwableIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (throwableObject.isColliding(enemy)) {
          if (!enemy.isDead) {
            enemy.isDead = true;
            setTimeout(() => {
              if (!mute) {
                this.dead_sound.play();
              }
              this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            }, 300);
          }
          throwableObject.breakAndSplash();
          this.throwableObjects.splice(throwableIndex, 1);
        }
      });
    });
  }
  

  /**
   * Function to draw the game elements on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarEndboss);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.collectableCoins);
    this.addObjectsToMap(this.collectableBottles);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }


  /**
   * Adds an array of objects to the map.
   *
   * @param {Array} objects - The array of objects to be added to the map.
   * @return {void} This function does not return a value.
   */
  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }


  /**
   * Adds the given object to the map.
   *
   * @param {Object} mo - The object to be added to the map.
   * @return {void} This function does not return a value.
   */
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


  /**
   * Flips the image horizontally.
   *
   * @param {object} mo - Image object to be flipped
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }


  /**
   * Flips the image back and restores the canvas context.
   *
   * @param {Object} mo - The object containing the x coordinate of the image.
   * @return {undefined} This function does not return a value.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}