var host = location.origin;
new Vue({
  el: '#nodetomicApp',
  data: {
    greets: [],
    username: '',
    password: '',
    token: '',
    version: 'v1.9.5'
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      var self = this;
      $.get(host + "/api/hello/", function(data) {
        self.greets = data;
      });
    },
    login: function(event) {
      var self = this;
      var user = {
        username: this.username,
        password: this.password
      }
      $.post(host + "/auth/local", user, function(data) {
        if (data.token)
          self.token = data.token;
      });
    }
  }
});
