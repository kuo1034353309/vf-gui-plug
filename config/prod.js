const path = require('path');
const baseConfig = require('./base');

baseConfig.mode = 'production';
baseConfig.devtool = '';
baseConfig.output.filename = '[name]_[hash:8].min.js';
module.exports = baseConfig