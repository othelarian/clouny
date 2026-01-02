import esbuild from 'esbuild';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

import {generator} from '../src/generator.js';
import {checkArg, isMainScript} from './utils.js';
import {buildDir, defEdition, getSources, getOutfile} from './editions.js';

// Get info from package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Check if src files are newer than the last build
async function checkTimes(srcFiles, outFile) {
  async function getTime(pth) { return (await fsp.stat(pth)).mtimeMs; }
  const srcTimes = await Promise.all(srcFiles.map(async file => getTime(file)));
  const maxSrcTime = srcTimes.reduce((acc, curr) => (curr > acc)? curr : acc);
  const outTime = await getTime(outFile);
  return outTime >= maxSrcTime;
}

// Build function
export async function build(edition = '', forcing = false, prod = false) {
  // Setup options
  const forced = (forcing)? true : checkArg('force', 'f');
  prod = (prod)? true : checkArg('prod', 'p');
  if (process.env.NODE_ENV == 'production') { prod = true; }
  // Get the edition
  if (edition == '') { // if build script called from another script
    const [isEditionOpt, argEdition] = checkArg('edition', 'e', true);
    edition = (isEditionOpt)? argEdition : defEdition;
  }
  // Inform about the build
  console.log(`Building edition: ${edition}`);
  // Get the sources and outfile
  try {
    const {srcFiles, srcScript, style, srcHtml} = getSources(edition);
    let outFile = getOutfile(edition);
    // If prod, then add the version
    if (prod) {
      console.log(`prod version: ${packageJson.version}`);
      outFile = outFile.replace('.', `_${packageJson.version}.`);
    }
    // Check if src files are newer than the last build
    if (
      !forced && fs.existsSync(outFile)
      && await checkTimes(srcFiles, outFile)
    ) {
      console.log('Current build already the latest');
      return true;
    }
    // Get html and fill it with package.json data
    let htmlCore = fs.readFileSync(srcHtml, 'utf8');
    htmlCore = htmlCore.replaceAll(/[\r\n]/gi, ''); // removing line breaks
    // Injecting package.json data
    for (let match of htmlCore.matchAll(/{{package\.json:([a-z]+)}}/g)) {
      htmlCore = htmlCore.replace(match[0], packageJson.version);
    }
    // Generate the js file containing the html
    fs.writeFileSync('src/outhtml.js', `export let outHtml = '${htmlCore}';`);
    // Generate the "builds" directory
    if (!fs.existsSync(buildDir)) { fs.mkdirSync(buildDir); }
    // Compiling JS
    await esbuild.build({
      entryPoints: [srcScript],
      sourcemap: false,
      write: false,
      bundle: true,
      minify: true,
      treeShaking: true,
      platform: 'browser',
      format: 'iife',
      target: 'es2015',
      outdir: 'builds'
    }).then(async result => {
      // move the result into the generator, and save it
      const coreScript = new TextDecoder()
        .decode(result.outputFiles[0].contents);
      const output = generator(htmlCore, coreScript, style, {}, [], []);
      fs.writeFileSync(outFile, output);
      // show the size
      const size = (Uint8Array.from(Buffer.from(output)).byteLength * 0.000977)
        .toFixed(3) + ' kilobytes';
      console.log(`Final size: ${size}`);
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

if (isMainScript('build.js')) { await build(); }

