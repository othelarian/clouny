function createElt(tag, attrs = {}, text = null) {
  const elt = document.createElement(tag);
  for (const attr in attrs) { elt.setAttribute(attr, attrs[attr]); }
  if (text != null) { elt.innerText = text; }
  return elt;
}

class View {
  root = null;
  hideUi() { this.root.classList.add('hide'); }
  showUi() { this.root.classList.remove('hide'); }
}

class InitView extends View {
  constructor() {
    super();
    this.root = createElt('div', {id: 'init-view', 'class': 'view hide'});
    //
    // TODO: btns bar
    //
    // btns bar #############
    const btnsBar = createElt('div');
    // download btn
    const dlBtn = createElt(
      'button',
      {onclick: 'Clouny.generate("minimal.html")'},
      'Download');
    btnsBar.appendChild(dlBtn);
    //
    //
    // add btns bar to root #
    this.root.appendChild(btnsBar);
    // add menu #############
    const addMenu = createElet('div');
    // type of add
    //const
    //
    // TODO: list all current slugs, styles and scripts
    //
    //
    //
    // Add the root to the body
    document.body.appendChild(this.root);
  }
}

// Adding views to Clouny
Clouny.views = {};
Clouny.currView = '';
Clouny.showView = function(newView) {
  if (Clouny.currView != '') { Clouny.views[currView].hideUi(); }
  Clouny.currView = newView;
  Clouny.views[newView].showUi();
}

// init the view (and the app)
function viewInit() {
  const title = createElt('h1', {}, 'Clouny - minimal edition');
  document.body.appendChild(title);
  Clouny.views.init = new InitView();
  Clouny.showView('init');
}

