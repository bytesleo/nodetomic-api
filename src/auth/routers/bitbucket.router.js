import * as controller from './../controllers/bitbucket.controller';

export default (app) => {
    app.get('/auth/bitbucket', controller.index);
    app.get('/auth/bitbucket/callback', controller.callback);
}