class ThrowableObject extends MoveableObject {
    height = 60;
    width = 60;
    collision = false;
    offsetXLeft = 20;
    offsetXRight = 20;
    offsetYTop = 10;
    offsetYBottom = 10;
    bottleThrown = false;

    IMAGES_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'

    ];

    constructor(x, y, goesRight) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.preloadImages(this.IMAGES_ROTATION);
        this.preloadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.goesRight = goesRight;
        this.throw();
    }

    /**
     * This function makes the object perform a throw action, applying gravity and setting a vertical speed, and triggers the animation.
     */
    throw() {
        if (!this.collision) {
            this.applyGravity();
            this.speedY = 20;
            setInterval(() => {
                if (this.goesRight) {
                    this.x += 8;
                } else {
                    this.x -= 8;
                }
            }, 25);
        }
        this.animate();
    }

    /**
     * This function plays the bottle animations.
     */
    animate() {
        this.animateBottle =
            setInterval(() => {
                if (this.isAboveGroundLevel() && !this.collision) {
                    this.initiateAnimation(this.IMAGES_ROTATION)
                } else {
                    this.bottleBursts();
                }
            }, 90);
    }

    /**
     * This function plays the animation for when the bottle collides with and object ot the ground.
     */
    bottleBursts() {
        bottle_breaks.play();
        setInterval(() => this.x -= 0, 25);
        this.initiateAnimation(this.IMAGES_SPLASH);
        this.stopAnimation(this.animateBottle, 900);
    }
}