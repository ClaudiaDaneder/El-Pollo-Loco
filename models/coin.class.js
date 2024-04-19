class Coin extends DrawableObject {
  width = 120;
  height = 120;
  offsetXLeft = 43;
  offsetXRight = 43;
  offsetYTop = 43;
  offsetYBottom = 43;

  constructor() {
    super().loadImage('./img/8_coin/coin_1.png');
    this.x = 250 + Math.random() * 2100;
    this.y = 90 + Math.random() * 148;
  }
}