import * as CryptoJS from 'crypto-js';
import Hogan from 'hogan.js';
// import fs from 'fs';
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
import config from '../../config';

// Encrypt
export function encrypt(text) {

  return CryptoJS.AES.encrypt(text, config.secret).toString();

}

// Decrypt
export function decrypt(ciphertext) {

  var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), config.secret);
  return bytes.toString(CryptoJS.enc.Utf8);

}

// Make random string
export function makeid(length) {

  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;

}

// Calculate time rol
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

// Get Template
export function getTemplate(path) {

  return fs.readFileAsync(`${config.base}/views/${path}.html`, 'utf8');

}

// Replace in Template
export function setTemplate(template, values) {

  let HoganTemplate = Hogan.compile(template);
  return HoganTemplate.render(values);

}
