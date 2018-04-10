'use strict';
/* global io, location, alert, document, Vue */

// Config
var host = location.origin;
var url = parseInt(host.split(':').reverse()[0]);
var hostSocket = host.replace(url, 8001);

// Socket.io
var socket = io.connect(hostSocket, {
    'transports': ['websocket', 'polling']
});

// Vue.js
var app = new Vue({
    el: "#app",
    data: {
        logo: 'rubberBand',
        igreet: '',
        ilanguage: '',
        greetings: []
    },
    created: function created() {
        this.getGreetings();
    },
    methods: {
        getGreetings: function getGreetings() {
            var _this = this;

            this.$http.get(host + '/api/example/greeting').then(function (response) {
                _this.greetings = response.body;
            }, function (response) {
                alert('error :(');
            });
        },
        addGreeting: function addGreeting() {
            var _this2 = this;

            this.$http.post(host + '/api/example/greeting', { greet: this.igreet, language: this.ilanguage }).then(function (response) {
                _this2.igreet = _this2.ilanguage = '';
                socket.emit('example:add', response.body);
            }, function (response) {
                alert('error :(');
            });
        },
        deleteGreeting: function deleteGreeting(id) {
            this.$http.delete(host + '/api/example/greeting/' + id).then(function (response) {
                socket.emit('example:delete', { _id: id });
            }, function (response) {
                alert('error :(');
            });
        }
    }
});

socket.on('add', function (data) {
    app.greetings.push(data);
});

socket.on('delete', function (data) {
    app.greetings.forEach(function (element) {
        if (element._id === data._id) {
            var index = app.greetings.indexOf(element);
            app.greetings.splice(index, 1);
        }
    });
});

// Animation
var logo = document.getElementById("logo");

logo.addEventListener("animationend", function () {
    app.logo = '';
});

socket.on('animation', function (data) {
    console.log('from socket :D', data);
    app.logo = data;
});