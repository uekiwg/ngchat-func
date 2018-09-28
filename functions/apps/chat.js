
const functions = require('firebase-functions');
const admin  = require('firebase-admin');
const utils = require('./utils/facade.js');

admin.initializeApp(functions.config().firebase);

exports.addComment = function(req, res) {

    // クライアント側でAuthenticationにログインをして取得したtokenのチェック
    if (!req.headers.authorization) {
        utils.res.ng(res, '認証情報を取得できませんでした。');
        return;
    }
    const token = req.headers.authorization.split('Bearer ')[1];
    admin.auth().verifyIdToken(token)
    .then(function(decodedToken) {
        // commentsへレコードを追加
        var json = req.body && req.body.email ? req.body : req.query;
        var data = {
            email : json.email,
            initial : json.email ? json.email.slice(0, 1) : "?",
            content : json.content,
            date : utils.datetime.unixTimestamp()
        };
        if (utils.log.enabled) {
            utils.log.info("push comments", data);
        }
        admin.database().ref('/comments').push(data)
        .then(snapshot => {
            //res.redirect(303, snapshot.ref);
            utils.res.ok(res);
        }).catch(error => {
            utils.res.ng(res, "データを登録できませんでした。", error);
        });
    }).catch(function(error) {
        utils.res.ng(res, '認証tokenが不正です。', error);
    });
}