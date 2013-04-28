(function() {
  var __slice = [].slice;

  window.schatter = function(site_name, say, push) {
    var absolute_time, conversation, conversation_commands, conversations, display_message, join, load_messages, load_people, new_message, new_person, schatter, schatter_base, schatter_token, schatter_urls;

    schatter_base = 'https://schatter.herokuapp.com';
    schatter_urls = {};
    schatter_token = '';
    conversations = [];
    conversation = {};
    schatter = function(url, params) {
      params.url = url;
      params.headers = {
        'Accept': 'application/json'
      };
      if (!params.data) {
        params.data = {};
      }
      if (schatter_token) {
        params.data.auth_token = schatter_token;
      }
      return $.ajax(params);
    };
    schatter(schatter_base, {
      success: function(data) {
        return schatter_urls.conversations = data._links.conversations.href;
      }
    });
    conversations = function(term) {
      if (schatter_token === '') {
        say(term, 'please enter your token');
        return;
      }
      schatter(schatter_urls.conversations, {
        success: function(data) {
          var i, _i, _len, _results;

          conversations = data.conversations;
          _results = [];
          for (i = _i = 0, _len = conversations.length; _i < _len; i = ++_i) {
            conversation = conversations[i];
            _results.push(say(term, "" + (i + 1) + " " + conversation.name));
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
      var data;

      data = {};
      if (conversation.last_message) {
        data.message_id = conversation.last_message.uuid;
      }
      return schatter(conversation._links.messages.href, {
        data: data,
        success: function(data) {
          var message, _i, _len, _ref;

          conversation.new_messages = data.messages;
          if (!conversation.messages) {
            conversation.messages = [];
          }
          if (!conversation.message) {
            conversation.message = {};
          }
          _ref = data.messages;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            message = _ref[_i];
            conversation.messages.push(message);
            conversation.message[message.uuid] = message;
            conversation.last_message = message;
          }
          return callback();
        }
      });
    };
    new_message = function(content, callback) {
      return schatter(conversation._links.messages.href, {
        type: 'post',
        data: {
          content: content
        },
        success: function(data) {
          return callback();
        }
      });
    };
    new_person = function(email, callback) {
      return schatter(conversation._links.people.href, {
        type: 'post',
        data: {
          email: email
        },
        success: function(data) {
          return callback();
        }
      });
    };
    absolute_time = function(ts) {
      var t;

      t = moment(ts * 1000);
      return t.format('YY/MMM/DD HH:mm:ss');
    };
    display_message = function(term, message) {
      return say(term, "" + (absolute_time(message.timestamp)) + " " + conversation.person[message.person_id].email + " " + message.content);
    };
    conversation_commands = {
      say: function() {
        var term, words;

        words = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        term = this;
        new_message(words.join(' '), function() {
          return say(term, 'message created');
        });
      },
      invite: function(email) {
        var term;

        term = this;
        new_person(email, function() {
          return say(term, "" + email + " invited to conversation");
        });
      },
      refresh: function() {
        var term;

        term = this;
        load_messages(conversation, function() {
          var message, _i, _len, _ref, _results;

          _ref = conversation.new_messages;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            message = _ref[_i];
            _results.push(display_message(term, message));
          }
          return _results;
        });
      }
    };
    join = function(term, index) {
      var i;

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

        if (conversation.messages.length > 10) {
          term.echo('...');
        }
        _ref = conversation.messages.slice(-10);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          message = _ref[_i];
          _results.push(display_message(term, message));
        }
        return _results;
      });
      push(term, conversation_commands, {
        prompt: "" + site_name + "/chat/" + conversation.name + " > "
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
