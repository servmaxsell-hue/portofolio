const { exec } = require('child_process');
const path = require('path');

// Hostinger starts this via 'node server.js'
// We point it to our NestJS built entry point
require('./dist/main.js');
