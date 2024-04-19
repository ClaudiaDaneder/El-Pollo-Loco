class Minichicken extends MoveableObject {
  height = 60;
  width = 60;
  y = 360;
  offsetXLeft = 5;
  offsetXRight = 5;
  offsetYTop = 5;
  offsetYBottom = 8;
  chickenIsDead = false;

  IMAGES_WALKING = [
    './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];

  IMAGE_DEAD = ['./img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  constructor() {
    super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.preloadImages(this.IMAGES_WALKING);
    this.speed = 0.45 + Math.random() * 0.85;
    this.x = 720 + Math.random() * 2500;
    this.animate();

  }

  /**
   * This function sets the interval for moving the minichicken and animates them.
   */
  animate() {
    setInterval(() => this.chickenMovesLeft(), 1000 / 60);
    this.animateMiniChickens();
  }

  /**
   * This function sets the interval for the animation of the minichicken and stops the animation when the minichicken die.
   */
  animateMiniChickens() {
    const animateMiniChicken = setInterval(() => {
      if (this.chickenIsDead) {
        chicken_death.play();
        this.loadImage(this.IMAGE_DEAD);
        this.stopAnimation(animateMiniChicken, 500);
      } else {
        this.initiateAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  /**
   * This function moves the minichicken to the left.
   */
  chickenMovesLeft() {
    if (!this.chickenIsDead) this.moveLeft();
  }
}