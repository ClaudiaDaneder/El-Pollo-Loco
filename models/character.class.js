class Character extends MoveableObject {
    width = 122;
    height = 240;
    x = 100;
    y = 186;
    speed = 5;
    coins = 0;
    maxCoins = 100;
    bottles = 0;
    maxBottles = 100;
    world;
    offsetXLeft = 25;
    offsetXRight = 30;
    offsetYTop = 110;
    offsetYBottom = 15;
    timeStanding = 0;


    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DYING = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.preloadImages(this.IMAGES_IDLE);
        this.preloadImages(this.IMAGES_SLEEPING);
        this.preloadImages(this.IMAGES_WALKING);
        this.preloadImages(this.IMAGES_HURT);
        this.preloadImages(this.IMAGES_JUMPING);
        this.preloadImages(this.IMAGES_DYING);
        this.applyGravity();
        this.animatePepe();
    }

    /**
     * This function is used to give the character a small bounce after he's jumped onto an enemy. 
     */
    bounce() {
        this.speedY = 10;
    }

    /**
     * This function is used to set the intervals for the character's animations.
     */
    animatePepe() {
        setInterval(() => this.characterMovement(), 1000 / 60);
        setInterval(() => this.characterAnimations(), 150);
        setInterval(() => this.characterAnimationHurt(), 300);
    }

    /**
     * This function is used to let the character move, if he's not dead. The camera "follows" him.
     */
    characterMovement() {
        sound_walking.pause();
        if (!this.isDead()) {
            this.characterMovingRight();
            this.characterMovingLeft();
            this.characterJumping();
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * This function is used to have the character move right.
     */
    characterMovingRight() {
        if (this.canMoveRight()) {
            this.moveRight();
            this.rotateImage = false;
            sound_walking.play();
        }
    }
    /**
     * This function checks whether the character can move right.
     * @returns {true|false}
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * This function is used to have the character move left.
     */
    characterMovingLeft() {
        if (this.canMoveLeft()) {
            this.moveLeft();
            this.rotateImage = true;
            sound_walking.play();
        }
    }

    /**
    * This function checks whether the character can move left.
    * @returns {true|false}
    */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -100;
    }

    /**
     * This function makes the character jump.
     */
    characterJumping() {
        if (this.canJump()) {
            this.jump();
            sound_jumping.play();
        }
    }

    /**
     * This function checks whether the character can jump.
     * @returns {true|false}
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGroundLevel();
    }

    /**
     * This function determines what animation to play for the character.
     */
    characterAnimations() {
        sound_snoring.pause();
        if (this.jumps()) {
            this.characterAnimationJump();
        } else if (this.walks()) {
            this.characterAnimationWalk();
        } else if (this.isDead()) {
            this.characterAnimationDead();
        } else {
            this.characterAnimationIdle();
        }
    }

    /**
    * This function checks whether the character is currently jumping.
    * @returns {true|false}
    */
    jumps() {
        return this.isAboveGroundLevel() && !this.isDead() && !this.isHurt();
    }

    /**
    * This function checks whether the character is currently walking.
    * @returns {true|false}
    */
    walks() {
        return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isDead() && !this.isHurt();
    }

    /**
     * This functon resets the character's 'timeStanding'.
     */
    resetStandingTime() {
        this.timeStanding = 0;
    }

    /**
     * This function plays the animation for when the character is hurt.
     */
    characterAnimationHurt() {
        if (this.isHurt() && !this.isDead()) {
            this.initiateAnimation(this.IMAGES_HURT);
            sound_hurt.play();
            this.resetStandingTime();
        }
    }

    /**
    * This function plays the animation for when the character walks.
    */
    characterAnimationWalk() {
        this.initiateAnimation(this.IMAGES_WALKING);
        this.resetStandingTime();
    }

    /**
     * This function plays the animation for when the character jumps.
     */
    characterAnimationJump() {
        this.initiateAnimation(this.IMAGES_JUMPING);
        this.resetStandingTime();
    }

    /**
     * This function plays then animation for when the character is idle or, respectively, sleeping. 
     */
    characterAnimationIdle() {
        this.initiateAnimation(this.IMAGES_IDLE);
        this.timeStanding += 100;
        if (this.timeStanding > 4000) {
            this.initiateAnimation(this.IMAGES_SLEEPING);
            sound_snoring.play();
            sound_snoring.loop = true;
        }
    }

    /**
     * This function plays the animation for when the character dies.
     */
    characterAnimationDead() {
        sound_dying.play();
        this.initiateAnimation(this.IMAGES_DYING);
        setTimeout(() => this.gameFail(), 1000);
    }

    /**
     * This function shows the 'game-over' screen and plays a sound for when you've lost the game.
     */
    gameFail() {
        this.gameOver();
        gameover_fail.play();
    }

    /**
     * This function credits 10 points / percent when collecting a coin.
     */
    collectCoin() {
        if (this.coins < this.maxCoins) {
            this.coins += 10;
        }
    }

    /**
     * This function credits 10 points / percent when collecting a bottle.
     */
    collectBottle() {
        if (this.bottles < this.maxBottles) {
            this.bottles += 10;
        }
    }
}