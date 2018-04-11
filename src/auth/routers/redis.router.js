
import * as controller from './../controllers/redis.controller';
import { mw } from './../services/mw.service';

export default (app) => {
    app.get('/auth/redis/:section', mw(['admin']), controller.section);
}
