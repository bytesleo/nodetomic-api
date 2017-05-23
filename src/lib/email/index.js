import * as nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Promise from 'bluebird';
import config from '../../config';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({service: 'gmail', auth: config.email.auth});
// const transporter = nodemailer.createTransport(smtpTransport(config.email));

// Decrypt
export function send(mailOptions) {
  // send mail with defined transport object
  return Promise.resolve(transporter.sendMail(mailOptions));
}
