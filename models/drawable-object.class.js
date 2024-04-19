class DrawableObject {
    x = 0;
    y;
    img;
    imageCache = {};
    currentImage = 0;
    offsetYTop;
    offsetYBottom;
    offsetXLeft;
    offsetXRight;

    /**
     * This function is used to load an image.
     * 
     * @param {URL} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    /**
     * Draws the object onto the canvas context. If an error occurs during drawing, it logs the error and the image source to the console.
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.log(error);
            console.log(this.img.src);
        }
    }

    /**
     * This function is used to preload an array of images.
     * 
     * @param {Array} array 
     */
    preloadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * This function is used to collectively cancel all intervals.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}
