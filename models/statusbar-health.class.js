class StatusbarHealth extends Statusbar {
  x = 15;
  y = 85;

  constructor() {
    super();
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.determineImageIndex()]
    this.img = this.imageCache[path];
  }
}