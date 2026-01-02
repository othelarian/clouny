// IMPORTANT !
//
// This file contains all the mandatory data to generate (and also clean) the
// different editions of Clouny. Treat this file with caution.
//
// If you really need to change the content of this file, please be sure to
// read the documentation first => (link to the doc)
//


// TODO: link to the doc

import path from 'path';

import {checkArg, isMainScript} from './utils.js';

// Default build directory and edition
export const buildDir = 'builds';
export const defEdition = 'minimal';

// base files needed for every edition of Clouny
let srcFiles = ['src/base.html', 'src/clouny.js', 'src/generator.js'];
let srcAdds = null;
let srcScript = null;
let style = '';
const srcHtml = 'src/base.html';
let outFile = '';

// all editions are defined here
const editionsList = {
  'minimal': {
    desc: 'This is the minimal usable version of Clouny',
    adds: ['src/script_minimal.js'],
    script: 'src/script_minimal.js',
    style: 'body{text-align:center;} svg.initiator{display:none;}',
    out: path.resolve(buildDir, 'minimal.html')
  },
  'nanochoo': {
    desc: 'dev purpose',
    adds: [''],
  }
  //
  // TODO: for next edition, if style is in file, don't forget to add it to
  // srcAdds
  //
};

// function to get all the mandatory sources for a specific edition
// throw an error if the edition given in argument isn't a valid one
export function getSources(edition) {
  if (Object.keys(editionsList).find(elt => elt == edition) != undefined) {
    const selEdition = editionsList[edition];
    let sources = {
      srcFiles: srcFiles.concat(selEdition.adds),
      srcScript: selEdition.script,
      style: selEdition.style,
      srcHtml: srcHtml
    };
    //
    // TODO: if slugs or scripts are defined for an edition, add them
    //
    return sources;
  } else { throw 'Error: edition selected not found in the list'; }
}

// function to get the path for the file to output the edition generation
// throw an error if the edition given in argument isn't a valid one
export function getOutfile(edition) {
  if (Object.keys(editionsList).find(elt => elt == edition) != undefined) {
    return editionsList[edition].out;
  } else { throw 'Error: edition selected not found in the list'; }
}

function listEditions() {
  //
  // TODO
  //
}

function detailEdition() {
  //
  // TODO
  //
}

if (isMainScript('editions.js')) {
  //
  // TODO: check which is between list or detail
  //
  //
}

