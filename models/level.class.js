class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    collectableCoins;
    collectableBottles;
    constructor(enemies, clouds, backgroundObjects, collectableCoins, collectableBottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableCoins = collectableCoins;
        this.collectableBottles = collectableBottles;
    }
}