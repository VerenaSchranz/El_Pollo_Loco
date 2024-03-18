class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    collectableCoins;
    constructor(enemies, clouds, backgroundObjects, collectableCoins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableCoins = collectableCoins;
    }
}