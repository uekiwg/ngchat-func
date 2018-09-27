const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
//const express = require('express');
//const app = express();
//app.get('/timestamp', (request, response) => {
//  response.send(`${Date.now()}`);
//})

// firebase.json の"rewrites": [{"source": "**", "function": "app"}]
//exports.app = functions.https.onRequest(app);

exports.timestamp = functions.https.onRequest((req, res) => {
    res.send(`${Date.now()}`);
    // Grab the text parameter.
    //const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    //admin.database().ref('/messages').push({original: original}).then(snapshot => {
    //  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    //  res.redirect(303, snapshot.ref);
});
