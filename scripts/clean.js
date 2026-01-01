import fsp from 'fs/promises';

import {checkArg, isMainScript} from './utils.js';
import {buildDir, getOutfile} from './editions.js';

// Clean a specific edition (if specified), or the entire buildDir (if not)
// IMPORTANT ! This function doesn't catch any potential error
export async function clean(edition = '') {
  // Check args if needed
  if (edition == '') {
    const [isEdition, argEdition] = checkArg('edition', 'e', true);
    edition = (isEdition)? argEdition : '';
  }
  if (edition == '') {
    console.log(`removing the build directory: ${buildDir}`);
    await fsp.rm(buildDir, {recursive: true, force: true});
    console.log('directory removed');
  } else {
    const outFile = getOutfile(edition);
    console.log(`removing the edition '${edition}': ${outFile}`);
    await fsp.rm(outFile);
    console.log(`${outFile} removed`);
  }
}

if (isMainScript('clean.js')) {
  try { await clean(); } catch (error) { console.log(error); }
}

