class BackgroundObject extends MoveableObject {
    width = 720;
    height = 480;
    y = 0;

    constructor(imagePath, x) {
        super().loadImage(imagePath, x);
        this.x = x;
    }
}