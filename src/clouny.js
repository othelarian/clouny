import {generator} from './generator.js';
import {outHtml} from './outhtml.js';

class Settings {
  constructor(content) { this.content = content; }

  dl() { return this.content; }

  getValue(name) {
    if (this.content.hasOwnProperty(name)) { return this.content[name]; }
    else { throw 'Error: no value with this name in settings'; }
  }

  setValue(name, value) { this.content[name] = value; }
}

export let Clouny = {
  // attributes ######################
  styles: {},
  scripts: {},
  slugs: {},
  // methods #########################
  generate: function(filename = 'clouny.html', dl = true) {
    // get core script and settings
    const coreScript = document.getElementById('corescript').innerText;
    const settings = (Clouny.settings != null)? Clouny.settings.dl() : {};
    // handling arrays of data
    function selectData(cls, lst) { return lst.map(elt => { return {
      name: elt,
      content: document.querySelector(`#clouny-${cls}-${elt}`).innerText
    };});}
    // get styles, scripts and slugs
    const styles = selectData('style', Clouny.styles);
    const scripts = selectData('script', Clouny.scripts);
    //
    //
    const slugs = [];
    //
    // TODO: handle scripts and slugs
    //
    const out = generator(outHtml, coreScript, styles, settings, scripts, slugs);
    if (dl) {
      const href = 'data:text/html;charset:utf-8,' + encodeURIComponent(out);
      const a = document.createElement('a');
      a.setAttribute('download', filename);
      a.setAttribute('href', href);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else { return out; }
  },
  preinit: function() {
    function getFromClass(aClass) {
      return Array.from(document.querySelectorAll(`.clouny-${aClass}`))
        .map(elt => elt.getAttribute('id').replace(`clouny-${aClass}-`, ''));
    }
    // setup the settings
    Clouny.settings = new Settings(
      JSON.parse(document.querySelector('#settings').textContent));
    // get the styles
    Clouny.styles = getFromClass('style');
    // get the scripts
    Clouny.scripts = getFromClass('script');
    // get the slugs
    //
    // TODO
    //
    //
    //
  },
  init: function() {},
  settings: null
};

