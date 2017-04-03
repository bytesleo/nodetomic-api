'use strict';

var Hello = require('../../../api/hello/hello.model');

var helloArray = [
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
    Hello.create(helloArray, () => {
        console.log('----------------->Publish finish Hello');
    });
});
