(function() {
  $(function() {
    var clear, command, commands, completion, decode, encode, execute, files, history, input, open, prompt, ran, reload, say, tabcomplete;

    encode = function(value) {
      return $('<div/>').text(value).html();
    };
    decode = function(value) {
      return $('<div/>').html(value).text();
    };
    prompt = "~markryall &gt; ";
    input = $('#inputfield');
    history = $('#history');
    completion = $('#completion');
    say = function(message) {
      return history.append("<div>" + message + "</div>");
    };
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
    input.focus();
    $('body').click(function() {
      return input.focus();
    });
    files = "Gemfile Gemfile.lock Guardfile Rakefile coffee css favicon.ico index.html js mobile spec".split(' ');
    commands = {
      'call skype': function() {
        return open('skype:mark_ryall');
      },
      'call phone': function() {
        return open('skype:+61414740489');
      },
      'send email': function() {
        return open('mailto:mark@ryall.com');
      },
      ls: function() {
        return say(files.join(' '));
      },
      clear: function() {
        return clear();
      },
      reload: function() {
        return reload();
      },
      music: function() {
        return window.lastfm(function(track) {
          return say(track);
        });
      }
    };
    execute = function(command) {
      if (commands[command]) {
        return commands[command]();
      } else {
        return say("command not found: " + command);
      }
    };
    command = function() {
      return input.val();
    };
    tabcomplete = function() {
      var all, exp, matches;

      all = Object.keys(commands);
      exp = new RegExp("^" + (command()));
      matches = $.grep(all, function(v) {
        return exp.test(v);
      });
      if (matches.length === 1) {
        return input.val(matches[0]);
      } else {
        return completion.html(matches.join(' '));
      }
    };
    input.keydown(function(e) {
      completion.html('');
      if (e.keyCode === 9) {
        tabcomplete();
        return e.preventDefault();
      }
    });
    return input.keyup(function(e) {
      switch (e.keyCode) {
        case 13:
          ran(command());
          execute(command());
          input.val('');
          return input.focus();
      }
    });
  });

}).call(this);
