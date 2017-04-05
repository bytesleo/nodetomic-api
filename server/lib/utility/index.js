import * as cryptoJS from 'crypto-js';
import config from '../../config';

//encrypt

export function encrypt(text) {

    return cryptoJS.AES.encrypt(text, config.secret).toString();
}

//decrypt

export function decrypt(ciphertext) {

    var bytes = cryptoJS.AES.decrypt(ciphertext.toString(), config.secret);
    return bytes.toString(cryptoJS.enc.Utf8);

}

// make random string

export function makeid(length) {

    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// calculate time rol

export function getTimeRol(roles) {

    if (roles.length > 0) {
        let time = 0;
        roles.forEach(rol => {
            config.roles.forEach(item => {
                if (rol === item.rol) {
                    time += item.time;
                }
            });
        });
        return (time * 60);
    } else {
        return false;
    }

}

// Generate Key session

export function setSessionKey(id) {

    const verify = this.makeid(11);
    const key = `${id.toString()}:${verify}`;
    return {key, verify}

}

// Get Key session

export function getSessionKey(token) {

    return `${token._id}:${token._verify}`;
}

// Get only id_user in key

export function getSessionKeyId(key) {

    return key.split(':')[0];

}
