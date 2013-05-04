(function() {
  $(function() {
    var age, answer, answered, ask, clear, command, commands, comment, comments, completion, decode, encode, execute, feedme, files, history, input, open, prompt, query, question, ran, reload, say, show_question, show_terminal, skype, tabcomplete, terminal;

    encode = function(value) {
      return $('<div/>').text(value).html();
    };
    decode = function(value) {
      return $('<div/>').html(value).text();
    };
    prompt = "~markryall &gt; ";
    input = $('#input');
    history = $('#history');
    completion = $('#completion');
    question = $('#question');
    terminal = $('#terminal');
    query = $('#query');
    answer = $('#answer');
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
    age = function() {
      var display, now, time, unit, _i, _len, _ref, _results;

      now = moment();
      time = moment(-25381800000);
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
    skype = function(account) {
      say(account);
      return open("skype:" + account);
    };
    commands = {
      skype: function() {
        return skype('mark_ryall');
      },
      phone: function() {
        return skype('+61414740489');
      },
      email: function() {
        say('mark@ryall.name');
        return open('mailto:mark@ryall.name');
      },
      twitter: function() {
        return open('http://twitter.com/markryall');
      },
      facebook: function() {
        return open('http://facebook.com/mark.ryall');
      },
      github: function() {
        return open('http://github.com/markryall');
      },
      bitbucket: function() {
        return open('https://bitbucket.org/markryall');
      },
      coderwall: function() {
        return open('https://coderwall.com/markryall');
      },
      linkedin: function() {
        return open('http://linkedin.com/in/markryall');
      },
      flickr: function() {
        return open('http://flickr.com/photos/markryall');
      },
      aboutme: function() {
        return open('http://about.me/markryall');
      },
      lastfm: function() {
        return open('http://last.fm/user/mryall');
      },
      goodreads: function() {
        return open('http://www.goodreads.com/user/show/1908681');
      },
      fork: function() {
        return open('https://github.com/markryall/markryall.github.io');
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
      age: age,
      comments: comments,
      comment: comment
    };
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
