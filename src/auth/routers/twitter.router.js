import * as controller from './../controllers/twitter.controller';

export default (app) => {
    app.get('/auth/twitter', controller.index);
    app.get('/auth/twitter/callback', controller.callback);
}
