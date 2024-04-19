class Chicken extends MoveableObject {
    height = 60;
    width = 60;
    y = 360;
    offsetXLeft = 5;
    offsetXRight = 5;
    offsetYTop = 5;
    offsetYBottom = 8;
    chickenIsDead = false;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = ['./img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 720 + Math.random() * 2800;
        this.preloadImages(this.IMAGES_WALKING);
        this.animate();
        this.speed = 0.25 + Math.random() * 0.65;
    }

    /**
     * This function sets the interval for moving the chicken and animates them.
     */
    animate() {
        setInterval(() => this.chickenMovesLeft(), 1000 / 60);
        this.animateChickens();
    }

    /**
     * This function plays the animations for the chicken.
     */
    animateChickens() {
        const animateChicken = setInterval(() => {
            if (this.chickenIsDead) {
                chicken_death.play();
                this.loadImage(this.IMAGE_DEAD);
                this.stopAnimation(animateChicken, 500);
            } else {
                this.initiateAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    /**
     * This function makes the chicken move left, unless they're dead.
     */
    chickenMovesLeft() {
        if (!this.chickenIsDead) {
            this.moveLeft();
        }
    }
}