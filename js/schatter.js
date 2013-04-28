(function() {
  window.schatter = function() {
    var conversations, join, schatter, schatter_base, schatter_token, schatter_urls;

    schatter_base = 'https://schatter.herokuapp.com';
    schatter_urls = {};
    schatter_token = '';
    conversations = [];
    schatter = function(url, params) {
      params.url = url;
      params.headers = {
        'Accept': 'application/json'
      };
      if (!params.data) {
        params.data = {};
      }
      params.data.auth_token = schatter_token;
      return $.ajax(params);
    };
    schatter(schatter_base, {
      success: function(data) {
        return schatter_urls.conversations = data._links.conversations.href;
      }
    });
    conversations = function(term) {
      if (schatter_token === '') {
        term.echo('please enter your token');
        return;
      }
      schatter(schatter_urls.conversations, {
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
    join = function(term, index) {
      var conversation, i;

      if (schatter_token === '') {
        term.echo('please enter your token');
        return;
      }
      i = parseInt(index);
      conversation = conversations[i - 1];
      if (!conversation) {
        term.echo("no conversation at index " + index);
        return;
      }
      schatter(conversation._links.people.href, {
        success: function(data) {
          var person, _i, _len, _ref, _results;

          conversation.people = data.people;
          conversation.person = {};
          term.echo("people in this conversation:");
          _ref = conversation.people;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            person = _ref[_i];
            conversation.person[person.uuid] = person;
            _results.push(term.echo("  " + person.email));
          }
          return _results;
        }
      });
      schatter(conversation._links.messages.href, {
        success: function(data) {
          var message, _i, _len, _ref, _results;

          conversation.messages = data.messages;
          _ref = conversation.messages;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            message = _ref[_i];
            _results.push(term.echo("" + (moment(message.timestamp * 1000)) + " " + conversation.person[message.person_id].email + " " + message.content));
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
      },
      join: function(index) {
        return join(this, index);
      }
    };
  };

}).call(this);
