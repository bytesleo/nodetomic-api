import Hello from './hello.model';

export function all(req, res) {

  Hello
    .find({})
    .exec()
    .then(greets => {
      res.json(greets);
    }).catch(err => {
      res.status(500).json(err);
    });

}
