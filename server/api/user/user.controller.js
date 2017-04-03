'use strict';

// models
const User = require('./user.model');

exports.read = (req, res) => {

    User.find({}, function(err, users) {
        res.status(200).json(users);
    });

}

exports.me = (req, res, next) => {
    var usuario = req.user; //get user
    usuario.ts = usuario.ttlRol - Math.floor(((new Date().getTime()) - usuario.ts) / 1000); //time session
    delete usuario.jwt;
    res.status(200).json(usuario);
};
