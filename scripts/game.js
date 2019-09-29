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

var DESTROY_SPEED = exports.DESTROY_SPEED = 100;
var SWAP_SPEED = exports.SWAP_SPEED = 100;
var FALL_SPEED = exports.FALL_SPEED = 100;

},{}],2:[function(require,module,exports){
'use strict';

var _GameState = require('src/states/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

var _constants = require('./constants');

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, _constants.GAME_WIGTH, _constants.GAME_HEIGHT, Phaser.AUTO, 'match3', null));

		_this.state.add('GameState', _GameState2.default, false);
		_this.state.start('GameState');
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"./constants":1,"src/states/GameState":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _constants = require('../constants');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GameState = function (_Phaser$State) {
    _inherits(GameState, _Phaser$State);

    function GameState() {
        _classCallCheck(this, GameState);

        return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
    }

    _createClass(GameState, [{
        key: 'preload',
        value: function preload() {
            this.load.image('bg-score', 'assets/images/bg-score.png');
            this.load.image('big-shadow', 'assets/images/big-shadow.png');
            this.load.image('btn-play', 'assets/images/btn-play.png');
            this.load.image('btn-sfx', 'assets/images/btn-sfx.png');
            this.load.image('donut', 'assets/images/donut.png');
            this.load.image('donuts_logo', 'assets/images/donuts_logo.png');
            this.load.image('text-timeup', 'assets/images/text-timeup.png');

            this.game.load.image('background', 'assets/images/backgrounds/background.jpg');

            this.load.image('gem-01', 'assets/images/game/gem-01.png');
            this.load.image('gem-02', 'assets/images/game/gem-02.png');
            this.load.image('gem-03', 'assets/images/game/gem-03.png');
            this.load.image('gem-04', 'assets/images/game/gem-04.png');
            this.load.image('gem-05', 'assets/images/game/gem-05.png');
            this.load.image('gem-06', 'assets/images/game/gem-06.png');
            this.load.image('gem-07', 'assets/images/game/gem-07.png');
            this.load.image('gem-08', 'assets/images/game/gem-08.png');
            this.load.image('gem-09', 'assets/images/game/gem-09.png');
            this.load.image('gem-10', 'assets/images/game/gem-10.png');
            this.load.image('gem-11', 'assets/images/game/gem-11.png');
            this.load.image('gem-12', 'assets/images/game/gem-12.png');
            this.load.image('hand', 'assets/images/game/hand.png');
            this.load.image('shadow', 'assets/images/game/shadow.png');

            this.load.image('particle-1', 'assets/images/particles/particle-1.png');
            this.load.image('particle-2', 'assets/images/particles/particle-2.png');
            this.load.image('particle-3', 'assets/images/particles/particle-3.png');
            this.load.image('particle-4', 'assets/images/particles/particle-4.png');
            this.load.image('particle-5', 'assets/images/particles/particle-5.png');
            this.load.image('particle_ex1', 'assets/images/particles/particle_ex1.png');
            this.load.image('particle_ex2', 'assets/images/particles/particle_ex2.png');
            this.load.image('particle_ex3', 'assets/images/particles/particle_ex3.png');

            this.load.audio('backgroundMp3', 'assets/audio/background.mp3');
        }
    }, {
        key: 'create',
        value: function create() {
            //Add background
            var background = this.add.sprite(0, 0, 'background');
            background.angle = 90;
            background.x = _constants.GAME_WIGTH;

            this.createMainMenu();
        }
    }, {
        key: 'createMainMenu',
        value: function createMainMenu() {
            var _this2 = this;

            this.mainMenu = this.add.group();

            var donutsLogo = this.add.image(_constants.GAME_WIGTH / 2, 0, 'donuts_logo');
            donutsLogo.anchor.setTo(0.5, 0);
            this.mainMenu.add(donutsLogo);

            var playBtn = this.add.button(_constants.GAME_WIGTH / 2, _constants.GAME_HEIGHT / 2, 'btn-play', function () {
                return _this2.startGame();
            });
            playBtn.anchor.setTo(0.5);
            this.mainMenu.add(playBtn);
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            this.mainMenu.destroy();

            //inputEnabled: contain state - swaping donuts allowed or not
            this.inputEnabled = true;

            this.fastFall = false;

            //matrix contain image of game board
            this.matrix = [];

            //list of items for remove
            this.remove = [];

            //Add score
            this.score = 0;

            //Add timer;
            this.timer = this.time.create(true);
            this.timer.loop(10000, this.timeUp, this);
            this.timer.start();

            //Reset target and selected donuts
            this.selected = _constants.DEFAULT_SELECTED_OBJ;
            this.target = _constants.DEFAULT_SELECTED_OBJ;

            //Add UI elemetns
            this.createUI();

            //build board with donuts
            this.createDonuts();
            if (this.matchAll()) {
                this.handleMatches();
            }

            //bind events on mouse btn up and down
            this.input.onDown.add(this.onSelect, this);
            this.input.onUp.add(this.onRelease, this);

            console.log(this.donuts);
        }
    }, {
        key: 'createUI',
        value: function createUI() {
            var _this3 = this;

            var bgScore = this.add.image(_constants.GAME_WIGTH / 2, 0, 'bg-score');
            bgScore.anchor.setTo(0.5, 0);
            // bgScore.x = GAME_WIGTH / 2;

            this.textScore = this.add.text(_constants.GAME_WIGTH / 2 + 120, 60, this.score, {
                font: "65px Arial",
                fill: "#ffe6b3",
                align: "right"
            });
            this.textScore.anchor.setTo(1, 0);
            // textScore.x = GAME_WIGTH / 2 + 120;

            /*//score counter quick test
            setInterval(() => {
                this.score++;
                textScore.text = this.score;
            }, 1000);*/

            //Add timer
            var timer = this.add.text(_constants.GAME_WIGTH - 50, 60, GameState.showTimeInSeconds(this.timer), { font: "65px Arial", fill: "#6397ff", align: "right" });
            timer.anchor.set(1, 0);
            setInterval(function () {
                timer.text = GameState.showTimeInSeconds(_this3.timer);
            }, 100);
            // console.log('this.timer.duration',this.timer.duration);
        }
    }, {
        key: 'createDonuts',
        value: function createDonuts() {
            this.donuts = this.add.group();

            for (var i = 0; i < _constants.DONUTS_NUMBER; i++) {
                this.matrix[i] = [];
                for (var j = 0; j < _constants.DONUTS_NUMBER; j++) {
                    var donutImage = GameState.getRandomDonut();
                    var donut = this.donuts.create(i * _constants.DONUT_SIZE, j * _constants.DONUT_SIZE, donutImage);
                    donut.anchor.set(0.5);

                    this.matrix[i][j] = donut;
                }
            }
            this.donuts.x = _constants.HALF_DONUT_SIZE;
            this.donuts.y = _constants.OFFSET + _constants.HALF_DONUT_SIZE;
        }
    }, {
        key: 'onSelect',
        value: function onSelect(pointer) {
            // console.log('selected', pointer);
            var pointerY = pointer.y - _constants.OFFSET;
            var pointerX = pointer.x;
            if (this.inputEnabled) {
                var j = Math.floor(pointerY / _constants.DONUT_SIZE),
                    i = Math.floor(pointerX / _constants.DONUT_SIZE),
                    pointed = this.getFromMatrix(i, j);
                // console.log('pointed', i, j, pointed);
                if (pointed !== -1) {
                    // console.log('this.selected',this.selected.donut);
                    if (this.selected.donut === null) {
                        // console.log('this.selected.donut === null');
                        pointed.scale.setTo(1.2);
                        pointed.bringToTop();
                        this.selected.donut = pointed;
                        this.input.addMoveCallback(this.move, this);
                    } else {
                        if (this.areSame(pointed, this.selected.donut)) {
                            this.selected.donut.scale.setTo(1);
                            this.selected.donut = null;
                        } else {
                            if (this.areNext(pointed, this.selected.donut)) {
                                this.selected.donut.scale.setTo(1);
                                this.swap(this.selected.donut, pointed, true);
                            } else {
                                this.selected.donut.scale.setTo(1);
                                pointed.scale.setTo(1.2);
                                this.selected.donut = pointed;
                                this.input.addMoveCallback(this.move, this);
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: 'areNext',
        value: function areNext(donut1, donut2) {
            return Math.abs(this.getRow(donut1) - this.getRow(donut2)) + Math.abs(this.getCol(donut1) - this.getCol(donut2)) === 1;
        }
    }, {
        key: 'areSame',
        value: function areSame(donut1, donut2) {
            return this.getRow(donut1) === this.getRow(donut2) && this.getCol(donut1) === this.getCol(donut2);
        }
    }, {
        key: 'getRow',
        value: function getRow(donut) {
            return Math.floor(donut.y / _constants.DONUT_SIZE);
        }
    }, {
        key: 'getCol',
        value: function getCol(donut) {
            return Math.floor(donut.x / _constants.DONUT_SIZE);
        }
    }, {
        key: 'onRelease',
        value: function onRelease() {
            // console.log('released');
            this.input.deleteMoveCallback(this.move, this);
        }
    }, {
        key: 'move',
        value: function move(event, pX, pY) {
            console.log('move');
            if (event.id === 0) {
                var dX = pX - this.selected.donut.x,
                    dY = pY - this.selected.donut.y,
                    dI = 0,
                    dJ = 0;
                if (Math.abs(dX) > _constants.HALF_DONUT_SIZE) {
                    //TODO: refactor this
                    if (dX > 0) {
                        dJ = 1;
                    } else {
                        dJ = -1;
                    }
                } else {
                    if (Math.abs(dY) > _constants.HALF_DONUT_SIZE) {
                        if (dY > 0) {
                            dI = 1;
                        } else {
                            dI = -1;
                        }
                    }
                }
                if (dI + dJ !== 0) {
                    var pointed = this.getFromMatrix(this.getRow(this.selected.donut) + dI, this.getCol(this.selected.donut) + dJ);
                    console.log('pointed', pointed, 'selected', this.selected.donut);
                    if (pointed !== -1) {
                        this.selected.donut.scale.setTo(1);
                        // console.log('pointed', pointed, 'selected', this.selected.donut);
                        // this.swap(this.selected.donut, pointed, true);
                        this.swap(pointed, this.selected, true);
                        this.input.deleteMoveCallback(this.move, this);
                    }
                }
            }
        }
    }, {
        key: 'swap',
        value: function swap(donut1, donut2, swapBack) {
            var _this4 = this;

            // console.log('swap');

            // this.inputEnabled = false;
            this.pauseGame();
            var fromColor = donut1.key;
            var fromSprite = donut1;
            var toColor = donut2.key;
            var toSprite = donut2;
            // this.matrix[this.getRow(donut1)][this.getCol(donut1)].key = toColor;
            this.matrix[this.getRow(donut1)][this.getCol(donut1)] = donut2;
            // this.matrix[this.getRow(donut2)][this.getCol(donut2)].key = fromColor;
            this.matrix[this.getRow(donut2)][this.getCol(donut2)] = donut1;
            var donut1Tween = this.add.tween(this.matrix[this.getRow(donut1)][this.getCol(donut1)]).to({
                x: this.getCol(donut1) * _constants.DONUT_SIZE /*+ HALF_DONUT_SIZE*/
                , y: this.getRow(donut1) * _constants.DONUT_SIZE /*+ HALF_DONUT_SIZE*/
            }, _constants.SWAP_SPEED, Phaser.Easing.Linear.None, true);
            var donut2Tween = this.add.tween(this.matrix[this.getRow(donut2)][this.getCol(donut2)]).to({
                x: this.getCol(donut2) * _constants.DONUT_SIZE /*+ HALF_DONUT_SIZE*/
                , y: this.getRow(donut2) * _constants.DONUT_SIZE /*+ HALF_DONUT_SIZE*/
            }, _constants.SWAP_SPEED, Phaser.Easing.Linear.None, true);

            donut2Tween.onComplete.add(function () {
                // this.inputEnabled = true;

                if (!_this4.matchAll() && swapBack) {
                    _this4.swap(donut1, donut2, false);
                } else {
                    if (_this4.matchAll()) {
                        _this4.handleMatches();
                        _this4.updateTimer(2);
                        _this4.updateScore();
                    } else {
                        _this4.resumeGame();
                        _this4.selected.donut = null;
                    }
                }
                // this.resumeGame();
            });
        }
    }, {
        key: 'matchByRow',
        value: function matchByRow(i, j) {
            //TODO: rework conditions
            return this.getFromMatrix(i, j).key === this.getFromMatrix(i, j - 1).key && this.getFromMatrix(i, j).key === this.getFromMatrix(i, j - 2).key;
        }
    }, {
        key: 'matchByColumn',
        value: function matchByColumn(i, j) {
            //TODO: rework conditions

            return this.getFromMatrix(i, j).key === this.getFromMatrix(i - 1, j).key && this.getFromMatrix(i, j).key === this.getFromMatrix(i - 2, j).key;
        }
    }, {
        key: 'match',
        value: function match(i, j) {
            //TODO: collect all matches in one method if other don't use as single
            return this.matchByRow(i, j) || this.matchByColumn(i, j);
        }
    }, {
        key: 'matchAll',
        value: function matchAll() {
            for (var i = 0; i < _constants.DONUTS_NUMBER; i++) {
                for (var j = 0; j < _constants.DONUTS_NUMBER; j++) {
                    if (this.match(i, j)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }, {
        key: 'handleMatches',
        value: function handleMatches() {
            /*console.log('this.remove', this);
            console.log('this.remove', this.remove);*/
            this.remove = [];
            for (var i = 0; i < _constants.DONUTS_NUMBER; i++) {
                this.remove[i] = [];
                for (var j = 0; j < _constants.DONUTS_NUMBER; j++) {
                    this.remove[i].push(0);
                }
            }
            this.handleHorizontalMatches();
            this.handleVerticalMatches();
            this.destroy();
        }
    }, {
        key: 'handleVerticalMatches',
        value: function handleVerticalMatches() {
            for (var i = 0; i < _constants.DONUTS_NUMBER; i++) {
                var colorStreak = 1;
                var currentColor = '';
                var startStreak = 0;
                for (var j = 0; j < _constants.DONUTS_NUMBER; j++) {
                    if (this.getFromMatrix(j, i).key === currentColor) {
                        colorStreak++;
                    }
                    if (this.getFromMatrix(j, i).key !== currentColor || j === _constants.DONUTS_NUMBER - 1) {
                        if (colorStreak >= 3) {
                            // console.log("VERTICAL :: Length = " + colorStreak + " :: Start = (" + startStreak + "," + i + ") :: Color = " + currentColor);
                            for (var k = 0; k < colorStreak; k++) {
                                this.remove[startStreak + k][i]++;
                            }
                        }
                        startStreak = j;
                        colorStreak = 1;
                        currentColor = this.getFromMatrix(j, i).key;
                    }
                }
            }
        }
    }, {
        key: 'handleHorizontalMatches',
        value: function handleHorizontalMatches() {
            for (var i = 0; i < _constants.DONUTS_NUMBER; i++) {
                var colorStreak = 1;
                var currentColor = '';
                var startStreak = 0;
                for (var j = 0; j < _constants.DONUTS_NUMBER; j++) {
                    if (this.getFromMatrix(j, i).key === currentColor) {
                        colorStreak++;
                    }
                    if (this.getFromMatrix(j, i).key !== currentColor || j === _constants.DONUTS_NUMBER - 1) {
                        if (colorStreak >= 3) {
                            // console.log("HORIZONTAL :: Length = " + colorStreak + " :: Start = (" + i + "," + startStreak + ") :: Color = " + currentColor);
                            for (var k = 0; k < colorStreak; k++) {
                                this.remove[i][startStreak + k]++;
                            }
                        }
                        startStreak = j;
                        colorStreak = 1;
                        currentColor = this.getFromMatrix(j, i).key;
                    }
                }
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var _this5 = this;

            console.log('destroying');
            console.log('this.remove', this.remove);
            var destroyed = 0;
            for (var i = 0; i < _constants.DONUTS_NUMBER; i++) {
                for (var j = 0; j < _constants.DONUTS_NUMBER; j++) {
                    if (this.remove[i][j] > 0) {
                        console.log('this.remove[i][j]', this.remove[i][j], i, j);
                        var destroyTween = this.add.tween(this.matrix[i][j]).to({
                            alpha: 0
                        }, _constants.DESTROY_SPEED, Phaser.Easing.Linear.None, true);
                        destroyed++;
                        destroyTween.onComplete.add(function (donut) {
                            donut.destroy();
                            destroyed--;
                            if (destroyed === 0) {
                                _this5.fall();
                                /*if (this.fastFall) {
                                    this.respawn();
                                }*/
                            }
                        });
                        this.matrix[i][j] = null;
                    }
                }
            }
        }
    }, {
        key: 'fall',
        value: function fall() {
            var _this6 = this;

            var fallen = 0;
            var restart = false;
            for (var i = _constants.DONUTS_NUMBER - 1; i >= 0; i--) {
                for (var j = 0; j < _constants.DONUTS_NUMBER; j++) {
                    if (this.matrix[i][j] != null) {
                        var fallTiles = this.holesBelow(i, j);
                        if (fallTiles > 0) {
                            if (!this.fastFall && fallTiles > 1) {
                                fallTiles = 1;
                                restart = true;
                            }
                            var donut2Tween = this.add.tween(this.matrix[i][j]).to({
                                y: this.matrix[i][j].y + fallTiles * _constants.DONUT_SIZE
                            }, _constants.FALL_SPEED, Phaser.Easing.Linear.None, true);
                            fallen++;
                            donut2Tween.onComplete.add(function () {
                                fallen--;
                                if (fallen === 0) {
                                    if (restart) {
                                        _this6.fall();
                                    } else {
                                        /*if (!this.fastFall) {
                                            this.respawn();
                                        }*/
                                    }
                                }
                            });
                            this.matrix[i + fallTiles][j] = this.matrix[i][j];
                            this.matrix[i][j] = null;
                        }
                    }
                }
            }
            if (fallen === 0) {
                // this.respawn();
            }
        }
    }, {
        key: 'respawn',
        value: function respawn() {
            var _this7 = this;

            var replenished = 0;
            var restart = false;
            for (var j = 0; j < _constants.DONUTS_NUMBER; j++) {
                var emptySpots = this.holesInCol(j);
                if (emptySpots > 0) {
                    if (!this.fastFall && emptySpots > 1) {
                        emptySpots = 1;
                        restart = true;
                    }
                    for (var i = 0; i < emptySpots; i++) {
                        var donut = this.donuts.create(_constants.DONUT_SIZE * j + _constants.DONUT_SIZE / 2, -(_constants.DONUT_SIZE * (emptySpots - 1 - i) + _constants.DONUT_SIZE / 2), GameState.getRandomDonut());
                        donut.anchor.set(0.5);
                        this.donuts.add(donut);
                        this.matrix[i][j] = donut;

                        var donut2Tween = this.add.tween(this.matrix[i][j]).to({
                            y: _constants.DONUT_SIZE * i + _constants.HALF_DONUT_SIZE + _constants.OFFSET
                        }, _constants.FALL_SPEED, Phaser.Easing.Linear.None, true);
                        replenished++;
                        donut2Tween.onComplete.add(function () {
                            replenished--;
                            if (replenished === 0) {
                                if (restart) {
                                    _this7.fall();
                                } else {
                                    if (_this7.matchAll()) {
                                        _this7.time.events.add(250, _this7.handleMatches);
                                    } else {
                                        _this7.resumeGame();
                                        _this7.selected.donut = null;
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
    }, {
        key: 'holesBelow',
        value: function holesBelow(row, col) {
            var result = 0;
            for (var i = row + 1; i < _constants.DONUTS_NUMBER; i++) {
                if (this.matrix[i][col] === null) {
                    result++;
                }
            }
            return result;
        }
    }, {
        key: 'holesInCol',
        value: function holesInCol(col) {
            var result = 0;
            for (var i = 0; i < _constants.DONUTS_NUMBER; i++) {
                if (this.matrix[i][col] === null) {
                    result++;
                }
            }
            return result;
        }
    }, {
        key: 'getFromMatrix',
        value: function getFromMatrix(i, j) {
            //TODO: rework conditions
            if (i < 0 || i >= _constants.DONUTS_NUMBER || j < 0 || j >= _constants.DONUTS_NUMBER) {
                return -1;
            }
            return this.matrix[i][j];
        }
    }, {
        key: 'pauseGame',
        value: function pauseGame() {
            this.inputEnabled = false;
            this.timer.pause();
        }
    }, {
        key: 'resumeGame',
        value: function resumeGame() {
            this.inputEnabled = true;
            this.timer.resume();
        }
    }, {
        key: 'updateScore',
        value: function updateScore() {
            this.score++;
            this.textScore.text = this.score;
        }
    }, {
        key: 'updateTimer',
        value: function updateTimer(seconds) {
            var newDuration = this.timer.duration + seconds * 1000;
            this.timer.stop();
            this.timer.loop(newDuration, this.timeUp, this);
            this.timer.start();
        }
    }, {
        key: 'timeUp',
        value: function timeUp() {
            console.log('time up!');
            this.timer.stop();
            this.inputEnabled = false;
            var timeup = this.add.image(_constants.GAME_WIGTH / 2, _constants.GAME_HEIGHT / 2, 'text-timeup');
            timeup.anchor.set(0.5);
            this.showGameOver();
        }
    }, {
        key: 'showGameOver',
        value: function showGameOver() {
            var gameOver = this.add.text(_constants.GAME_WIGTH / 2, _constants.GAME_HEIGHT / 2 + 300, 'Game is over, your score is ' + this.score, { font: "65px 700 Arial", fill: "#2b0203", align: "right" });
            gameOver.anchor.set(0.5);
        }
    }], [{
        key: 'showTimeInSeconds',
        value: function showTimeInSeconds(timer) {
            return Math.ceil(timer.duration / 1000);
        }
    }, {
        key: 'getRandomDonut',
        value: function getRandomDonut() {
            var randomDonut = Math.floor(Math.random() * _constants.DONUTS.length);
            return _constants.DONUTS[randomDonut];
        }
    }]);

    return GameState;
}(Phaser.State);

exports.default = GameState;

},{"../constants":1}]},{},[2])
//# sourceMappingURL=game.js.map
