
const functions = require('firebase-functions');
const admin  = require('firebase-admin');
const moment = require('moment'); // npm install moment --save
//const app = admin.initializeApp(functions.config().firebase);
const app = admin.initializeApp(functions.config().firebase);
const debug = require('./utils/debug.js');

exports.addComment = function(req, res) {
    var json = req.body && req.body.email ? req.body : req.query;
    var data = {
        email : json.email,
        initial : json.email ? json.email.slice(0, 1) : "?",
        content : json.content,
        date : +moment() // +moment()は、現在時刻をUNIXタイムスタンプで取得するメソッド
    };
    if (debug.enabled) {
        debug.info("push comments", data);
    }
    admin.database().ref('/comments').push(data).then(snapshot => {
        res.redirect(303, snapshot.ref);
    });
}