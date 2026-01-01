export function generator(outHtml, coreScript, style, settings, scripts, slugs) {
  outHtml = outHtml.replace('{{coreScript}}', coreScript);
  outHtml = outHtml.replace('{{style}}', style);
  outHtml = outHtml.replace('{{settings}}', settings);
  let scriptsOut = '';
  for (const script of scripts) {
    //
    // TODO: scripts
    //
  }
  outHtml = outHtml.replace('{{scripts}}', scriptsOut);
  let slugsOut = '';
  for (const slug of slugs) {
    //
    // TODO: slugs
    //
  }
  outHtml = outHtml.replace('{{slugs}}', slugsOut);
  return outHtml;
}
