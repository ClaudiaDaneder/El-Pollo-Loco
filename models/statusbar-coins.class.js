class StatusbarCoins extends Statusbar {
  x = 15;
  y = 45;

  constructor() {
    super();
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_COINS[this.determineImageIndex()]
    this.img = this.imageCache[path];
  }
}