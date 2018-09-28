const moment = require('moment'); // npm install moment --save

exports.unixTimestamp = function() {
    return +moment(); // +moment()は、現在時刻をUNIXタイムスタンプで取得するメソッド
};