import * as controller from './../controllers/github.controller';

export default (app) => {
    app.get('/auth/github', controller.index);
    app.get('/auth/github/callback', controller.callback);
}
