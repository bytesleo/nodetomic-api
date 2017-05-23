import Hello from './hello.model';

export function all(req, res) {

  Hello
    .find({})
    .exec()
    .then(greets => {
      return res.status(200).json(greets);
    }).catch(err => {
      return res.status(500).json(err);
    });
    
}
