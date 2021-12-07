"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _home = _interopRequireDefault(require("../pages/home.f7"));

var _about = _interopRequireDefault(require("../pages/about.f7"));

var _form = _interopRequireDefault(require("../pages/form.f7"));

var _detail = _interopRequireDefault(require("../pages/detail.f7"));

var _dynamicRoute = _interopRequireDefault(require("../pages/dynamic-route.f7"));

var _requestAndLoad = _interopRequireDefault(require("../pages/request-and-load.f7"));

var _ = _interopRequireDefault(require("../pages/404.f7"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = [{
  path: '/',
  component: _home["default"]
}, {
  path: '/about/',
  component: _about["default"]
}, {
  path: '/form/',
  component: _form["default"]
}, {
  path: '/detail/:name',
  component: _detail["default"]
}, {
  path: '/dynamic-route/blog/:blogId/post/:postId/',
  component: _dynamicRoute["default"]
}, {
  path: '/request-and-load/user/:userId/',
  async: function async(_ref) {
    var router = _ref.router,
        to = _ref.to,
        resolve = _ref.resolve;
    // App instance
    var app = router.app; // Show Preloader

    app.preloader.show(); // User ID from request

    var userId = to.params.userId; // Simulate Ajax Request

    setTimeout(function () {
      // We got user data from request
      var user = {
        firstName: 'Vladimir',
        lastName: 'Kharlampidi',
        about: 'Hello, i am creator of Framework7! Hope you like it!',
        links: [{
          title: 'Framework7 Website',
          url: 'http://framework7.io'
        }, {
          title: 'Framework7 Forum',
          url: 'http://forum.framework7.io'
        }]
      }; // Hide Preloader

      app.preloader.hide(); // Resolve route to load page

      resolve({
        component: _requestAndLoad["default"]
      }, {
        props: {
          user: user
        }
      });
    }, 1000);
  }
}, {
  path: '(.*)',
  component: _["default"]
}];
var _default = routes;
exports["default"] = _default;