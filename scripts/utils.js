
// Check an argument from process.argv
export function checkArg(option, shortOpt, hasValue) {
  const testFn = (elt) => elt == `-${shortOpt}` || elt == `--${option}`;
  const idx = process.argv.findIndex(testFn);
  if (hasValue) {
    if (idx >= 0 && process.argv.length > (idx + 1)) {
      return [true, process.argv[idx + 1]];
    } else { return [false, null]; }
  } else { return idx >= 0; }
}

// Check if this script is currently the one originally executed
// (to be sure a file won't execute some function if it is just called but not
// the initiator)
export function isMainScript(script) {
  return process.argv.find(elt => elt.endsWith(script)) != undefined;
}
