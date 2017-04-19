import fs from 'fs';
import config from '../../config';

export function upload(req, res) {

  try {
    if (req.files) {
      //file with name file_upload in form
      const file = req.files.file_upload;
      const path = `${config.base}/assets/${new Date().getTime()}_${file.name}`;

      file.mv(path, err => {
        if (err)
          return res.status(500).send(err);

        res.status(200).json({message: 'File uploaded!', path});
      });

    } else {
      res.status(200).json({error: 'Not files found'});
    }
  } catch (err) {
    return res.status(500).send(err);
  }

}
