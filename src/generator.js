// the generator function, responsible of taking all the app elements and turn
// them into a string, ready to be put in a file
export function generator(outHtml, coreScript, styles, settings, scripts, slugs) {
  let slugsOut = '';
  for (const slug of slugs) {
    //
    // TODO: slugs
    //
  }
  outHtml = outHtml.replace('{{slugs}}', slugsOut);
  // scripts
  function writeScript(elt) {
    const part1 = `<script class="clouny-script" id="clouny-script-`;
    return part1 + `${elt.name}">${elt.content}</script>`;
  }
  const scriptsOut = scripts.map(writeScript).join('');
  outHtml = outHtml.replace('{{scripts}}', scriptsOut);
  // settings
  outHtml = outHtml.replace('{{settings}}', JSON.stringify(settings));
  // styles
  function writeStyle(elt) {
    const part1 = `<style class="clouny-style" id="clouny-style-${elt.name}">`;
    return part1 + `${elt.content}</style>`;
  }
  const styleOut = styles.map(writeStyle).join('');
  outHtml = outHtml.replace('{{style}}', styleOut);
  // coreScript must be place at the end because otherwise the previous replace
  // will modify coreScript and not the base
  outHtml = outHtml.replace('{{coreScript}}', coreScript);
  return outHtml;
}
