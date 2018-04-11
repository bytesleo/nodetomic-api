import * as controller from './../controllers/google.controller';

export default (app) => {
    app.get('/auth/google', controller.index);
    app.get('/auth/google/callback', controller.callback);
}
