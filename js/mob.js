(function() {
  $(function() {
    var age, answer, answered, ask, clear, command, commands, commands_for, comment, comments, completion, decode, email, encode, execute, feedme, files, history, input, load_deets, open, prompt, query, question, ran, reload, repository, say, show_question, show_terminal, tabcomplete, terminal;

    encode = function(value) {
      return $('<div/>').text(value).html();
    };
    decode = function(value) {
      return $('<div/>').html(value).text();
    };
    email = 'mark@ryall.name';
    prompt = "~" + email + " &gt; ";
    input = $('#input');
    history = $('#history');
    completion = $('#completion');
    question = $('#question');
    terminal = $('#terminal');
    query = $('#query');
    answer = $('#answer');
    repository = 'https://github.com/markryall/markryall.github.io';
    commands = {};
    command = function() {
      return input.val();
    };
    feedme = window.feedme();
    say = function(message) {
      return history.append("<div>" + message + "</div>");
    };
    answered = function() {};
    ask = function(prompt, callback) {
      show_question(prompt);
      return answered = function(answer) {
        return callback(answer);
      };
    };
    show_question = function(prompt) {
      question.text(prompt);
      answer.val('');
      terminal.hide();
      query.show();
      return answer.focus();
    };
    show_terminal = function() {
      query.hide();
      terminal.show();
      return input.focus();
    };
    answer.keyup(function(e) {
      var a;

      switch (e.keyCode) {
        case 27:
          return show_terminal();
        case 13:
          a = answer.val();
          show_terminal();
          return answered(a);
      }
    });
    clear = function() {
      return history.html('');
    };
    reload = function() {
      return window.location.reload(true);
    };
    open = function(url) {
      return window.open(url);
    };
    ran = function(command) {
      return say("" + prompt + " " + command);
    };
    age = function(birth) {
      var display, now, time, unit, _i, _len, _ref, _results;

      now = moment();
      time = moment(birth);
      display = function(unit) {
        return say("" + (now.diff(time, unit)) + " " + unit);
      };
      _ref = "seconds minutes hours days weeks months years".split(' ');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        unit = _ref[_i];
        _results.push(display(unit));
      }
      return _results;
    };
    comments = function() {
      return feedme.comments(function(message) {
        return say(encode(message));
      });
    };
    comment = function() {
      return ask('what is your name ? ', function(name) {
        return ask('what is your email ? ', function(email) {
          return ask('what would you like to say ? ', function(content) {
            return feedme.comment(name, email, content, function(message) {
              return say(message);
            });
          });
        });
      });
    };
    files = "Gemfile Gemfile.lock Guardfile Rakefile coffee css favicon.ico index.html js spec".split(' ');
    commands_for = function(data) {
      var k, v, _ref, _results;

      commands = {
        fork: function() {
          return open(repository);
        },
        ls: function() {
          return say(files.join(' '));
        },
        music: function() {
          return window.lastfm(function(track) {
            return say(track);
          });
        },
        clear: clear,
        reload: reload,
        comments: comments,
        comment: comment
      };
      if (data) {
        commands.age = function() {
          return age(data.birth);
        };
        _ref = data.links;
        _results = [];
        for (k in _ref) {
          v = _ref[k];
          _results.push(commands[k] = function() {
            return open(v);
          });
        }
        return _results;
      }
    };
    commands_for(null);
    load_deets = function(email) {
      return $.ajax({
        url: "https://deets.herokuapp.com/deets/" + (MD5(email)),
        headers: {
          'Accept': 'application/json'
        },
        success: function(data) {
          return commands_for(data);
        }
      });
    };
    load_deets(email);
    execute = function(command) {
      if (commands[command]) {
        return commands[command]();
      } else {
        return say("command not found: " + command);
      }
    };
    tabcomplete = function() {
      var all, exp, matches;

      all = Object.keys(commands).sort();
      exp = new RegExp("^" + (command()));
      matches = $.grep(all, function(v) {
        return exp.test(v);
      });
      if (matches.length === 1) {
        return input.val(matches[0]);
      } else {
        return completion.html(matches.join('<br>'));
      }
    };
    input.keydown(function(e) {
      completion.html('');
      if (e.keyCode === 9) {
        tabcomplete();
        return e.preventDefault();
      }
    });
    input.keyup(function(e) {
      switch (e.keyCode) {
        case 13:
          ran(command());
          execute(command());
          input.val('');
          return input.focus();
      }
    });
    input.focus();
    return $('body').click(function() {
      return input.focus();
    });
  });

}).call(this);
