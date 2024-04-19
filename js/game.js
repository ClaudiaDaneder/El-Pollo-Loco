let canvas;
let world;
let keyboard = new Keyboard();
isLoading = false;
isFullscreen = false;


/**
 * This function shows a short loading screen in order to preload all objects before starting the game. 
 */
async function showLoadingScreen() {
    document.getElementById('loading-screen').classList.remove('hide');
    if (!isLoading) {
        await startGame();;
        setTimeout(() => {
            isLoading = true;
            showGame();
        }, 1200);
    }
}

/**
 * This function starts the game by creating the class World.
 */
async function startGame() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    trackKeyEvents();
    trackMobileButtonEvents();
}

/**
 * This function hides all other screens in order to show the start screen (either on the first load or also after a previous game).
 */
function showStartScreen() {
    document.getElementById('loading-screen').classList.add('hide');
    document.getElementById('start-screen').classList.remove('hide');
    document.getElementById('game-over-screen').classList.add('hide');
    document.getElementById('screen-controls').classList.remove('hide');
    document.getElementById('how-to-play-button').classList.remove('hide');
    document.getElementById('mobile-controls').classList.add('hide');
}

/**
 * This function shows the 'game over' screen and makes sure that all unneccessary controls are hidden.
 */
function showGameOverScreen() {
    document.getElementById('game-screen').classList.add('hide');
    document.getElementById('game-over-screen').classList.remove('hide');
    mutePepe();
    document.getElementById('screen-controls').classList.add('hide');
    document.getElementById('mobile-controls').classList.add('hide');
}

/**
 * This function shows the screen that the game happens on and hides all other screens. 
 */
function showGame() {
    isLoading = false;
    document.getElementById('loading-screen').classList.add('hide');
    document.getElementById('game-screen').classList.remove('hide');
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('game-over-screen').classList.add('hide');
    document.getElementById('how-to-play-button').classList.add('hide');
    document.getElementById('mobile-controls').classList.remove('hide');
    document.getElementById('screen-controls').classList.remove('hide');
}

/**
 * This function shows or hides the popup window with the game explanations. 
 */
function showOrHideHowToPlay() {
    document.getElementById('how-to-play').classList.toggle('hide');
    document.getElementById('start-screen').classList.toggle('hide');
    document.getElementById('screen-controls').classList.toggle('hide');
}

/**
 * This function stops all in-game sounds of the character that might still be playing after the game is over.
 */
function mutePepe() {
    sound_walking.pause();
    sound_jumping.pause();
    sound_hurt.pause();
    sound_dying.pause();
}

/**
 * This function is used to listen for and match the needed keys with our character's actions. 
 */
function trackKeyEvents() {
    window.addEventListener('keydown', (event) => {
        if (event.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (event.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (event.keyCode == 32) {
            keyboard.SPACE = true;
        }
        if (event.keyCode == 83) {
            keyboard.S = true;
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (event.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (event.keyCode == 32) {
            keyboard.SPACE = false;
        }
        if (event.keyCode == 83) {
            keyboard.S = false;
        }
    });
}

/**
 * This function is used to match the mobile buttons with the appropriate actions. 
 */
function trackMobileButtonEvents() {
    document.getElementById('mobile-btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('mobile-btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('mobile-btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('mobile-btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('mobile-btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('mobile-btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('mobile-btn-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.S = true;
    });

    document.getElementById('mobile-btn-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.S = false;
    });
}

/**
 * This function is used to toggle the full screen mode.
 */
function toggleFullScreen() {
    let fullscreen = document.getElementById('content');
    if (!isFullscreen) {
        document.getElementById('full-screen-button-img').src = 'img/9_intro_outro_screens/start/exit_fullscreen.svg';
        enterFullscreen(fullscreen);
    } else {
        document.getElementById('full-screen-button-img').src = 'img/9_intro_outro_screens/start/fullscreen.svg';
        exitFullscreen();
    }
}

/**
 * This function is used to enter an element into fullscreen mode.
 * @param {Element} element // Element which will be entered into fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
    isFullscreen = true;
}

/**
 * This funciton is used to exit the fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    isFullscreen = false;
}

