/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./../web/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _logger = __webpack_require__(1);

	var _logger2 = _interopRequireDefault(_logger);

	var _game = __webpack_require__(2);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _logger2.default)(); // yes

	$(function () {
	    var colony24 = void 0;

	    // Initialisation du jeu

	    colony24 = new _game2.default(userData, shop_equipement);
	});
	console.log('app loaded');

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    console.log('logger.js is RUNNING!!');
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _wallet = __webpack_require__(3);

	var _wallet2 = _interopRequireDefault(_wallet);

	var _boat = __webpack_require__(4);

	var _boat2 = _interopRequireDefault(_boat);

	var _map = __webpack_require__(6);

	var _map2 = _interopRequireDefault(_map);

	var _ranking = __webpack_require__(12);

	var _ranking2 = _interopRequireDefault(_ranking);

	var _boatShop = __webpack_require__(7);

	var _boatShop2 = _interopRequireDefault(_boatShop);

	var _equipementShop = __webpack_require__(9);

	var _equipementShop2 = _interopRequireDefault(_equipementShop);

	var _inventory = __webpack_require__(11);

	var _inventory2 = _interopRequireDefault(_inventory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	    function Game(config, shop_equipement) {
	        _classCallCheck(this, Game);

	        this.name = config.name;
	        // Launch map
	        this.map = new _map2.default();

	        // Creation de la wallet
	        this.wallet = new _wallet2.default(Number(config.wallet.gold), Number(config.wallet.ecu));

	        // Creation des bateaux
	        this.boats = {};

	        var boat = null;

	        this.id = 0;

	        for (boat in config.boats) {
	            if (config.boats.hasOwnProperty(boat)) {
	                this.boats[this.id] = new _boat2.default(config.boats[boat], this.id);
	                this.id = this.boats[this.id].id;
	                this.id++;
	            }
	        }

	        // Creation de main Harbor
	        this.mainHarbor = {};

	        // Creation du shop
	        this.mainHarbor.shop = {};
	        this.mainHarbor.shop.equipement = {};

	        for (var i = 0; i < 1; i++) {
	            this.mainHarbor.shop['button ' + i] = new _boatShop2.default(this.id);
	            this.mainHarbor.shop.equipement = new _equipementShop2.default(this.id, shop_equipement);
	        }

	        console.log(this);

	        this.inventory = new _inventory2.default();

	        // Creation des références au parent dans les enfants

	        this.setBoatParent(this);

	        this.setWalletParent(this);

	        this.setShopParent(this);

	        this.saveDataJson(this);
	    }

	    // crée une référence au parent dans tous les enfants de bateau


	    _createClass(Game, [{
	        key: 'setBoatParent',
	        value: function setBoatParent(o) {
	            if (o.boats != undefined) {

	                var n = null;
	                for (n in o.boats) {

	                    o.boats[n].parent = o;
	                    this.setBoatParent(o.boats[n]);
	                }
	            }
	        }

	        // crée une référence au parent dans tous les enfants de wallet

	    }, {
	        key: 'setWalletParent',
	        value: function setWalletParent(o) {
	            if (o.wallet != undefined) {

	                o.wallet.parent = o;
	            }
	        }

	        // crée une référence au parent dans tous les enfants de shop

	    }, {
	        key: 'setShopParent',
	        value: function setShopParent(o) {
	            if (o.mainHarbor.shop != undefined) {

	                var n = null;
	                for (n in o.mainHarbor.shop) {

	                    o.mainHarbor.shop[n].parent = o;
	                    this.setBoatParent(o.mainHarbor.shop[n]);
	                }
	            }
	        }

	        // fonction pour sauvegarder l'objet du joueur dans son json approprié

	    }, {
	        key: 'saveDataJson',
	        value: function saveDataJson(o) {

	            // premièrement dans cette fonction on va devoir enlever toutes les références au parent dans les enfants
	            // donc on fait la même chose que dans les setParent, sauf qu'on delete les propriétés au lieu de les crées

	            if (o.boats != undefined) {

	                var n = null;
	                for (n in o.boats) {

	                    delete o.boats[n].parent;
	                    delete o.boats[n].$el;
	                }
	            }
	            if (o.wallet != undefined) {

	                delete o.wallet.parent;
	            }
	            if (o.mainHarbor.shop != undefined) {

	                delete o.mainHarbor.shop;
	            }

	            // ensuite on peut lancer la requete du fichier update_json_model.php

	            $.ajaxSetup({
	                async: false
	            });

	            $.post('', {
	                player: o
	            });

	            $.ajaxSetup({
	                async: true
	            });

	            this.setBoatParent(this);

	            this.setWalletParent(this);

	            this.setShopParent(this);
	        }
	    }]);

	    return Game;
	}();

	exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Wallet = function () {
	    function Wallet(gold, ecu) {
	        _classCallCheck(this, Wallet);

	        this.goldValue = 1.2; //SQL GOLD VALUE A INTEGRER
	        this.gold = gold;
	        this.ecu = ecu;

	        // Selection des <p> pour render les golds et écus
	        this.$gold = document.getElementById.bind(document, 'gold');
	        this.$ecu = document.getElementById.bind(document, 'ecu');

	        this.renderWallet();

	        console.log('[[WALLET]] goldValue is ' + this.goldValue + ' \n[[WALLET]] gold is ' + this.gold + ' \n[[WALLET]] ecu is ' + this.ecu + ' \n');
	    }

	    //Gold convert to Ecu


	    _createClass(Wallet, [{
	        key: 'convertGoldEcu',
	        value: function convertGoldEcu(goldChange) {
	            console.log('[[WALLET convertGoldToEcu()]] In Wallet > ' + this.ecu + ' ecu & ' + this.gold + ' gold & ' + this.goldValue + ' goldValue\n');
	            if (this.gold >= goldChange) {
	                console.log('[[WALLET convertGoldToEcu()]] You convert ' + goldChange + ' gold to ecu with a ' + this.goldValue + ' Value Gold \n');
	                this.gold -= goldChange;
	                this.ecu += goldChange * this.goldValue;
	                console.log('[[WALLET convertGoldToEcu()]] You have now ' + this.ecu + ' ecu and ' + this.gold + ' gold\n');
	            } else console.log('[[WALLET convertGoldToEcu()]] you are missing ' + (goldChange - this.gold) + ' to complete this transaction\n');
	        }

	        // actualise l'affichage des golds et écus dans le DOM

	    }, {
	        key: 'renderWallet',
	        value: function renderWallet() {
	            this.$gold().innerHTML = this.gold;
	            this.$ecu().innerHTML = this.ecu;
	        }
	    }]);

	    return Wallet;
	}();

	exports.default = Wallet;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _boats = __webpack_require__(5);

	var _boats2 = _interopRequireDefault(_boats);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Boat = function (_Boats) {
	    _inherits(Boat, _Boats);

	    function Boat(boat, id) {
	        _classCallCheck(this, Boat);

	        var _this = _possibleConstructorReturn(this, (Boat.__proto__ || Object.getPrototypeOf(Boat)).call(this, boat, id));

	        _this.$el = $("ul#boats");

	        _this.create_boat_button();

	        $('li#li' + id).on('click', 'input[type=\'button\']', { that: _this }, function (e) {

	            var context = e.data.that;

	            console.log(context);

	            var inputX = $('#li' + context.id + ' > div > input:nth-child(2)').val();
	            var inputY = $('#li' + context.id + ' > div > input:nth-child(3)').val();

	            if (inputX != 0 || inputY != 0) {
	                e.data.that.movement(inputY, inputX);
	                $('#li' + context.id + ' > div > p').html(context.name + ' x:' + context.x + ' y:' + context.y);
	            }
	        });
	        return _this;
	    }

	    _createClass(Boat, [{
	        key: 'create_boat_button',
	        value: function create_boat_button() {
	            this.$el.append('\n            <li id="li' + this.id + '" style="display: inline-block">\n                <div>\n                    <p style="width: 30%; margin: 0 auto">' + this.name + ' x:' + this.x + ' y:' + this.y + '</p>\n                    <input style="width: 45%; margin: 0 auto" type="number" placeholder="x"/>\n                    <input style="width: 45%; margin: 0 auto" type="number" placeholder="y"/>\n                    <input type="button" value="Move"/>\n                </div>\n            </li>\n        ');
	        }
	    }]);

	    return Boat;
	}(_boats2.default);

	exports.default = Boat;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Boats = function () {
	    function Boats() {
	        var boat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { name: "Bateau", structure: 100, blindage: 50, capacite: 50, poids: 10, stockage: 0, x: 0, y: 0 };
	        var id = arguments[1];

	        _classCallCheck(this, Boats);

	        // Boats ici on crée automatiquement les propriétés de notre objet bateau et on vérifie si le type
	        // des propriétés doit être un number ou non
	        var property = null;
	        for (property in boat) {
	            if (boat.hasOwnProperty(property)) {
	                if (!Number.isNaN(Number(boat[property]))) {

	                    this[property] = Number(boat[property]);
	                } else {

	                    this[property] = boat[property];
	                }
	            }
	        }
	        this.id = id;
	    }

	    _createClass(Boats, [{
	        key: 'movement',
	        value: function movement() {
	            var positionY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	            var positionX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


	            var map = this.parent.map.map;

	            if (typeof positionY == 'string') {
	                positionY = Number(positionY);
	            }
	            if (typeof positionX == 'string') {
	                positionX = Number(positionX);
	            }

	            if (positionY >= 0 && positionX >= 0 && positionY <= 9 && positionX <= 9) {
	                // Ici, I correspond à une île, à modifier selon la vraie map
	                if (map[positionY][positionX] != "I") {
	                    // Modification de la position du bateau
	                    this.y = positionY;
	                    this.x = positionX;
	                    console.log("Votre bateau est maintenant en " + this.y + " - " + this.x);
	                    this.goldMining(map);
	                } else {
	                    console.log("Colision avec une île");
	                }
	            } else {
	                // Empêche de sortir de la map - ici défini en 10x10
	                console.log("Votre bateau ne peut s'aventurer aussi loin");
	            }
	        }
	    }, {
	        key: 'goldMining',
	        value: function goldMining(map) {
	            // Ici, G correspond à de l'or, à modifier selon la vraie map
	            if (map[this.y][this.x] == "G") {
	                if (this.stockage <= 2) {
	                    this.stockage++;
	                    console.log("Vous avez extrait de l'Or en : " + this.y + " - " + this.x);
	                    this.parent.saveDataJson(this.parent);
	                    if (this.stockage == 2) {
	                        this.parent.saveDataJson(this.parent);
	                        this.returnHome();
	                    }
	                }
	            } else {
	                console.log("Il n'y a pas d'Or en : " + this.y + " - " + this.x);
	                this.parent.saveDataJson(this.parent);
	            }
	        }
	    }, {
	        key: 'returnHome',
	        value: function returnHome() {
	            this.y = 0;
	            this.x = 0;
	            console.log("Votre bateau est retourner à Main Harbor pour vider son stockage ");
	            this.parent.wallet.gold += this.stockage;
	            this.parent.wallet.renderWallet();
	            console.log("Vous avez maintenant : " + this.parent.wallet.gold + " d'Or");
	            this.stockage = 0;
	            this.parent.wallet.renderWallet();
	            this.parent.saveDataJson(this.parent);
	        }
	    }]);

	    return Boats;
	}();

	exports.default = Boats;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Map = function () {
	    function Map() {
	        _classCallCheck(this, Map);

	        this.map = [["_", "_", "_", "_", "_", "_", "_", "_", "_", "_"], ["_", "G", "_", "_", "G", "_", "_", "_", "_", "_"], ["_", "_", "_", "I", "_", "_", "_", "_", "I", "_"], ["_", "_", "_", "_", "_", "_", "_", "G", "_", "_"], ["_", "_", "I", "_", "_", "_", "_", "_", "_", "_"], ["_", "_", "_", "_", "_", "_", "_", "I", "_", "_"], ["I", "_", "_", "_", "_", "_", "_", "_", "_", "G"], ["_", "G", "_", "G", "_", "I", "_", "_", "_", "I"], ["_", "_", "_", "_", "_", "_", "_", "G", "_", "_"], ["_", "_", "I", "_", "_", "_", "_", "_", "I", "_"]];

	        /*this.displayMap(this.map);*/
	    }

	    _createClass(Map, [{
	        key: "displayMap",
	        value: function displayMap(map) {
	            //vérifier map
	            if (Array.isArray(map) == false) {
	                console.error("crash de la fonction 11");
	            } else {
	                var _console;

	                //afficher les couleurs
	                var Chaine = "";
	                var map_couleur = [];
	                for (var i = 0; i < map.length; i++) {
	                    for (var j = 0; j < map[i].length; j++) {
	                        if (map[i][j] === "_") {
	                            map_couleur.push("background: blue");
	                        } else if (map[i][j] === "G") {
	                            map_couleur.push("background: yellow");
	                        } else if (map[i][j] === "P") {
	                            map_couleur.push("background: black");
	                        } else if (map[i][j] === "I") {
	                            map_couleur.push("background: green");
	                        } else if (map[i][j] === "B") {
	                            map_couleur.push("background: red");
	                        } else {
	                            console.error("crash de la fonction");
	                            return 0;
	                        }
	                        Chaine += '%c   ';
	                    }
	                    Chaine += '\n';
	                }
	                (_console = console).log.apply(_console, [Chaine].concat(map_couleur));
	                return "La map a été affichée correctement";
	            }
	        }
	    }]);

	    return Map;
	}();

	exports.default = Map;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shop = __webpack_require__(8);

	var _shop2 = _interopRequireDefault(_shop);

	var _boat = __webpack_require__(4);

	var _boat2 = _interopRequireDefault(_boat);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BuyBoat = function (_Shop) {
	    _inherits(BuyBoat, _Shop);

	    function BuyBoat(id) {
	        _classCallCheck(this, BuyBoat);

	        var _this = _possibleConstructorReturn(this, (BuyBoat.__proto__ || Object.getPrototypeOf(BuyBoat)).call(this, id));

	        _this.id = id;
	        _this.$el = $("div#button-shop");

	        // On lance la propriété crée dans le parent shop.class.js
	        _this.create_button();

	        // On accroche un événement on click sur la div button-shop en passant en paramètre Boat,
	        // le context de la class BuyBoat et l'id du constructor
	        // On met ensuite en callback this.buy_boat
	        _this.$el.on('click', 'input[data-id=' + id + ']', { class: _boat2.default, that: _this, id: id }, _this.buy_boat);
	        return _this;
	    }

	    _createClass(BuyBoat, [{
	        key: 'buy_boat',
	        value: function buy_boat(e) {

	            // e correspond à l'object événement renvoyé par jQuery, il contient donc toutes les informations
	            // du DOM dont la position de la souris la touche préssée etc..
	            // jQuery nous crée un objet data dans tout ça qui contient nos paramètre
	            // class that et id
	            // Si j'envoie this en paramètre c'est pour une bonne raison
	            // le context this d'un événement jQuery est l'élément du DOM
	            // donc dans ce cas ci la div avec l'id button-shop
	            // j'avais donc ici besoin de pouvoir accéder a la référence au parent contenue dans l'objet BuyBoat

	            var data = e.data;
	            var parent = data.that.parent;

	            if (parent.wallet.ecu < 100) {

	                return console.log("Vous n'avez pas assez d'écu");
	            } else {

	                parent.boats[parent.id] = new data.class(undefined, parent.id);
	                parent.id++;
	                console.log(parent);
	                parent.wallet.ecu -= 100;
	                parent.wallet.renderWallet();
	                parent.saveDataJson(parent);

	                parent.wallet.renderWallet();

	                console.log(parent);
	            }
	        }
	    }]);

	    return BuyBoat;
	}(_shop2.default);

	exports.default = BuyBoat;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Shop = function () {
	    function Shop(id, shop_equipement) {
	        _classCallCheck(this, Shop);

	        this.$el = $('div#button-shop');

	        this.$el.on('click', 'input[data-type=Equipement]', function () {

	            var modal = document.getElementById('myModal');
	            var span = document.getElementsByClassName("close")[0];

	            //  Affiche la popup
	            modal.style.display = "block";

	            // Croix pour fermer la popup
	            span.onclick = function () {
	                modal.style.display = "none";
	            };
	            // Quand l'utilisateur clique en dehors de la popup, elle se ferme
	            window.onclick = function (event) {
	                if (event.target === modal) {
	                    modal.style.display = "none";
	                }
	            };
	        });
	    }

	    // propriété appelée dans boats.shop.class.js
	    // On crée deux boutons shop pour l'instant on laisse comme ça mais c'est nul il faut refactoriser


	    _createClass(Shop, [{
	        key: 'create_button',
	        value: function create_button() {
	            var button = '<input type=\'button\' data-id=\'' + this.id + '\' value=\'buy a boat\'/>';
	            this.$el.append(button);

	            var button_shop = '<input type=\'button\' data-type=\'Equipement\' id="myBtn" value=\'Shop\'/>';
	            this.$el.append(button_shop);
	        }
	    }]);

	    return Shop;
	}();

	exports.default = Shop;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _shop = __webpack_require__(8);

	var _shop2 = _interopRequireDefault(_shop);

	var _equipement = __webpack_require__(10);

	var _equipement2 = _interopRequireDefault(_equipement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ShopEquipement = function (_Shop) {
	    _inherits(ShopEquipement, _Shop);

	    function ShopEquipement(id, shop_equipement) {
	        _classCallCheck(this, ShopEquipement);

	        var _this = _possibleConstructorReturn(this, (ShopEquipement.__proto__ || Object.getPrototypeOf(ShopEquipement)).call(this, id, shop_equipement));

	        var $el = $(document.getElementById('equipement-model'));

	        var id_equip = 0;
	        var property = null;
	        for (property in shop_equipement) {
	            if (shop_equipement.hasOwnProperty(property)) {
	                _this[shop_equipement[property].Nom] = new _equipement2.default(shop_equipement[property], $el, id_equip);
	            }
	            $el.on('click', 'input[data-id-equip=' + id_equip + ']', { that: _this, id: id, equipement: shop_equipement[property] }, _this.buy_equip);
	            id_equip++;
	        }
	        console.log(_this);
	        return _this;
	    }

	    _createClass(ShopEquipement, [{
	        key: 'buy_equip',
	        value: function buy_equip(e) {
	            var parent = e.data.that.parent;
	            var wallet = parent.wallet;
	            var equipement = e.data.equipement;
	            var equipementName = equipement.Nom;
	            var price = equipement.Prix;

	            console.log(equipement);

	            if (wallet.ecu >= price) {

	                parent.inventory[equipementName] = equipement;
	                parent.wallet.ecu -= price;

	                wallet.renderWallet();
	            }
	        }
	    }]);

	    return ShopEquipement;
	}(_shop2.default);

	exports.default = ShopEquipement;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Equipement = function () {
	    function Equipement(equipement, $el, id_equip) {
	        _classCallCheck(this, Equipement);

	        $el.append('<li></li>');

	        var property = null;
	        for (property in equipement) {
	            if (equipement.hasOwnProperty(property)) {
	                if (equipement[property] != null) {
	                    this[property] = equipement[property];
	                    if (property != 'id' && property != 'Prix') {
	                        this.render_equipement($el, property, equipement[property]);
	                    }
	                    if (property == 'Prix') {
	                        $el.children().last().append('<input type="button" data-id-equip="' + id_equip + '" value="Acheter pour ' + equipement[property] + ' \xE9cus">');
	                    }
	                }
	            }
	        }
	    }

	    _createClass(Equipement, [{
	        key: 'render_equipement',
	        value: function render_equipement($el, property, equipement_property) {
	            $el.children().last().append('\n            <p>\n                ' + property + ' : ' + equipement_property + '\n            </p>\n        ');
	        }
	    }]);

	    return Equipement;
	}();

	exports.default = Equipement;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Inventory = function Inventory() {
	    _classCallCheck(this, Inventory);

	    this.name = 'Inventory';
	};

	exports.default = Inventory;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Ranking = function Ranking() {
	    _classCallCheck(this, Ranking);

	    // Get the modal
	    var modal = document.getElementById('modalPopup');

	    // Get the button that opens the modal
	    var btn = document.getElementById("button-classment");

	    // Get the <span> element that closes the modal
	    var span = document.getElementsByClassName("close")[0];

	    // When the user clicks the button, open the modal
	    btn.onclick = function () {
	        modal.style.display = "block";
	    };

	    // When the user clicks on <span> (x), close the modal
	    span.onclick = function () {
	        modal.style.display = "none";
	    };

	    // When the user clicks anywhere outside of the modal, close it
	    window.onclick = function (event) {
	        if (event.target == modal) {
	            modal.style.display = "none";
	        }
	    };
	};

	exports.default = Ranking;

/***/ })
/******/ ]);