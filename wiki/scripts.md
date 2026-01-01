# Clouny scripts

Clouny repository contains some scripts to handle some operations:

- **scripts/build.js**: it's where the Clouny html files are made
- **scripts/clean.js**: remove generated Clouny files
- **scripts/editions.js**: contains all the data to generate all the editions

Some of these scripts are explained here, to help understand how they work, and how to use them elsewhere, if needed.

Also, some of them are callable from `npm run` (like, nearly all of them). You can consult the dedicated section for more details. Here's the matching:

- `npm run build` => scripts/build.js
- `npm run clean` => scripts/clean.js
- `npm run list` => scripts/editions.js
- `npm run detail` => scripts/editions.js

## About arguments for commands

First, to send arguments to an `npm run` command, use the following syntax:

`npm run [command] -- --[arg]`

## scripts/build.js

Command:

- `npm run build` : build Clouny

Possible arguments:

- `-e|--edition [EDITION]` : set the edition you want to generate
- `-f|--force` : forcing an edition to be generated

Export:

- `async function build(edition = '', forcing = true) return boolean`

Generate a Clouny file, with the specified edition (or the default edition defined in `editions.js` otherwise). The `forcing` parameter (if calling the function) and the `-f|--force` argument (if using `npm run build`) means the generation will be rewritten. If not forced the script will check if there's already a generated file, and if it's the case then if the sources have changed since the last generation, and if not it will output a message indicated it's already the last version and stop here.

## scripts/clean.js

Command:

- `npm run clean`

Possible argument:

- `-e|--edition [EDITION]` : set the edition you want to remove specifically

Export:

- `function clean(edition = '') throw Error`

Remove the `builds` directory. If an edition is specified (with the command) then only remove this edition from the `builds` directory (only one edition can be removed at a time with the argument).

## scripts/editions.js

Commands:

- `npm run list` : ??
- `npm run detail`



TODO

### Editing edition configuration

TODO

