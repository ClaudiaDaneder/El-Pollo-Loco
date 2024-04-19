class Endboss extends MoveableObject {
    height = 350;
    width = 300;
    y = 95;
    x = 2250;
    speed = 10;
    offsetXLeft = 10;
    offsetXRight = 40;
    offsetYTop = 70;
    offsetYBottom = 30;
    firstContact = false;
    timer = 0;

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.preloadImages(this.IMAGES_ALERT);
        this.preloadImages(this.IMAGES_WALKING);
        this.preloadImages(this.IMAGES_ATTACK);
        this.preloadImages(this.IMAGES_HURT);
        this.preloadImages(this.IMAGES_DEAD);
        this.animateEndboss();
    }

    /**
     * This function is used set the interval for animating the endboss.
     */
    animateEndboss() {
        setInterval(() => {
            if (this.firstContact) this.timer++;
            this.endbossAnimations();
            if (this.endbossActivated()) {
                if (Math.random() < 0.4) {
                    this.moveLeft();
                } else {
                    this.moveLeftRandomSpeed();
                }
            }
        }, 120);
    }

    /**
     * This function determines whether the endboss has been 'activated'.
     * 
     * @returns {true|false}
     */
    endbossActivated() {
        return !this.isDead() && !this.isHurt() && this.timer > 30 && this.firstContact;
    }

    /**
     * This function determines, which endboss animation to play.
     */
    endbossAnimations() {
        if (this.isDead()) {
            this.endbossAnimationDead();
        } else if (this.isHurt()) {
            this.endbossAnimationHurt()
        } else if (this.timer < 15) {
            this.endbossAnimationAlert();
        } else if (this.timer < 30) {
            this.endbossAnimationAttack();
        } else {
            this.endbossAnimationWalk();
        }
        this.hadFirstContact();
    }

    /**
     * This function is used to play the animation for when the endboss is dead.
     */
    endbossAnimationDead() {
        endboss_death.play();
        this.initiateAnimation(this.IMAGES_DEAD);
        setTimeout(() => this.gameSuccess(), 1000);
    }

    /**
     * This function shows the 'game-over' screen and plays a sound for when you've won the game.
     */
    gameSuccess() {
        this.gameOver();
        gameover_success.play();
    }

    /**
     * This function plays the animation for when the endboss is hurt.
     */
    endbossAnimationHurt() {
        endboss_hurt.play();
        this.initiateAnimation(this.IMAGES_HURT);
    }

    /**
     * This function plays the animation for when the endboss walks.
     */
    endbossAnimationWalk() {
        this.initiateAnimation(this.IMAGES_WALKING);
    }

    /**
     * This function plays the animation for when the endboss attacks.
     */
    endbossAnimationAttack() {
        endboss_attack.play();
        this.initiateAnimation(this.IMAGES_ATTACK);
    }

    /**
     * This function plays the animation for when the endboss is alert.
     */
    endbossAnimationAlert() {
        this.initiateAnimation(this.IMAGES_ALERT);
    }

    /**
     * This function sets the option if the character had his first contact with the endboss to true if he's near enough.
     */
    hadFirstContact() {
        if (this.characterIsNear()) {
            this.firstContact = true;
        }
    }

    /**
     * This function determines if the character is in the vicinity of the endboss.
     * @returns {true|false}
     */
    characterIsNear() {
        return this.x - world.character.x + world.character.width < 700 && !this.firstContact;
    }

    /**
     * This function sets the speed of the endboss to a random value.
     */
    moveLeftRandomSpeed() {
        let randomspeed = Math.floor(Math.random() * (this.speed * 2.2)) + this.speed;
        this.x -= randomspeed;
    }
}