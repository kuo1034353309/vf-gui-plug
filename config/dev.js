const path = require('path');
const baseConfig = require('./base');

baseConfig.mode = 'development';
baseConfig.devServer = {
	  index: path.join(__dirname, '../index.html'),
    contentBase: path.join(__dirname, '../'),
    port:9000,
    host:'0.0.0.0',
    overlay:{
      errors:true
    },

    open:true,  //每次都打开一个网页
}
module.exports = baseConfig
//global