class Level {
    enemies;
    endboss
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    collectableCoins;
    collectableBottles;

    
    /**
     * Constructor for initializing game elements.
     *
     * @param {array} enemies - the array of enemy objects
     * @param {object} endboss - the end boss object
     * @param {array} clouds - the array of cloud objects
     * @param {array} backgroundObjects - the array of background objects
     * @param {array} collectableCoins - the array of collectable coin objects
     * @param {array} collectableBottles - the array of collectable bottle objects
     */
    constructor(enemies, endboss, clouds, backgroundObjects, collectableCoins, collectableBottles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableCoins = collectableCoins;
        this.collectableBottles = collectableBottles;
    }
}