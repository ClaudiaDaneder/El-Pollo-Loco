class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar_health = new StatusbarHealth();
    statusbar_coins = new StatusbarCoins();
    statusbar_bottles = new StatusbarBottles();
    statusbar_endboss = new StatusbarEndboss();

    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        playBackgroundMusic();
        this.runChecks();
    }

    /**
     * This function draws all elements onto the canvas and sets the camera accordingly. 
     */
    draw() {
        this.clearCanvas();
        this.setCamera();
        this.drawBackground();
        this.drawCollectables();
        this.drawEnemies();
        this.drawCharacter();
        this.drawThrowables();
        this.setCameraBack();
        this.drawStatusbars();
        this.setCamera();
        this.setCameraBack();
        this.animate();
    }

    /**
     * This function initiates an animation loop by requesting the next animation frame.
     */
    animate() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function adds multiple objects to the world by iterating over each object and calling the addToWorld function.
     * 
     * @param {Array} objects 
     */
    addObjectsToWorld(objects) {
        objects.forEach(o => {
            this.addToWorld(o);
        });
    }

    /**
     * This function adds a movable object to the world. If the object has the 'rotateImage' property set to true, it flips the image, draws the object, then flips it back.

     * @param {Object} moveables 
     */
    addToWorld(moveables) {
        if (moveables.rotateImage) this.flipImage(moveables);
        moveables.draw(this.ctx);
        if (moveables.rotateImage) this.flipImageBack(moveables);
    }

    /**
     * This funciton clears the canvas by removing all drawings from it.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * This function sets the camera position by translating the canvas context horizontally.
     */
    setCamera() {
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * This function resets the camera position to its orginial position.
     */
    setCameraBack() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * This function draws the background of the game, including background objects and clouds.
     */
    drawBackground() {
        this.addObjectsToWorld(this.level.backgroundObjects);
        this.addObjectsToWorld(this.level.clouds);
    }

    /**
     * This function draws all enemies in the game.
     */
    drawEnemies() {
        this.addObjectsToWorld(this.level.enemies);
        this.addToWorld(this.level.endboss);
    }

    /**
     * This function draws the character.
     */
    drawCharacter() {
        this.addToWorld(this.character);
    }

    /**
     * This function draws all statusbars. The endboss statusbar only appears when the character had his first contact with him.
     */
    drawStatusbars() {
        this.addToWorld(this.statusbar_health);
        this.addToWorld(this.statusbar_coins);
        this.addToWorld(this.statusbar_bottles);
        if (this.level.endboss.firstContact) this.addToWorld(this.statusbar_endboss);
    }

    /**
     * This function draws collectable bottles and coins.
     */
    drawCollectables() {
        this.addObjectsToWorld(this.level.collectableCoins);
        this.addObjectsToWorld(this.level.collectableBottles);
    }

    /**
     * This function draws bottles that the character throws.
     */
    drawThrowables() {
        this.addObjectsToWorld(this.throwableObjects);
    }

    /**
     * This function sets the world property of the character object to the current instance of the class.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * This function runs checks at regular intervals.
     */
    runChecks() {
        setInterval(() => this.checkCollisions(), 30);
        setInterval(() => {
            this.checkCollections();
            this.checkThrow();
            this.removeChickenIfOutOfScreen();
            this.checkBottleCollisions();
        }, 100);
    }

    /**
     * This function checks the character's collisions with enemies. He gets hurt unless he jumps onto an enemy.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.characterCollidesWithChicken(enemy)) {
                this.characterGetsHurt();
            }
            if (this.characterJumpsOnChicken(enemy)) {
                this.characterDropkicksChicken(enemy, index);
            }
        });
        if (this.character.isColliding(this.level.endboss)) {
            this.characterGetsHurt();
        }
    }

    /**
     * This function determines whether the character collides with a chicken.
     * 
     * @param {Object} enemy 
     * @returns {true|false}
     */
    characterCollidesWithChicken(enemy) {
        return this.character.isColliding(enemy) && !enemy.chickenIsDead && !this.character.isAboveGroundLevel();
    }

    /**
     * This function determines whether the character jumps onto a chicken.
     * 
     * @param {Object} enemy 
     * @returns {true|false}
     */
    characterJumpsOnChicken(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGroundLevel() && this.character.speedY < 0
    }

    /**
     * This function makes the character take a hit and set the percentage on the health statusbar accordingly.
     */
    characterGetsHurt() {
        this.character.takesHit();
        this.statusbar_health.setPercentage(this.character.energy);
    }

    /**
     * This function kills the chicken when the character jumps onto it, then makes the character bounce up, and then triggers the function that removes the dead chicken from the screen.
     * 
     * @param {Object} enemy 
     * @param {number} index 
     */
    characterDropkicksChicken(enemy, index) {
        enemy.chickenIsDead = true;
        this.character.bounce();
        setTimeout(() => this.removeDeadEnemy(index), 200);
    }

    /**
     * This function removes a dead chicken from the screen.
     * 
     * @param {number} e index of killed chicken
     */
    removeDeadEnemy(e) {
        this.level.enemies.splice(e, 1)
    }

    /**
     * This function summarizes all functions that check whether items have been collected. 
     */
    checkCollections() {
        this.checkCoinCollection();
        this.checkBottleCollection();
    }

    /**
     * This function checks whether a coin has been collected. Unless the statusbar is already full, the coin will be removed from the screen.
     */
    checkCoinCollection() {
        this.level.collectableCoins.forEach((c, index) => {
            if (this.character.isColliding(c) && this.character.coins < this.character.maxCoins) {
                this.character.collectCoin();
                this.statusbar_coins.setPercentage(this.character.coins);
                this.removeCollectedCoin(index);
            }
        });
    }

    /**
     * This function checks whether a bottle has been collected. Unless the statusbar is already full, the bottle will be removed from the screen.
     */
    checkBottleCollection() {
        this.level.collectableBottles.forEach((b, index) => {
            if (this.character.isColliding(b) && this.character.bottles < this.character.maxBottles) {
                this.character.collectBottle();
                this.statusbar_bottles.setPercentage(this.character.bottles);
                this.removeCollectedBottle(index);
            }
        });
    }

    /**
     * This function removes the coin from the screen and plays a sound.
     * 
     * @param {number} i index of coin to remove
     */
    removeCollectedCoin(i) {
        this.level.collectableCoins.splice(i, 1);
        coinsCollected.play();
    }

    /**
     * This function removes the bottle from the screen and plays a sound.
     * 
     * @param {number} i index of bottle to remove
     */
    removeCollectedBottle(i) {
        this.level.collectableBottles.splice(i, 1);
        bottlesCollected.play();
    }

    /**
     * This function checks if the character can throw a bottle, and performs actions accordingly.
     */
    checkThrow() {
        if (this.character.bottles > 0) {
            if (this.keyboard.S) {
                if (!this.character.rotateImage) {
                    this.throwBottle(true);
                } else {
                    this.throwBottle(false);
                }
                this.character.bottles -= 10;
                this.level.endboss.speed += 3.5;
                this.updateBottleStatusBar();
                this.resetStandingTime();
            }
        }
    }

    /**
     * This function throws a bottle object from the character's position, either from the right or the left.
     * 
     * @param {Boolean} goesRight 
     */
    throwBottle(goesRight) {
        let bottle = new ThrowableObject(this.character.x + (goesRight ? 100 : 0), this.character.y + 100, goesRight);
        this.throwableObjects.push(bottle);
    }

    /**
     * This function updates the percentage of the statusbar for the bottles.
     */
    updateBottleStatusBar() {
        this.statusbar_bottles.setPercentage(this.character.bottles);
    }

    /**
     * This function resets the standing time of the character.
     */
    resetStandingTime() {
        this.character.timeStanding = 0;
    }

    /**
     * This function summarizes all functions that check if a bottle collides with an object or the ground.
     */
    checkBottleCollisions() {
        this.checkBottleCollisionWithGround();
        this.checkBottleCollisionWithEndboss();
        this.checkBottleCollisionWithChicken();
    }

    /**
     * This function checks if a bottle has hit the ground and, if so, triggers the function to remove it from the screen.
     */
    checkBottleCollisionWithGround() {
        this.throwableObjects.forEach((bottle, index) => {
            if (!bottle.isAboveGroundLevel()) {
                bottle.collision = true;
                setTimeout(() => this.removeBottleFromScreen(index), 80);
            }
        });
    }

    /**
     * This function removes a bottle from the screen after a collision.
     * 
     * @param {index} b index of bottle to remove from the screen 
     */
    removeBottleFromScreen(b) {
        this.throwableObjects.splice(b, 1)
    }

    /**
     * This function checks if a bottle has hit the endboss and, if so, hurts the endboss and triggers the function to remove it from the screen.
     */
    checkBottleCollisionWithEndboss() {
        this.throwableObjects.forEach((bottle, index) => {
            if (bottle.isAboveGroundLevel() && bottle.isColliding(this.level.endboss)) {
                bottle.collision = true;
                this.endbossGetsHurt();
                setTimeout(() => this.removeBottleFromScreen(index), 120);
            }
        });
    }

    /**
     * This function makes the endboss get hit and updates his health statusbar accordingly.
     */
    endbossGetsHurt() {
        this.level.endboss.takesHit();
        this.statusbar_endboss.setPercentage(this.level.endboss.energy);
    }

    /**
     * This function checks whether a thrown bottle is colliding with a chicken, and, if so, kills the chicken, and removes both bottle and dead chicken from the screen.
     */
    checkBottleCollisionWithChicken() {
        this.throwableObjects.forEach((bottle, bottleindex) => {
            this.level.enemies.forEach((enemy, enemyindex) => {
                if (this.bottleCollidesWithChicken(bottle, enemy)) {
                    enemy.chickenIsDead = true;
                    bottle.collision = true;
                    setTimeout(() => this.removeDeadEnemy(enemyindex), 300);
                    setTimeout(() => this.removeBottleFromScreen(bottleindex), 120);
                }
            });
        });
    }

    /**
     * This function determines whether a bottle is colliding with a chicken.
     * 
     * @param {number} bottle index of thrown bottle
     * @param {number} enemy index of chicken that has been hit
     * @returns {true|false}
     */
    bottleCollidesWithChicken(bottle, enemy) {
        return bottle.isColliding(enemy) && bottle.isAboveGroundLevel() && !enemy.chickenIsDead;
    }

    /**
     * This function flips the image of an object on the x-axis.
     * @param {Object} moveables 
     */
    flipImage(moveables) {
        this.ctx.save();
        this.ctx.translate(moveables.width, 0);
        this.ctx.scale(-1, 1);
        moveables.x = moveables.x * -1;
    }

    /**
     * This function flips the image of an object back to its oringinal state on the x-axis.
     * @param {Object} moveables 
     */
    flipImageBack(moveables) {
        moveables.x = moveables.x * -1;
        this.ctx.restore();
    }

    /**
     * This function removes enemies that have already left the screen.
     */
    removeChickenIfOutOfScreen() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.chickenIsOutOfScreen(enemy)) this.removeDeadEnemy(index);
        })
    }

    /**
     * This function determines whether a chicken is out of the screen.
     * 
     * @param {Object} enemy 
     * @returns {true|false}
     */
    chickenIsOutOfScreen(enemy) {
        return enemy.x + enemy.width <= -200;
    }
}