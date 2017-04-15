import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';

export function index(req, res) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'example@gmail.com',
            pass: 'examplepass'
        }
    });

    // let transporter = nodemailer.createTransport(smtpTransport({
    //     host: 'hostexample',
    //     secure: true,
    //     port: 465,
    //     auth: {
    //         user: 'example@gmail.com',
    //         pass: 'examplepass'
    //     }
    // }));

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        to: 'leonardo.ricog@gmail.com, baz@blurdybloop.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

}
