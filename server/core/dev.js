import Morgan from 'morgan';
import Config from './../config';

export default(app) => {

    if (Config.livereload.enabled) 
        app.use(require('connect-livereload')({src: `http://${Config.livereload.ip}:${Config.livereload.port}/livereload.js`}));

    if (Config.log) {
        app.use(Morgan('dev', {
            //            skip: function (req, res) {
            //                if (res.statusCode == 304) {
            //                    return true;
            //                }else{
            //                    return false;
            //                }
            //                return res.statusCode == 304;
            //            }
        }));
    }
};
