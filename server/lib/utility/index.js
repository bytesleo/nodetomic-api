import crypto from 'crypto';
import bcrypt from 'bcrypt';
import config from '../../config';
const algorithm = 'aes-256-ctr';

//encrypt

export function encrypt(text) {

    const cipher = crypto.createCipher(algorithm, config.secret);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;

}

//decrypt

export function decrypt(text) {

    const decipher = crypto.createDecipher(algorithm, config.secret);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;

}

// make random string

export function makeid(length) {

    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

/*
 * Calculate time by Rol (concat time in multiples roles)
 */
export function getTimeRol(roles) {

    let time = 0;
    roles.forEach(rol => {
        config.roles.forEach(item => {
            if (rol === item.rol) {
                time += item.time;
            }
        });
    });
    return (time * 60);

}

// Redis

export function setRedisKey(id, verify) {

    return `${this.encrypt(id.toString())}:${this.makeid(20)}`;
}

export function getRedisKey(token) {

    return `${this.encrypt(token._id)}:${token._verify}`;
}
