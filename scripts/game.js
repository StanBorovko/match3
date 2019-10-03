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

var DEFAULT_SELECTED_OBJ = exports.DEFAULT_SELECTED_OBJ = { x: 0, y: 0, donut: null };

var TEXT_COLOR_LILAC = exports.TEXT_COLOR_LILAC = '#e063f1';
var TEXT_COLOR_WHITE = exports.TEXT_COLOR_WHITE = '#f1f1f1';
var TEXT_STROKE = exports.TEXT_STROKE = 10;
var TEXT_STROKE_COLOR = exports.TEXT_STROKE_COLOR = '#1c1c1c';

var SWAP_SPEED = exports.SWAP_SPEED = 200;
var DESTROY_SPEED = exports.DESTROY_SPEED = 200;
var FALL_SPEED = exports.FALL_SPEED = 200;

var FALL_DELAY = exports.FALL_DELAY = DESTROY_SPEED * 2;
var RESPAWN_DELAY = exports.RESPAWN_DELAY = FALL_DELAY + FALL_SPEED * 2;

},{}],2:[function(require,module,exports){
"use strict";

var _constants = require("./constants");

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

console.log(C);

var game = new Phaser.Game(C.GAME_WIGTH, C.GAME_HEIGHT, Phaser.CANVAS, 'match3', {
    preload: preload,
    create: create
});

//  The Google WebFont Loader will look for this object, so create it before loading the script.
var WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    // active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want two load (specify as many as you like in the array)
    google: {
        families: ["Fredoka One"]
    }

};

//Create game initial state
//group of tasty donuts
var donuts = void 0;
//inputEnabled: contain state - swaping donuts allowed or not
var inputEnabled = true;

//flag of fast donuts falling
var fastFall = false;

//matrix contain image of game board
var matrix = [];

//list of items for remove
var matchMap = [];

//Add score
var score = 0,
    textScore = void 0;

//Reset target and selected donuts
var selected = null;
var target = null;

//Add timer;
var timer = void 0,
    textTimer = void 0;

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

    //  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}

function create() {
    //Game initialization
    //Add background
    var background = game.add.sprite(0, 0, 'background');
    background.angle = 90;
    background.x = C.GAME_WIGTH;

    //Add main menu
    createMainMenu();
}

function createMainMenu() {
    var mainMenu = game.add.group();

    //Add logo
    var donutsLogo = game.add.image(C.GAME_WIGTH / 2, 0, 'donuts_logo');
    donutsLogo.anchor.setTo(0.5, 0);
    mainMenu.add(donutsLogo);

    //Add play button
    var playBtn = game.add.button(C.GAME_WIGTH / 2, C.GAME_HEIGHT / 2, 'btn-play', function () {
        mainMenu.destroy();
        startGame();
    });
    playBtn.anchor.setTo(0.5);
    mainMenu.add(playBtn);
}

function startGame() {
    //gameplay
    //start timer
    timer = game.time.create(true);
    timer.loop(10000, timeUp, this);
    timer.start();

    //Add UI elemetns
    createUI();

    //build board with donuts
    createAllDonuts();
    setTimeout(function () {
        findMatches();
    }, C.FALL_DELAY);
    // findMatches();
    /*if (this.matchAll()) {
        setTimeout(() => {this.handleMatches()}, 250)
    }*/
    // handleMatches();

    //bind events on mouse btn up and down
    game.input.onDown.add(onSelect, this);
    game.input.onUp.add(onRelease, this);

    // console.log(this.donuts);
}

function createUI() {
    //All interface elements

    //Score bg image
    var bgScore = game.add.image(C.GAME_WIGTH / 2, 0, 'bg-score');
    bgScore.anchor.setTo(0.5, 0);

    //Score label
    textScore = game.add.text(C.GAME_WIGTH / 2 + 120, 60, score, {
        font: "Fredoka One",
        fontSize: "65px",
        fill: C.TEXT_COLOR_WHITE,
        align: "right"
    });
    textScore.anchor.setTo(1, 0);

    /*//score counter quick test
    setInterval(() => {
        score++;
        textScore.text = this.score;
    }, 1000);*/

    //Add timer label
    textTimer = game.add.text(C.GAME_WIGTH - 50, 60, showTimeInSeconds(timer), {
        font: "Fredoka One",
        fontSize: "65px",
        fill: C.TEXT_COLOR_LILAC,
        align: "right"
    });
    textTimer.anchor.set(1, 0);
    setInterval(function () {
        textTimer.text = showTimeInSeconds(timer);
    }, 100);
    // console.log('this.timer.duration',this.timer.duration);
}

function createAllDonuts() {
    //First spawn of donuts
    donuts = game.add.group();
    pauseGame();

    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        matrix[i] = [];
        for (var j = 0; j < C.DONUTS_NUMBER; j++) {
            /*let donutImage = getRandomDonut();
            let donut = donuts.create(i * C.DONUT_SIZE, j * C.DONUT_SIZE, donutImage);
            donut.anchor.set(0.5);
              matrix[i][j] = donut;*/
            //TODO uncomment this:
            createDonut(i, j);
        }
    }
    donuts.x = C.HALF_DONUT_SIZE;
    donuts.y = C.OFFSET + C.HALF_DONUT_SIZE;
}

function createDonut(i, j) {
    var donutImage = getRandomDonut();
    var startY = 0 - C.OFFSET - C.DONUT_SIZE,
        endY = j * C.DONUT_SIZE;
    var donut = donuts.create(i * C.DONUT_SIZE, startY, donutImage);
    donut.anchor.set(0.5);
    var fallDonutTween = game.add.tween(donut).to({
        y: endY
    }, C.FALL_SPEED, Phaser.Easing.Linear.None, true);
    matrix[i][j] = donut;
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
    // console.log('i, j', i, j, matrix[i][j]);
    if (i + 2 < C.DONUTS_NUMBER) {
        matchPos1 = matrix[i][j].key === matrix[i + 1][j].key && matrix[i][j].key === matrix[i + 2][j].key;
    } else {
        matchPos1 = false;
    }

    if (i - 1 >= 0 && i + 1 < C.DONUTS_NUMBER) {
        matchPos2 = matrix[i - 1][j].key === matrix[i][j].key && matrix[i][j].key === matrix[i + 1][j].key;
    } else {
        matchPos2 = false;
    }
    if (i - 2 >= 0) {
        matchPos3 = matrix[i - 2][j].key === matrix[i][j].key && matrix[i - 1][j].key === matrix[i][j].key;
    } else {
        matchPos3 = false;
    }
    // console.log('row: i, j', i, j, matchPos1 || matchPos2 || matchPos3);
    return matchPos1 || matchPos2 || matchPos3;
}

function matchCol(i, j) {
    //check match donut for every position in possible chain in column
    var matchPos1 = void 0,
        matchPos2 = void 0,
        matchPos3 = void 0;
    if (j + 2 < C.DONUTS_NUMBER) {
        matchPos1 = matrix[i][j].key === matrix[i][j + 1].key && matrix[i][j].key === matrix[i][j + 2].key;
    }
    if (j - 1 >= 0 && j + 1 < C.DONUTS_NUMBER) {
        matchPos2 = matrix[i][j - 1].key === matrix[i][j].key && matrix[i][j].key === matrix[i][j + 1].key;
    } else {
        matchPos2 = false;
    }
    if (j - 2 >= 0) {
        matchPos3 = matrix[i][j - 2].key === matrix[i][j].key && matrix[i][j - 1].key === matrix[i][j].key;
    } else {
        matchPos3 = false;
    }
    // console.log('col: i, j', i, j, matchPos1 || matchPos2 || matchPos3);
    return matchPos1 || matchPos2 || matchPos3;
}

function match(i, j) {
    return matchRow(i, j) || matchCol(i, j);
}

function findMatches() {
    resetMatchMap();
    console.log('matrix', matrix);
    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        for (var j = 0; j < C.DONUTS_NUMBER; j++) {
            if (match(i, j)) {
                // let matchedDonut = matrix[i][j];
                // console.log('i, j', i, j, matrix[i][j]);
                matchMap[i][j] = matrix[i][j];
            }
        }
    }
    // console.log('completed match map', matchMap);

    killAll();
    setTimeout(function () {
        fallAll();
    }, C.FALL_DELAY);
    setTimeout(function () {
        respawnAll();
    }, C.RESPAWN_DELAY);
    resumeGame();
    // fallAll();
    // respawnAll();
}

function kill(i, j) {
    var killDonutTween = game.add.tween(matrix[i][j]).to({
        alpha: 0
    }, C.DESTROY_SPEED, Phaser.Easing.Linear.None, true);
    killDonutTween.onComplete.add(function (donut) {
        console.log('donut destroyed', i, j);
        donut.destroy();
    });
    matrix[i][j] = null;
}

function killAll() {
    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        for (var j = 0; j < C.DONUTS_NUMBER; j++) {
            if (matchMap[i][j] !== null) {
                kill(i, j);
            }
        }
    }
}

function fall(i0, j0) {
    var fallingFactor = 0; //how much holes donut should fall

    var _loop = function _loop(j) {
        var fallingDonut = matrix[i0][j];
        if (fallingDonut !== null) {
            var fallDonutTween = game.add.tween(fallingDonut).to({
                y: fallingDonut.y + C.DONUT_SIZE * fallingFactor
            }, C.FALL_SPEED, Phaser.Easing.Linear.None, true);
            fallDonutTween.onComplete.add(function (donut) {
                console.log('donut falling', i0, j);
            });
        } else {
            fallingFactor++;
        }
    };

    for (var j = j0; j >= 0; j--) {
        _loop(j);
    }
}

function fallAll() {
    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        var fallingHeight = getFallingHeight(i);
        console.log('fallingHeight', fallingHeight, "i:", i);
        for (var j = 0; j < C.DONUTS_NUMBER; j++) {
            if (fallingHeight) {
                fall(i, j);
            }
        }
    }
}

function getFallingHeight(i) {
    //Count how many holes donuts should fall
    return matrix[i].filter(function (donut) {
        return donut === null;
    }).length;
}

function respawn(i, j) {
    createDonut(i, j);
}

function respawnAll() {
    matrixCorrection();
    for (var i = 0; i < C.DONUTS_NUMBER; i++) {
        for (var j = 0; j < C.DONUTS_NUMBER; j++) {
            if (matrix[i][j] === null) {
                respawn(i, j);
            }
        }
    }
}

function matrixCorrection() {
    //Move all nulls in matrix to row start
    //TODO can I refactor this?
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
    var pointerY = pointer.y - _constants.OFFSET;
    var pointerX = pointer.x;
    if (inputEnabled) {
        var j = Math.floor(pointerY / _constants.DONUT_SIZE),
            i = Math.floor(pointerX / _constants.DONUT_SIZE);
        if (isInRange(i, j)) {
            var pointed = matrix[i][j];
            // console.log('i, j', i, j, pointed);
            /*if (isNull(selected)) {
                //if there no selected donut select it
                pointed.scale.setTo(1.2);
                pointed.bringToTop();
                selected = pointed;
                game.input.addMoveCallback(move, this);
            } else*/
            if (areSame(selected, pointed)) {
                //if pointed donut already select, clear selection
                selected.scale.setTo(1);
                selected = null;
            } else if (areNeighbors(selected, pointed)) {
                //if donuts are neighbors, swap them
                selected.scale.setTo(1);
                swap(selected, pointed);
            } else {
                //choose pointed donut
                pointed.scale.setTo(1.2);
                selected = pointed;
                game.input.addMoveCallback(move, this);
            }
        }
    }
}

function isInRange(i, j) {
    return i >= 0 && i < C.DONUTS_NUMBER && j >= 0 && j < C.DONUTS_NUMBER;
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
    game.input.deleteMoveCallback(move);
}

function move(event, pX, pY) {
    //action on pointer moving
    // console.log('move');
    if (event.id === 0) {
        var dX = pX - selected.x,
            dY = pY - selected.y,
            dI = 0,
            dJ = 0;
        if (Math.abs(dX) > C.HALF_DONUT_SIZE) {
            dJ = dX > 0 ? 1 : -1;
        } else if (Math.abs(dY) > C.HALF_DONUT_SIZE) {
            dI = dY > 0 ? 1 : -1;
        }
        if (dI !== -dJ) {
            //try to swap donuts
            var pointedI = getI(selected) + dI,
                pointedJ = getJ(selected) + dJ;
            if (isInRange(pointedI, pointedJ)) {
                var pointed = matrix[pointedI][pointedJ];
                selected.scale.setTo(1);
                swap(selected, pointed, true);
                game.input.deleteMoveCallback(move);
            }
        }
    }
}

function swap() {
    console.log('swap!');
}

function pauseGame() {
    inputEnabled = false;
    timer.pause();
}

function resumeGame() {
    inputEnabled = true;
    timer.resume();
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

function timeUp() {
    console.log('time up!');
    timer.stop();
    /*inputEnabled = false;
    let timeup = game.add.image(C.GAME_WIGTH / 2, C.GAME_HEIGHT / 2, 'text-timeup');
    timeup.anchor.set(0.5);
    showGameOver();*/
}

function showGameOver() {
    var gameOver = game.add.text(C.GAME_WIGTH / 2, C.GAME_HEIGHT / 2 + 300, "Game is over, your score is " + score, {
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

},{"./constants":1}]},{},[2])
//# sourceMappingURL=game.js.map
