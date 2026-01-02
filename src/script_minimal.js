import {Clouny} from './clouny.js';

function createElt(tag, attrs = {}, text = null) {
  const elt = document.createElement(tag);
  for (const attr in attrs) { elt.setAttribute(attr, attrs[attr]); }
  if (text != null) { elt.innerText = text; }
  return elt;
}

// Rewriting Clouny init
Clouny.init = function() {
  //
  const dlBtn = createElt(
    'button',
    {onclick: 'Clouny.dl("minimal.html")'},
    'Download');
  //
  document.body.appendChild(dlBtn);
  //
  // TODO: button dl
  //
  // TODO: list of slugs
  //
  // TODO: textarea
  //
}

// Enable Clouny globally
window.Clouny = Clouny;

