let background_music = new Audio('audio/background-music.mp3');
let background_music_2 = new Audio('audio/background-music_2.mp3');
let click = new Audio('audio/click.mp3');
let sound_walking = new Audio('./audio/pepe_walk.mp3');
let sound_jumping = new Audio('./audio/pepe_jump.mp3');
let sound_dying = new Audio('./audio/pepe_death.mp3');
let sound_hurt = new Audio('./audio/pepe_hurt.mp3');
let sound_snoring = new Audio('./audio/pepe_snoring.mp3');
let coinsCollected = new Audio('./audio/coins_collected.mp3');
let bottlesCollected = new Audio('./audio/bottles_collected.mp3');
let bottle_breaks = new Audio('./audio/bottle_breaks.mp3');
let chicken_death = new Audio('./audio/chicken_death.mp3');
let endboss_death = new Audio('./audio/endboss_death.mp3');
let endboss_hurt = new Audio('./audio/endboss_hurt.mp3');
let gameover_success = new Audio('./audio/success.mp3');
let gameover_fail = new Audio('./audio/loss.mp3');
let endboss_attack = new Audio('./audio/endboss_attack.mp3');

isMuted = false;

/**
 * This function is used to play the 'click' sound on the startscreen buttons.
 */
function playClickSound() {
  click.play();
}

/**
 * This function plays, loops and sets the volume of the background music.
 */
function playBackgroundMusic() {
  setTimeout(() => {
    if (!isMuted) {
      background_music_2.loop = true;
      background_music_2.volume = 0.1;
      background_music_2.play();
    }
  }, 800);
}

/**
 * This function toggles the 'mute' mode for all audio files.
 */
function toggleMute() {
  let audioFiles = [background_music_2, click, sound_dying, sound_hurt, sound_jumping, sound_snoring, sound_walking, coinsCollected, bottlesCollected, bottle_breaks, chicken_death, endboss_death, endboss_hurt, gameover_fail, gameover_success, endboss_attack];

  if (!isMuted) {
    for (let audio of audioFiles) mute(audio);
    showMuteButton();
  } else {
    for (let audio of audioFiles) unmute(audio);
    showUnmuteButton();
  }
}

/**
 * This function is used to mute all audio.
 * @param {Element} audio 
 */
function mute(audio) {
  audio.muted = true;
  isMuted = true;
}

/**
 * This function is used to unmute all audio.
 * @param {Element} audio 
 */
function unmute(audio) {
  audio.muted = false;
  isMuted = false;
}

/**
 * This function is used to display the mute button.
 */
function showMuteButton() {
  document.getElementById('start-screen-sound').src = 'img/9_intro_outro_screens/start/muted.svg';
}

/**
 * This function is used to display the unmute button.
 */
function showUnmuteButton() {
  document.getElementById('start-screen-sound').src = 'img/9_intro_outro_screens/start/sound.svg';
}

