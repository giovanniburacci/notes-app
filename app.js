import chalk from 'chalk';
import yargs from 'yargs';
import utils from './utils.js'
import fs from 'fs';
yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => { if (argv.title && argv.body) utils.addNote(argv.title, argv.body) }
});

yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => { if (argv.title) utils.removeNote(argv.title) }
});

yargs.command({
    command: 'list',
    describe: 'Lists all notes',
    handler: () => utils.listNotes()
});

yargs.command({
    command: 'read',
    describe: 'Reads a note',
    handler: (argv) => { if (argv.title) utils.readNote(argv.title) }
});

yargs.parse();
