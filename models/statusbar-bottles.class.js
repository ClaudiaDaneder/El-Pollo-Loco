class StatusbarBottles extends Statusbar {
  x = 15;
  y = 5;

  constructor() {
    super();
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOTTLES[this.determineImageIndex()]
    this.img = this.imageCache[path];
  }
}