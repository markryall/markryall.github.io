(function() {
  window.schatter = function() {
    var auth_token, conversations, schatter_urls;

    schatter_urls = {};
    auth_token = '';
    conversations = [];
    conversations = function(term) {
      if (schatter_token === '') {
        say(term, 'please enter your auth token');
        return;
      }
      term = this;
      $.ajax({
        url: 'http://schatter.herokuapp.com/comments',
        success: function(data) {
          var comment, display, _i, _len, _results;

          display = function(comment) {
            var time;

            time = moment(comment.created_at);
            return term.echo("" + (time.fromNow()) + ": " + comment.name + " said " + comment.body);
          };
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            comment = data[_i];
            _results.push(display(comment));
          }
          return _results;
        }
      });
    };
    return {
      auth_token: function(string) {
        auth_token = string;
        this.echo("auth_token set to " + string);
      },
      conversations: function() {
        return conversations(this);
      }
    };
  };

}).call(this);
