(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});
//Game field view size
var GAME_WIGTH = exports.GAME_WIGTH = 960;
var GAME_HEIGHT = exports.GAME_HEIGHT = 1280;
var OFFSET = exports.OFFSET = GAME_HEIGHT - GAME_WIGTH;

//Number of gems per column and per row
var DONUTS_NUMBER = exports.DONUTS_NUMBER = 10;
var DONUT_SIZE = exports.DONUT_SIZE = GAME_WIGTH / 10; //96
var HALF_DONUT_SIZE = exports.HALF_DONUT_SIZE = DONUT_SIZE / 2;

var DONUTS = exports.DONUTS = ['gem-01', 'gem-02', 'gem-03', 'gem-04', 'gem-05', 'gem-06', 'gem-07', 'gem-08', 'gem-09', 'gem-10', 'gem-11', 'gem-12'];

var SOUNDS = exports.SOUNDS = ['select-1', 'select-2', 'select-3', 'select-4', 'select-5', 'select-6', 'select-7', 'select-8', 'select-9'];

var DEFAULT_SELECTED_OBJ = exports.DEFAULT_SELECTED_OBJ = { x: 0, y: 0, donut: null };

var TEXT_COLOR_LILAC = exports.TEXT_COLOR_LILAC = '#e063f1';
var TEXT_COLOR_WHITE = exports.TEXT_COLOR_WHITE = '#f1f1f1';
var TEXT_STROKE = exports.TEXT_STROKE = 10;
var TEXT_STROKE_COLOR = exports.TEXT_STROKE_COLOR = '#1c1c1c';

var SWAP_SPEED = exports.SWAP_SPEED = 200;
var DESTROY_SPEED = exports.DESTROY_SPEED = 400;
var FALL_SPEED = exports.FALL_SPEED = 600;

},{}],2:[function(require,module,exports){
'use strict';

var _constants = require('./constants');

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }return arr2;
    } else {
        return Array.from(arr);
    }
}

var game = new Phaser.Game(C.GAME_WIGTH, C.GAME_HEIGHT, Phaser.CANVAS, 'match3', {
    preload: preload,
    create: create
});

var WebFontConfig = {
    google: {
        families: ["Fredoka One"]
    }
};

//Create game initial state
//group of tasty donuts
var donuts = void 0,
    shadows = void 0;
//group of user interface during game;
var gameUI = void 0;
//inputEnabled: contain state - swaping donuts allowed or not
var inputEnabled = false;

var soundEnabled = false;

//matrix contain image of game board
var matrix = [];
var shMatrix = [];

//list of items for remove
var matchMap = [];

//Add score
var score = 0,
    textScore = void 0;

//Reset target and selected donuts
var selected = null;
var selectedShadow = null;
var hand = void 0;

//Add timer;
var timer = void 0,
    textTimer = void 0;

var bgMusic = void 0;

function preload() {
    //Load all resources
    //images
    game.load.image('bg-score', 'assets/images/bg-score.png');
    game.load.image('big-shadow', 'assets/images/big-shadow.png');
    game.load.image('btn-play', 'assets/images/btn-play.png');
    game.load.image('btn-sfx', 'assets/images/btn-sfx.png');
    game.load.image('donut', 'assets/images/donut.png');
    game.load.image('donuts_logo', 'assets/images/donuts_logo.png');
    game.load.image('text-timeup', 'assets/images/text-timeup.png');

    game.load.image('background', 'assets/images/backgrounds/background.jpg');

    game.load.image('gem-01', 'assets/images/game/gem-01.png');
    game.load.image('gem-02', 'assets/images/game/gem-02.png');
    game.load.image('gem-03', 'assets/images/game/gem-03.png');
    game.load.image('gem-04', 'assets/images/game/gem-04.png');
    game.load.image('gem-05', 'assets/images/game/gem-05.png');
    game.load.image('gem-06', 'assets/images/game/gem-06.png');
    game.load.image('gem-07', 'assets/images/game/gem-07.png');
    game.load.image('gem-08', 'assets/images/game/gem-08.png');
    game.load.image('gem-09', 'assets/images/game/gem-09.png');
    game.load.image('gem-10', 'assets/images/game/gem-10.png');
    game.load.image('gem-11', 'assets/images/game/gem-11.png');
    game.load.image('gem-12', 'assets/images/game/gem-12.png');
    game.load.image('hand', 'assets/images/game/hand.png');
    game.load.image('shadow', 'assets/images/game/shadow.png');
    game.load.image('timer-png', 'assets/images/game/timer.png');

    game.load.image('particle-1', 'assets/images/particles/particle-1.png');
    game.load.image('particle-2', 'assets/images/particles/particle-2.png');
    game.load.image('particle-3', 'assets/images/particles/particle-3.png');
    game.load.image('particle-4', 'assets/images/particles/particle-4.png');
    game.load.image('particle-5', 'assets/images/particles/particle-5.png');
    game.load.image('particle_ex1', 'assets/images/particles/particle_ex1.png');
    game.load.image('particle_ex2', 'assets/images/particles/particle_ex2.png');
    game.load.image('particle_ex3', 'assets/images/particles/particle_ex3.png');

    //music
    game.load.audio('backgroundMp3', 'assets/audio/background.mp3');
    game.load.audio('kill', 'assets/audio/kill.mp3');
    game.load.audio('select-1', 'assets/audio/select-1.mp3');
    game.load.audio('select-2', 'assets/audio/select-2.mp3');
    game.load.audio('select-3', 'assets/audio/select-3.mp3');
    game.load.audio('select-4', 'assets/audio/select-4.mp3');
    game.load.audio('select-5', 'assets/audio/select-5.mp3');
    game.load.audio('select-6', 'assets/audio/select-6.mp3');
    game.load.audio('select-7', 'assets/audio/select-7.mp3');
    game.load.audio('select-8', 'assets/audio/select-8.mp3');
    game.load.audio('select-9', 'assets/audio/select-9.mp3');

    //  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}

function create() {
    //Game initialization

    //Add background
    var background = game.add.sprite(0, 0, 'background');
    background.angle = 90;
    background.x = C.GAME_WIGTH;

    bgMusic = game.add.audio('backgroundMp3');
    bgMusic.loop = true;
    bgMusic.play();
    if (!soundEnabled) {
        bgMusic.stop();
    }

    var muteButton = game.add.button(20, 20, 'btn-sfx', function () {
        toogleSound();
    });
    muteButton.width = 100;
    muteButton.height = 100;

    //Add main menu
    createMainMenu();
}

function createMainMenu() {
    var mainMenu = game.add.group();
    var centerH = C.GAME_WIGTH / 2,
        centerV = C.GAME_HEIGHT / 2;

    //Add logo
    var donutsLogo = game.add.image(centerH, 0, 'donuts_logo');
    donutsLogo.anchor.setTo(0.5, 0);
    mainMenu.add(donutsLogo);

    //Add big donut bg
    var bigDonutShadow = game.add.image(centerH, centerV, 'big-shadow');
    bigDonutShadow.anchor.setTo(0.5);
    mainMenu.add(bigDonutShadow);
    var bigDonut = game.add.image(centerH, centerV, 'donut');
    bigDonut.anchor.setTo(0.5);
    mainMenu.add(bigDonut);

    //Add play button
    var playBtn = game.add.button(centerH, C.GAME_HEIGHT - 150, 'btn-play', function () {
        mainMenu.destroy();
        startGame();
    });
    playBtn.anchor.setTo(0.5);
    playBtn.bringToTop();
    mainMenu.add(playBtn);
}

function startGame() {
    //gameplay
    //start timer
    timer = game.time.create(true);
    timer.loop(10000, timeUp, this);
    timer.start();

    //Add UI elements
    createUI();

    //build board with donuts
    createAllDonuts();
    pauseGame();
    resetMatchMap();

    if (findAllMatches()) {
        setTimeout(function () {
            manageMatches();
        }, 500);
    }
    resumeGame();

    showTutorial();
    //bind events on mouse btn up and down
    game.input.onDown.add(onSelect, this);
    game.input.onUp.add(onRelease, this);
}

function createUI() {
    //All interface elements
    gameUI = game.add.group();

    //Score bg image
    var bgScore = game.add.image(C.GAME_WIGTH / 2, 0, 'bg-score');
    bgScore.anchor.setTo(0.5, 0);
    gameUI.add(bgScore);

    //Score label
    textScore = game.add.text(C.GAME_WIGTH / 2 + 120, 60, score, {
        font: "Fredoka One",
        fontSize: "65px",
        fill: C.TEXT_COLOR_WHITE,
        align: "right"
    });
    textScore.anchor.setTo(1, 0);
    gameUI.add(textScore);

    //add timer bg image
    var pngTimer = game.add.image(C.GAME_WIGTH - 50, 60, 'timer-png');
    pngTimer.anchor.set(0.75, 0.25);
    pngTimer.width = 150;
    pngTimer.height = 150;
    gameUI.add(pngTimer);

    //Add timer label
    textTimer = game.add.text(C.GAME_WIGTH - 50, 60, showTimeInSeconds(timer), {
        font: "Fredoka One",
        fontSize: "65px",
        fill: C.TEXT_COLOR_LILAC,
        align: "right",
        strokeThickness: C.TEXT_STROKE,
        stroke: C.TEXT_STROKE_COLOR
    });
    textTimer.anchor.set(1, 0);
    textTimer.bringToTop();
    setInterval(function () {
        textTimer.text = showTimeInSeconds(timer);
    }, 100);
    gameUI.add(textTimer);

    hand = game.add.sprite(0, 0, 'hand');
    hand.anchor.set(0.5);
    hand.visible = false;
    gameUI.add(hand);
}

function createAllDonuts() {
    //First spawn of donuts
    shadows = game.add.group();
    donuts = game.add.group();
    pauseGame();

    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        matrix[i] = [];
        shMatrix[i] = [];
        for (var j = 0; j < C.DONUTS_NUMBER; j++) {
            crateShadow(i, j);
            createDonut(i, j);
        }
    }
    donuts.x = C.HALF_DONUT_SIZE;
    donuts.y = C.OFFSET + C.HALF_DONUT_SIZE;
    shadows.x = C.HALF_DONUT_SIZE;
    shadows.y = C.OFFSET + C.HALF_DONUT_SIZE;
    gameUI.add(donuts);
    gameUI.add(shadows);
    gameUI.bringToTop(donuts);
    resumeGame();
}

function createDonut(i, j) {
    var donutImage = getRandomDonut();
    var startY = 0 - C.OFFSET - C.DONUT_SIZE,
        endY = j * C.DONUT_SIZE;
    var donut = donuts.create(i * C.DONUT_SIZE, startY, donutImage);
    donut.anchor.set(0.5);
    game.add.tween(donut).to({
        y: endY
    }, C.FALL_SPEED, Phaser.Easing.Linear.None, true);
    matrix[i][j] = donut;
}

function crateShadow(i, j) {
    var startY = 0 - C.OFFSET - C.DONUT_SIZE,
        endY = j * C.DONUT_SIZE;
    var shadow = shadows.create(i * C.DONUT_SIZE, startY, 'shadow');
    shadow.anchor.set(0.5);
    game.add.tween(shadow).to({
        y: endY
    }, C.FALL_SPEED, Phaser.Easing.Linear.None, true);
    shMatrix[i][j] = shadow;
}

function resetMatchMap() {
    //build new match map with no matches
    matchMap = [];
    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        matchMap[i] = [];
        for (var j = 0; j < C.DONUTS_NUMBER; j++) {
            matchMap[i][j] = null;
        }
    }
}

function matchRow(i, j) {
    //check match donut for every position in possible chain in row
    var matchPos1 = void 0,
        matchPos2 = void 0,
        matchPos3 = void 0;
    if (isInRangeI(i + 2) && matrix[i][j] !== null && matrix[i + 1][j] !== null && matrix[i + 2][j] !== null) {
        matchPos1 = matrix[i][j].key === matrix[i + 1][j].key && matrix[i][j].key === matrix[i + 2][j].key;
    } else {
        matchPos1 = false;
    }

    if (isInRangeI(i - 1) && isInRangeI(i + 1) && matrix[i][j] !== null && matrix[i + 1][j] !== null && matrix[i - 1][j] !== null) {
        matchPos2 = matrix[i - 1][j].key === matrix[i][j].key && matrix[i][j].key === matrix[i + 1][j].key;
    } else {
        matchPos2 = false;
    }
    if (isInRangeI(i - 2) && matrix[i][j] !== null && matrix[i - 1][j] !== null && matrix[i - 2][j] !== null) {
        matchPos3 = matrix[i - 2][j].key === matrix[i][j].key && matrix[i - 1][j].key === matrix[i][j].key;
    } else {
        matchPos3 = false;
    }
    return matchPos1 || matchPos2 || matchPos3;
}

function matchCol(i, j) {
    //check match donut for every position in possible chain in column
    var matchPos1 = void 0,
        matchPos2 = void 0,
        matchPos3 = void 0;
    if (isInRangeJ(j + 2) && matrix[i][j] !== null && matrix[i][j + 1] !== null && matrix[i][j + 2] !== null) {
        matchPos1 = matrix[i][j].key === matrix[i][j + 1].key && matrix[i][j].key === matrix[i][j + 2].key;
    }
    if (isInRangeJ(j - 1) && isInRangeJ(j + 1) && matrix[i][j] !== null && matrix[i][j + 1] !== null && matrix[i][j - 1] !== null) {
        matchPos2 = matrix[i][j - 1].key === matrix[i][j].key && matrix[i][j].key === matrix[i][j + 1].key;
    } else {
        matchPos2 = false;
    }
    if (isInRangeJ(j - 2) && matrix[i][j] !== null && matrix[i][j - 1] !== null && matrix[i][j - 2] !== null) {
        matchPos3 = matrix[i][j - 2].key === matrix[i][j].key && matrix[i][j - 1].key === matrix[i][j].key;
    } else {
        matchPos3 = false;
    }
    return matchPos1 || matchPos2 || matchPos3;
}

function match(i, j) {
    return matchRow(i, j) || matchCol(i, j);
}

function findAllMatches() {
    var matches = false;
    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        for (var j = 0; j < C.DONUTS_NUMBER; j++) {
            if (match(i, j)) {
                matchMap[i][j] = matrix[i][j];
                matches = true;
            }
        }
    }
    return matches;
}

function manageMatches() {
    resetMatchMap();
    if (findAllMatches()) {
        killAll();
    }
    resumeGame();
}

function kill(i, j) {
    var killAnimation = game.add.tween(matrix[i][j]).to({
        alpha: 0
    }, C.DESTROY_SPEED, Phaser.Easing.Linear.None, true);
    game.add.tween(shMatrix[i][j]).to({
        alpha: 0
    }, C.DESTROY_SPEED, Phaser.Easing.Linear.None, true);
    matrix[i][j].destroy();
    shMatrix[i][j].destroy();
    matrix[i][j] = null;
    shMatrix[i][j] = null;
}

function killAll() {
    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        for (var j = 0; j < C.DONUTS_NUMBER; j++) {
            if (matchMap[i][j] !== null) {
                kill(i, j);
            }
        }
    }
    /*matchMap.forEach(row => {
        row.forEach(donut => {
            if (donut !== null) {
                donut.destroy();
            }
        });
    });*/
    playSound('kill');
    fallAll();
}

function fall(i0) {
    var fallingFactor = 0; //how much holes donut should fall
    for (var j = C.DONUTS_NUMBER - 1; j >= 0; j--) {
        var fallingDonut = matrix[i0][j];
        var fallingShadow = shMatrix[i0][j];

        if (fallingDonut !== null) {
            game.add.tween(fallingDonut).to({
                y: (j + fallingFactor) * C.DONUT_SIZE
            }, C.FALL_SPEED, Phaser.Easing.Linear.None, true);
            game.add.tween(fallingShadow).to({
                y: (j + fallingFactor) * C.DONUT_SIZE
            }, C.FALL_SPEED, Phaser.Easing.Linear.None, true);
        } else {
            fallingFactor++;
        }
    }
}

function fallAll() {
    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        var fallingHeight = getFallingHeight(i);
        if (fallingHeight) {
            fall(i);
        }
    }
    matrixCorrection(matrix);
    matrixCorrection(shMatrix);
    respawnAll();
}

function getFallingHeight(i) {
    //Count how many holes donuts should fall
    return matrix[i].filter(function (donut) {
        return donut === null;
    }).length;
}

function respawn(i, j) {
    crateShadow(i, j);
    createDonut(i, j);
}

function respawnAll() {
    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        for (var j = 0; j < C.DONUTS_NUMBER; j++) {
            if (matrix[i][j] === null) {
                respawn(i, j);
            }
        }
    }
    resetMatchMap();
}

function matrixCorrection(matrix) {
    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        var nulls = matrix[i].filter(function (donut) {
            return donut === null;
        }),
            _donuts = matrix[i].filter(function (donut) {
            return donut !== null;
        });
        matrix[i] = [].concat(_toConsumableArray(nulls), _toConsumableArray(_donuts));
    }
}

function onSelect(pointer) {
    var pointerY = pointer.y - C.OFFSET;
    var pointerX = pointer.x;
    if (inputEnabled) {
        var j = Math.floor(pointerY / C.DONUT_SIZE),
            i = Math.floor(pointerX / C.DONUT_SIZE);
        if (isInRange(i, j)) {
            var pointed = matrix[i][j],
                pointedShadow = shMatrix[i][j];
            console.log('pointed', pointed.key, i, j);
            /*if (areSame(selected, pointed)) {
                //if pointed donut already select, clear selection
                selected.scale.setTo(1);
                selectedShadow.scale.setTo(1);
                selected = null;
                selectedShadow = null;
            } else*/if (areNeighbors(selected, pointed)) {
                //if donuts are neighbors, swap them
                selected.scale.setTo(1);
                selectedShadow.scale.setTo(1);
                swap(selected, pointed, true);
                // clearSelection();
            } else if (selected === null) {
                //choose pointed donut
                selected = pointed;
                selectedShadow = pointedShadow;

                selected.scale.setTo(1.2);
                selectedShadow.scale.setTo(1.2);
                selected.bringToTop();

                var sound = getRandomSound();
                playSound(sound);
                // game.input.addMoveCallback(move, this)
            } else {
                //clear selection
                clearSelection();
            }
        }
    }
}

function clearSelection() {
    selected.scale.setTo(1);
    selectedShadow.scale.setTo(1);
    selected = null;
    selectedShadow = null;
}

function isInRangeI(i) {
    return i >= 0 && i < C.DONUTS_NUMBER;
}

function isInRangeJ(j) {
    return j >= 0 && j < C.DONUTS_NUMBER;
}

function isInRange(i, j) {
    return isInRangeI(i) && isInRangeJ(j);
}

function isNull(selected) {
    return selected === null;
}

function areSame(selected, pointed) {
    if (isNull(selected) || isNull(pointed)) {
        return false;
    } else {
        return getI(selected) === getI(pointed) && getJ(selected) === getJ(pointed);
    }
}

function areNeighbors(selected, pointed) {
    if (isNull(selected) || isNull(pointed)) {
        return false;
    } else {
        var iS = getI(selected),
            jS = getJ(selected),
            iP = getI(pointed),
            jP = getJ(pointed),
            isNeighborsByI = Math.abs(iS - iP) === 1 && jS === jP,
            isNeighborsByJ = Math.abs(jS - jP) === 1 && iS === iP;
        return isNeighborsByI || isNeighborsByJ;
    }
}

function getJ(donut) {
    return Math.floor(donut.y / C.DONUT_SIZE);
}

function getI(donut) {
    return Math.floor(donut.x / C.DONUT_SIZE);
}

function onRelease() {
    game.input.deleteMoveCallback(move, this);
}

function move(event, pX, pY) {
    //action on pointer moving
    if (event.id === 0) {
        var dX = pX - selected.x,
            dY = pY - selected.y - C.OFFSET,
            dI = 0,
            dJ = 0;
        if (Math.abs(dX) > C.HALF_DONUT_SIZE) {
            dJ = dX > 0 ? 1 : -1;
        } else if (Math.abs(dY) > C.HALF_DONUT_SIZE) {
            dI = dY > 0 ? 1 : -1;
        }
        if (dI - dJ !== 0) {
            //try to swap donuts
            var pointedI = getI(selected) + dI,
                pointedJ = getJ(selected) + dJ;
            if (isInRange(pointedI, pointedJ)) {
                var pointed = matrix[pointedI][pointedJ];
                selected.scale.setTo(1);
                selectedShadow.scale.setTo(1);
                var sound = getRandomSound();
                playSound(sound);
                swap(selected, pointed, true);
                game.input.deleteMoveCallback(move, this);
            }
        }
    }
}

function swap(selected, pointed, swapBack) {
    //swapping donuts
    pauseGame();
    var iS = getI(selected),
        jS = getJ(selected),
        iP = getI(pointed),
        jP = getJ(pointed),
        pointedShadow = shMatrix[iP][jP];
    matrix[iS][jS] = pointed;
    matrix[iP][jP] = selected;
    shMatrix[iS][jS] = pointedShadow;
    shMatrix[iP][jP] = selectedShadow;
    game.add.tween(matrix[iS][jS]).to({
        x: iS * C.DONUT_SIZE,
        y: jS * C.DONUT_SIZE
    }, C.SWAP_SPEED, Phaser.Easing.Linear.None, true);
    var donut2Tween = game.add.tween(matrix[iP][jP]).to({
        x: iP * C.DONUT_SIZE,
        y: jP * C.DONUT_SIZE
    }, C.SWAP_SPEED, Phaser.Easing.Linear.None, true);
    game.add.tween(shMatrix[iS][jS]).to({
        x: iS * C.DONUT_SIZE,
        y: jS * C.DONUT_SIZE
    }, C.SWAP_SPEED, Phaser.Easing.Linear.None, true);
    game.add.tween(shMatrix[iP][jP]).to({
        x: iP * C.DONUT_SIZE,
        y: jP * C.DONUT_SIZE
    }, C.SWAP_SPEED, Phaser.Easing.Linear.None, true);
    //after animation complete match donuts
    donut2Tween.onComplete.add(function () {
        var thereAreMatches = match(iP, jP);
        if (!thereAreMatches && swapBack) {
            swap(selected, pointed, false);
        } else {
            if (thereAreMatches) {
                manageMatches();
                updateTimer(5);
                updateScore();
            } else {
                resumeGame();
                selected = null;
            }
        }
    });
}

function pauseGame() {
    inputEnabled = false;
    timer.pause();
}

function resumeGame() {
    inputEnabled = true;
    timer.resume();
}

function stopGame() {
    timer.stop();
    inputEnabled = false;
}

function updateScore() {
    score++;
    textScore.text = score;
}

function updateTimer(seconds) {
    var newDuration = timer.duration + seconds * 1000;
    timer.stop();
    timer.loop(newDuration, timeUp, this);
    timer.start();
}

function playSound(sound) {
    if (soundEnabled) {
        var playingSound = game.add.audio(sound);
        playingSound.play();
    }
}

function toogleSound() {
    if (soundEnabled) {
        soundEnabled = false;
        bgMusic.stop();
    } else {
        soundEnabled = true;
        bgMusic.play();
    }
}

function getRandomSound() {
    var randomSound = Math.floor(Math.random() * C.SOUNDS.length);
    return C.SOUNDS[randomSound];
}

function timeUp() {
    console.log('time up!');
    stopGame();
    game.add.tween(gameUI).to({
        alpha: 0
    }, 1000, Phaser.Easing.Linear.None, true);
    var timeup = game.add.image(C.GAME_WIGTH / 2, C.GAME_HEIGHT / 2, 'text-timeup');
    timeup.anchor.set(0.5);
    showGameOver();
}

function showGameOver() {
    var gameOver = game.add.text(C.GAME_WIGTH / 2, C.GAME_HEIGHT / 2 + 300, 'Game is over, your score is ' + score, {
        font: "Fredoka One",
        fontSize: "65px",
        fontWeight: "bold",
        strokeThickness: C.TEXT_STROKE,
        stroke: C.TEXT_STROKE_COLOR,
        fill: C.TEXT_COLOR_WHITE,
        align: "right"
    });
    gameOver.anchor.set(0.5);
}

function showTimeInSeconds(timer) {
    return Math.ceil(timer.duration / 1000);
}

function getRandomDonut() {
    var randomDonut = Math.floor(Math.random() * C.DONUTS.length);
    return C.DONUTS[randomDonut];
}

function showTutorial() {
    var matchFound = false;
    for (var i = 0; i < C.DONUTS_NUMBER - 1; i++) {
        for (var j = 0; j < C.DONUTS_NUMBER - 1; j++) {
            tutorialSwap(i, j, i + 1, j);
            if (findAllMatches()) {
                hand.visible = true;
                hand.x = matrix[i + 1][j].x + 16;
                hand.y = matrix[i + 1][j].y + 70;
                game.add.tween(hand).to({
                    y: hand.y + 100
                }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
                matchFound = true;
            }
            tutorialSwap(i, j, i + 1, j);
            if (matchFound) {
                return;
            }
            tutorialSwap(i, j, i, j + 1);
            if (findAllMatches()) {
                hand.visible = true;
                hand.x = matrix[i][j + 1].x + 16;
                hand.y = matrix[i][j + 1].y + 70;
                game.add.tween(hand).to({
                    x: hand.x + 100
                }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
                matchFound = true;
            }
            tutorialSwap(i, j, i, j + 1);
            if (matchFound) {
                return;
            }
        }
    }
    console.log("no match");
}

function tutorialSwap(i1, j1, i2, j2) {
    var tmp = matrix[i1][j1];
    matrix[i1][j1] = matrix[i2][j2];
    matrix[i2][j2] = tmp;
}

},{"./constants":1}]},{},[2])
//# sourceMappingURL=game.js.map
