import * as controller from './../controllers/local.controller';

export default (app) => {
    app.post('/auth/local', controller.callback);
}
