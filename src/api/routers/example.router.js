import * as controller from './../controllers/example.controller';

export default (app) => {
    app.get('/api/example/greeting', controller.list);
    app.post('/api/example/greeting', controller.create);
    app.put('/api/example/greeting/:id', controller.update);
    app.get('/api/example/greeting/:id', controller.read);
    app.delete('/api/example/greeting/:id', controller.destroy);
    app.get('/api/example/socket', controller.animation);
}