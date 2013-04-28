(function() {
  window.schatter = function() {
    var conversations, schatter_base, schatter_token, schatter_urls;

    schatter_base = 'https://schatter.herokuapp.com';
    schatter_urls = {};
    schatter_token = '';
    conversations = [];
    $.ajax({
      url: schatter_base,
      headers: {
        'Accept': 'application/json'
      },
      success: function(data) {
        return schatter_urls.conversations = data._links.conversations.href;
      }
    });
    conversations = function(term) {
      if (schatter_token === '') {
        term.echo('please enter your token');
        return;
      }
      $.ajax({
        url: schatter_urls.conversations,
        data: {
          auth_token: schatter_token
        },
        success: function(data) {
          var conversation, i, _i, _len, _results;

          conversations = data.conversations;
          _results = [];
          for (i = _i = 0, _len = conversations.length; _i < _len; i = ++_i) {
            conversation = conversations[i];
            _results.push(term.echo("" + (i + 1) + " " + conversation.name));
          }
          return _results;
        }
      });
    };
    return {
      token: function(string) {
        if (string) {
          schatter_token = string;
        }
        this.echo("token set to " + schatter_token);
      },
      conversations: function() {
        return conversations(this);
      }
    };
  };

}).call(this);
