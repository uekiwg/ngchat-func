const functions = require('firebase-functions');
const apps_chat = require('./apps/chat.js');
const apps_test = require('./apps/test.js');

exports.addComment = functions.https.onRequest((req, res) => {
    apps_chat.addComment(req, res);
});

exports.timestamp = functions.https.onRequest((req, res) => {
    apps_test.timestamp(req, res);
});
