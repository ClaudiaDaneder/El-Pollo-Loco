class Clouds extends MoveableObject {
    height = 380;
    width = 720;
    speed = 0.25;

    constructor(path) {
        super().loadImage(path);
        this.x = 35 + Math.random() * 7000;
        this.y = 1 + Math.random();
        this.moveClouds();
    }

    /**
     * This function moves the clouds to the left.
     */
    moveClouds() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}

