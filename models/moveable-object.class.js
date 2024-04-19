class MoveableObject extends DrawableObject {
    speed;
    speedY = 0;
    acceleration = 2.5;
    rotateImage = false;
    energy = 100;
    lastHit = 0;
    offsetYTop;
    offsetYBottom;
    offsetXLeft;
    offsetXRight;

    /**
     * This function moves an object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * This function moves an object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * This function flips through the images in an array. 
     * 
     * @param {Array} images 
     */
    initiateAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * This function stops an animation and clears the image. 
     * 
     * @param {Animation} animation 
     * @param {number} timeout 
     */
    stopAnimation(animation, timeout) {
        clearInterval(animation);
        setTimeout(() => this.loadImage(''), timeout);
    }

    /**
     * This function applies gravity to an object (moves it down on the y-axis).
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGroundLevel() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * This function determines whether an object is below a certain value on the y-axis.
     * @returns {true|false}
     */
    isAboveGroundLevel() {
        if (this instanceof ThrowableObject) {
            return this.y <= 370;
        }
        return this.y < 186;
    }

    /**
     * This function makes an object move 'up' with a specific speed.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * This function determines whether one object touches another object. 
     * 
     * @param {Object} obj 
     * @returns {true|false}
     */
    isColliding(obj) {
        return (this.x + this.width - this.offsetXRight) > (obj.x + obj.offsetXLeft) &&
            (this.x + this.offsetXLeft) < (obj.x + obj.width - obj.offsetXRight) &&
            (this.y + this.height - this.offsetYBottom) > (obj.y + obj.offsetYTop) &&
            (this.y + this.offsetYTop) < (obj.y + obj.height - obj.offsetYBottom);
    }

    /**
     * This function determines what happens to the energy level when an object is hit.
     */
    takesHit() {
        if (this instanceof Character) {
            this.energy -= 4;
        }
        if (this instanceof Endboss) {
            this.energy -= 4;
            this.speed -= 1.5;
        }
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function determines whether an object is dead (has 0 energy left)
     * @returns {true|false}
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * This function determines if an object has been 'hit' within the last 0.5s.
     * @returns {true|false}
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }

    /**
     * This function sets everything in action to end the game, show the end screen and pause the background music.
     */
    gameOver() {
        this.clearAllIntervals();
        showGameOverScreen();
        background_music_2.pause();
    }

    /**
     * This function removes enemies that have already left the screen.
     */
    removeChickenIfOutOfScreen() {
        world.level.enemies.forEach((enemy, index) => {
            if (enemy.x + enemy.width <= -100) {
                world.level.enemies.splice(index, 1)
            }
        });
    }
}
