'use strict';

//models
const Hello = require('./hello.model');

exports.read = (req, res) => {

    Hello.find({}, (err, hello) => {
        res.status(200).json(hello);
    })

}
