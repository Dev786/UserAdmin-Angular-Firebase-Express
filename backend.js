var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var serviceAccount = require('./config/config.json');
var bodyParser = require('body-parser');
var admin = require("firebase-admin");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ""
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', express.static(path.join(__dirname, '/UI')));

app.post('/addUser', function (req, res) {
    console.log(req.body)
    let db = admin.firestore();
    let users = db.collection('users');
    let email = String(req.body.Email.trim());
    let password = String(req.body.Password.trim());
    let name = String(req.body.Name.trim());
    let phoneNumber = req.body.PhoneNumber
    let newUser = {
        "Email": email,
        "Name": name,
        "Password": password,
        "PhoneNumber": Number(phoneNumber)
    }
    users.doc().set(newUser)
        .then(ref => {
            res.status(200).send({ "status": true });
        })
        .catch(err => {
            res.status(200).send({ "status": false });
        })
});

app.get('/getUser', function (req, res) {
    // console.log("here");
    let db = admin.firestore();
    let users = db.collection('users');
    users.get()
        .then(doc => {
            // console.log(doc.docs)
            if (doc.empty) {
                console.log("No data");
            } else {
                let userData = [];
                doc.docs.forEach(d => {
                    let data = d.data();
                    data.id = d.id;
                    userData.push(data);
                })
                res.status(200).send(userData)
            }
        })
});

app.post('/updateUser', function (req, res) {
    console.log(req.body);
    let db = admin.firestore();
    let users = db.collection('users');
    let email = String(req.body.Email.trim());
    let password = String(req.body.Password.trim());
    let name = String(req.body.Name.trim());
    let phoneNumber = String(req.body.PhoneNumber);
    let id = String(req.body.id.trim());
    let newUser = {
        "Email": email,
        "Name": name,
        "Password": password,
        "PhoneNumber": Number(phoneNumber)
    }
    users.doc(id).set(newUser)
        .then(ref => {
            res.status(200).send({ "status": true });
        })
        .catch(err => {
            res.status(200).send({ "status": true });
        })

});


app.post('/deleteUser', function (req, res) {
    console.log(req.body);
    let db = admin.firestore();
    let users = db.collection('users');
    let id = String(req.body.id.trim());

    users.doc(id).delete()
        .then(ref => {
            res.status(200).send({ "status": true });
        })
        .catch(err => {
            res.status(200).send({ "status": true });
        })

});

server.listen(3030);