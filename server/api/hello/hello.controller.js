//models
import Hello from './hello.model';

export function index(req, res) {

    Hello.find({}, (err, hello) => {
        return res.status(200).json(hello);
    });

}
