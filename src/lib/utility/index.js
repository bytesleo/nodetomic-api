import * as CryptoJS from 'crypto-js';
import config from '../../config';

//encrypt
export function encrypt(text) {

  return CryptoJS.AES.encrypt(text, config.secret).toString();

}

//decrypt
export function decrypt(ciphertext) {

  var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), config.secret);
  return bytes.toString(CryptoJS.enc.Utf8);

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

  try {
    if (roles.length > 0) {
      let time = 0;
      roles.forEach(rol => {
        config.roles.forEach(item => {
          if (rol === item.rol) {
            time += item.time;
          }
        });
      });
      return time * 60;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }

}
