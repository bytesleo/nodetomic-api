'use strict';

var User = require('../../../api/user/user.model');

var data = [
    {
        username: 'admin',
        password: '123',
        email: 'admin@admin.com',
        provider: 'local',
        name: 'Administrator',
        photo: 'https://goo.gl/iRM3yA'
    }
];

User.find({}).remove(() => {
    User.create(data, () => {
        console.log('----------------->Published User seed');
    });
});
