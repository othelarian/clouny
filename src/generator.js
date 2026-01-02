// the generator function, responsible of taking all the app elements and turn
// them into a string, ready to be put in a file
export function generator(outHtml, coreScript, style, settings, scripts, slugs) {
  let slugsOut = '';
  for (const slug of slugs) {
    //
    // TODO: slugs
    //
  }
  outHtml = outHtml.replace('{{slugs}}', slugsOut);
  let scriptsOut = '';
  for (const script of scripts) {
    //
    // TODO: scripts
    //
  }
  outHtml = outHtml.replace('{{scripts}}', scriptsOut);
  outHtml = outHtml.replace('{{settings}}', JSON.stringify(settings));
  outHtml = outHtml.replace('{{style}}', style);
  // coreScript must be place at the end because otherwise the previous replace
  // will modify coreScript and not the base
  outHtml = outHtml.replace('{{coreScript}}', coreScript);
  return outHtml;
}
