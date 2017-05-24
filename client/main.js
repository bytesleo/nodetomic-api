new Vue({
  el: '#nodetomicApp',
  data: {
    greets: [],
    username: '',
    password: '',
    token: '',
    version: 'v1.6.7'
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      var self = this;
      $.get("http://localhost:8000/api/hello/", function(data) {
        self.greets = data;
      });
    },
    login: function(event) {
      var self = this;
      var user = {
        username: this.username,
        password: this.password
      }
      $.post("http://localhost:8000/auth/local", user, function(data) {
        if (data.token)
          self.token = data.token;
      });
    }
  }
});
