import {Clouny} from './clouny.js';

// Rewriting Clouny init
Clouny.init = function() {
  // init the settings
  Clouny.preinit();
  // init the view
  viewInit();
}

// Enable Clouny globally
window.Clouny = Clouny;

