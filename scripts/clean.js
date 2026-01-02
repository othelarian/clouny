import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

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
    const outFile = path.basename(getOutfile(edition), '.html');
    await fs.readdirSync(buildDir)
      .filter(elt => elt.startsWith(outFile))
      .map(async elt => {
        const pth = path.resolve(buildDir, elt);
        console.log(`removing the edition '${edition}': ${pth}`);
        await fsp.rm(pth);
        console.log(`${pth} removed`);
      });
  }
}

if (isMainScript('clean.js')) {
  try { await clean(); } catch (error) { console.log(error); }
}

