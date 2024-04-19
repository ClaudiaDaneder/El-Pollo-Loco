class Level {
    enemies;
    endboss;
    collectableBottles;
    collectableCoins;
    clouds;
    backgroundObjects;
    level_end_x;

    constructor(level_end_x, enemies, endboss, collectableBottles, collectableCoins, clouds, backgroundObjects) {
        this.level_end_x = level_end_x;
        this.enemies = enemies;
        this.endboss = endboss;
        this.collectableBottles = collectableBottles;
        this.collectableCoins = collectableCoins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}