import * as controller from './../controllers/facebook.controller';

export default (app) => {
    app.get('/auth/facebook', controller.index);
    app.get('/auth/facebook/callback', controller.callback);
}
