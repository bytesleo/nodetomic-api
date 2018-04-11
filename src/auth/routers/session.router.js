
import * as controller from './../controllers/session.controller';
import { mw } from './../services/mw.service';

export default (app) => {
    app.get('/auth/session', mw(), controller.list);
    app.delete('/auth/logout', mw(), controller.logout);
    app.delete('/auth/session/:id', mw(), controller.destroy);

    app.get('/auth/session/admin/:id', mw(['admin']), controller.listAdmin);
    app.delete('/auth/session/admin/:id', mw(['admin']), controller.destroyAdmin);
    app.delete('/auth/session/admin/logout/:id', mw(['admin']), controller.logoutAdmin);
}
