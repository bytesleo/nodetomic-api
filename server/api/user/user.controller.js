// models
import User from './user.model';

export function index(req, res) {
    User.find({}, (err, users) => {
        res.status(200).json(users);
    });
}

export function me(req, res) {

    const usuario = req.user; //get user
    usuario.ts = usuario.ttlRol - Math.floor(((new Date().getTime()) - usuario.ts) / 1000); //time session
    delete usuario.jwt;
    res.status(200).json(usuario);
}
