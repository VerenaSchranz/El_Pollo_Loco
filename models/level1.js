let level1;

/**
 * Initializes the level with various game elements such as chickens, small chickens, end boss, clouds, background objects, collectable coins, and collectable bottles.
 */
function initLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(), 
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Smallchicken(),
      new Smallchicken(),
      new Smallchicken(),
      new Smallchicken(),
      new Smallchicken(),
      new Smallchicken(),
      new Smallchicken(),  
    ],
    [ new Endboss() ],
    [new Cloud()],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObject("img/5_background/layers/air.png", 1438),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 1438),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 1438),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 1438),

      new BackgroundObject("img/5_background/layers/air.png", 2157),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 2157),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 2157),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2157),


      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 4
      ),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 5),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 5
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 5
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 5
      ),
    ],
    [
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
      new CollectableCoin(),
    ],
    [
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
      new CollectableBottle(),
    ]
  );
}