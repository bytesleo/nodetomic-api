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
          throw new Error(err);

        res.json({message: 'File uploaded!', path});
      });

    } else {
      throw new Error('Not files found');
    }
  } catch (err) {
    res.status(500).json({error:err});
  }

}
