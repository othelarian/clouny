import {generator} from './generator.js';
import {outHtml} from './outhtml.js';

class Settings {
  constructor(content) { this.content = content; }

  dl() { return this.content; }

  getValue(name) {
    //
    // TODO
    //
    return 'no';
    //
  }

  setValue(name, value) {
    //
    // TODO
    //
    //
  }
}

export let Clouny = {
  dl: function(filename = 'clouny.html') {
    const coreScript = document.getElementById('corescript').innerText;
    const style = document.querySelector('head > style').innerText;
    const settings = (Clouny.settings != null)? Clouny.settings.dl() : {};
    //
    const scripts = [];
    const slugs = [];
    //
    // TODO: handle scripts and slugs
    //
    const out = generator(outHtml, coreScript, style, settings, scripts, slugs);
    const href = 'data:text/html;charset:utf-8,' + encodeURIComponent(out);
    const a = document.createElement('a');
    a.setAttribute('download', filename);
    a.setAttribute('href', href);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },
  init: function() {},
  settings: null
};

