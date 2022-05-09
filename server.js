/*
 * Name: Samuel Knox
 * Email: knoxsa@oregonstate.edu
 * 
 * CS361: Password Generator Microservice
 */

const express = require('express');
const app = express();
const port = process.env.PORT || 80

const { generatePassword } = require('./PasswordGen')

app.use(express.json());


app.use(function (req, res, next) {
    console.log("== Request received")
    console.log("  - METHOD:", req.method)
    console.log("  - URL:", req.url)
    console.log("  - HEADERS:", req.headers)
    next()
});



// default endpoint - password gen
app.get('/', function (req, res, next) {

    /*function getRandPw(len){
        
        var charset = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
        var randomness = '';

        for (var i = 0; i < len; ++i) {
            randomness += charset.charAt(Math.random() * charset.length);
        };
        return randomness;
    };*/

    const pw = generatePassword(10); // default 10 chars, no pw len specified in url
    res.status(200).json({pw});
});



// return longer passwords (accepted 1-64)
app.get('/:pwlen', function (req, res, next) {

    const pwlen = parseInt(req.params.pwlen);
    const pw = generatePassword(pwlen);

    if ( (pwlen > 0) && (pwlen < 65) ) {
        res.status(200).json({pw})
    } else {
        res.status(404).send({
            err: "This URL was not recognized: " + req.originalUrl
        });
    };
});



app.use('*', function (req, res, next) {
    res.status(404).send({
        err: "This URL was not recognized: " + req.originalUrl
    })
});



app.listen(port, function () {
    console.log("== Server is listening on port:", port)
});
