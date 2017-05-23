import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as utility from '../../lib/utility';
const MantraTemplate = utility.getTemplate('email/mantra/welcome');

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
    to: 'example@gmail.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '' // html body
  };

  var values = {
    name: "Nodetomic"
  };

  MantraTemplate.then(template => {

    let rendered = utility.setTemplate(template, values);
    mailOptions.html = rendered;
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error)
        return res.status(500).json(error);
      res.json(info);
    });

  });

}
