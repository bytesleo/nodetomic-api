'use strict';

var Hello = require('../../../api/hello/hello.model');

var data = [
    {
        greet: 'Hello World',
        language: 'English'
    }, {
        greet: 'Hola Mundo',
        language: 'Spanish'
    }, {
        greet: 'salut monde',
        language: 'French'
    }, {
        greet: 'Hallo Welt',
        language: 'Germany'
    }, {
        greet: 'こんにちは',
        language: 'Japanese'
    }, {
        greet: '你好世界',
        language: 'Chinese'
    }
];

Hello.find({}).remove(() => {
    Hello.create(data, () => {
        console.log('----------------->Published Hello seed');
    });
});
