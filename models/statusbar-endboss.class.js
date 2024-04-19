class StatusbarEndboss extends Statusbar {
  x = 486;
  y = 85;

  constructor() {
    super();
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_ENDBOSS[this.determineImageIndex()]
    this.img = this.imageCache[path];
  }
}