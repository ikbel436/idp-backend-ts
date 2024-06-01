#!/usr/bin/env node

import program from 'commander';
import init from './actions/init.js';
import create from './actions/create.js';
import upload from './actions/upload.js';

program.version('0.3.0');

program
    .command('init')
    .action(init);

program
    .command('create <name>')
    .action(create);

program
    .command('upload')
    .alias('up')
    .action(upload);

program.parse(process.argv);
