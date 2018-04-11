import * as controller from './../controllers/user.controller';
import { mw } from './../../auth/services/mw.service';

export default (app) => {
    app.post('/api/user', controller.create);
    app.put('/api/user', mw(), controller.update);
    app.get('/api/user/me', mw(), controller.me);
    app.get('/api/user/public/:username', controller.read);

    app.get('/api/user/admin', mw(['admin']), controller.listAdmin);
    app.put('/api/user/admin/:id', mw(['admin']), controller.updateAdmin);
    app.delete('/api/user/admin/:id', mw(['admin']), controller.destroyAdmin);
}