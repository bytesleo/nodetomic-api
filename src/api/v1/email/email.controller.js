import * as utility from '../../../lib/utility';
import * as email from '../../../lib/email';
const EmailTemplate = utility.getTemplate('email/welcome.js'); //example with JS
const OtherTemplate = utility.getTemplate('other/hi.html'); //Example with .html, .mustache

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
    name: "Nodetomic",
    title: "Hi!"
  };

  EmailTemplate.then(template => {
    mailOptions.html = utility.setTemplate(template, values);
    //res.send(mailOptions.html); Uncomment to preview html
    email.send(mailOptions).then(result => res.json(result)).catch(err =>
      res.status(500).json({
        error: err
      }));
  });
}

export function preview(req, res) {

  const PreviewTemplate = utility.getTemplate(`${req.params.folder}/${req.params.name}`);

  PreviewTemplate.then(template => {
    res.send(template);
  }).catch(err => res.status(500).json({
    error: err
  }))

}
