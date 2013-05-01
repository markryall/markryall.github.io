(function() {
  $(function() {
    var clear, command, completion, decode, encode, execute, files, history, input, prompt, reload, say, tabcomplete;

    encode = function(value) {
      return $('<div/>').text(value).html();
    };
    decode = function(value) {
      return $('<div/>').html(value).text();
    };
    prompt = "~markryall &gt; ";
    input = '#inputfield';
    history = '#history';
    completion = '#completion';
    say = function(message) {
      return $('#history').append("<div>" + message + "</div>");
    };
    clear = function() {
      return $('#history').html('');
    };
    reload = function() {
      return window.location.reload(true);
    };
    history = function(command) {
      return say("" + prompt + " " + command);
    };
    $(input).focus();
    $('body').click(function() {
      return $(input).focus();
    });
    files = "Gemfile Gemfile.lock Guardfile Rakefile coffee css favicon.ico index.html js mobile spec".split(' ');
    execute = function(command) {
      switch (command) {
        case 'ls':
          return say(files.join(' '));
        case 'clear':
          return clear();
        case 'reload':
          return reload();
        case 'music':
          return window.lastfm(function(track) {
            return say(track);
          });
        default:
          return say("command not found: " + command);
      }
    };
    command = function() {
      return $(input).val();
    };
    tabcomplete = function() {
      var all, exp, matches;

      all = 'clear ls reload'.split(' ');
      exp = new RegExp("^" + (command()));
      matches = $.grep(all, function(v) {
        return exp.test(v);
      });
      if (matches.length === 1) {
        return $(input).val(matches[0]);
      } else {
        return $(completion).html(matches.join(' '));
      }
    };
    $(input).keydown(function(e) {
      $(completion).html('');
      if (e.keyCode === 9) {
        tabcomplete();
        return e.preventDefault();
      }
    });
    return $(input).keyup(function(e) {
      switch (e.keyCode) {
        case 13:
          history(command());
          execute(command());
          $(input).val('');
          return $(input).focus();
      }
    });
  });

}).call(this);
