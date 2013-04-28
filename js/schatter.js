(function() {
  window.schatter = function() {
    var conversations, join, load_messages, load_people, schatter, schatter_base, schatter_token, schatter_urls;

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
    load_people = function(conversation, callback) {
      return schatter(conversation._links.people.href, {
        success: function(data) {
          var person, _i, _len, _ref;

          conversation.people = data.people;
          if (!conversation.person) {
            conversation.person = {};
          }
          _ref = conversation.people;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            person = _ref[_i];
            conversation.person[person.uuid] = person;
          }
          return callback();
        }
      });
    };
    load_messages = function(conversation, callback) {
      return schatter(conversation._links.messages.href, {
        success: function(data) {
          var message, _i, _len, _ref;

          conversation.messages = data.messages;
          if (!conversation.message) {
            conversation.message = {};
          }
          _ref = conversation.messages;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            message = _ref[_i];
            conversation.message[message.uuid] = message;
          }
          return callback();
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
      load_people(conversation, function() {
        var person, _i, _len, _ref, _results;

        term.echo("people in this conversation:");
        _ref = conversation.people;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          person = _ref[_i];
          _results.push(term.echo("  " + person.email));
        }
        return _results;
      });
      load_messages(conversation, function() {
        var message, _i, _len, _ref, _results;

        _ref = conversation.messages;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          message = _ref[_i];
          _results.push(term.echo("" + (moment(message.timestamp * 1000)) + " " + conversation.person[message.person_id].email + " " + message.content));
        }
        return _results;
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
