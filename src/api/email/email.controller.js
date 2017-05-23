import * as utility from '../../lib/utility';
import * as email from '../../lib/email';
const MantraTemplate = utility.getTemplate('email/mantra/welcome');

export function index(req, res) {

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodetomic 👻" <foo@blurdybloop.com>', // sender address
    to: 'example1@gmail.com, example2@gmail.com', // list of receivers
    subject: 'Welcome ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '' // html body
  };

  var values = {
    name: "Nodetomic"
  };

  MantraTemplate.then(template => {
    mailOptions.html = utility.setTemplate(template, values);
    email.send(mailOptions).then(result => res.json(result)).catch(err => res.status(500).json(err));
  });
}
