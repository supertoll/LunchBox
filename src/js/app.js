import $ from 'dom7';
import Framework7, { getDevice } from 'framework7/bundle';

// Import F7 Styles
import 'framework7/framework7-bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.styl';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';

// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';

// Import main app component
import App from '../app.f7';

import global from './globals';

var device = getDevice();
var app = new Framework7({
  name: 'Lunchbox', // App name
  theme: 'auto', // Automatic theme detection (iOS/Android/Web)
  el: '#app', // App root element
  component: App, // App main component
  id: 'de.lunchbox', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,

  //enables moveble lists
  
  sortable: {
    moveElements: true
  },
  touch: {
    tapHold: true,
  },

  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
        //init all globals


        
      }
    },
  },
});