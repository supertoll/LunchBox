"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _dom = _interopRequireDefault(require("dom7"));

var _bundle = _interopRequireWildcard(require("framework7/bundle"));

require("framework7/framework7-bundle.css");

require("../css/icons.css");

require("../css/app.styl");

var _cordovaApp = _interopRequireDefault(require("./cordova-app.js"));

var _routes = _interopRequireDefault(require("./routes.js"));

var _store = _interopRequireDefault(require("./store.js"));

var _app2 = _interopRequireDefault(require("../app.f7"));

var _globals = _interopRequireDefault(require("./globals"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import F7 Styles
// Import Icons and App Custom Styles
// Import Cordova APIs
// Import Routes
// Import Store
// Import main app component
var device = (0, _bundle.getDevice)();
var app = new _bundle["default"]({
  name: 'Lunchbox',
  // App name
  theme: 'auto',
  // Automatic theme detection
  autoDarkTheme: true,
  // Automatic DarkMode Detection
  darkTheme: false,
  el: '#app',
  // App root element
  component: _app2["default"],
  // App main component
  id: 'de.lunchbox',
  // App bundle ID
  // App store
  store: _store["default"],
  // App routes
  routes: _routes["default"],
  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false
  },
  on: {
    init: function init() {
      var f7 = this;

      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        _cordovaApp["default"].init(f7); //init all globals

      }
    }
  }
});