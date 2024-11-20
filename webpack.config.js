const path = require('path');

module.exports = {
    entry: './game/javaScript/photography.js', // 你的入口文件
    output: {
        filename: 'photography_result.js',
        path: path.resolve(__dirname, 'dist'),
    },
};