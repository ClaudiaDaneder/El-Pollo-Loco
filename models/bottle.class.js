class Bottle extends DrawableObject {
  y = 350;
  height = 70;
  width = 70;
  offsetXLeft = 30;
  offsetXRight = 15;
  offsetYTop = 14;
  offsetYBottom = 8;


  constructor(path) {
    super().loadImage(path);
    this.x = -100 + Math.random() * 2100;
  }
}