require('babel-polyfill');
require('babel-register')({
  'presets': [
    'es2015',
    'stage-1',
  ]
});

if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').load();
}

var config = require('./config/db')['default'];
module.exports = config;

