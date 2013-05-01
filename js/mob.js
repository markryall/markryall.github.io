(function() {
  $(function() {
    var clear, decode, encode, execute, files, history, input, prompt, reload, say, tabcomplete;

    encode = function(value) {
      return $('<div/>').text(value).html();
    };
    decode = function(value) {
      return $('<div/>').html(value).text();
    };
    prompt = "~markryall &gt; ";
    input = '#inputfield';
    history = '#history';
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
        default:
          return say("command not found: " + command);
      }
    };
    tabcomplete = function() {};
    $(input).keydown(function(e) {
      if (e.keyCode === 9) {
        tabcomplete();
        return e.preventDefault();
      }
    });
    return $(input).keyup(function(e) {
      var command;

      switch (e.keyCode) {
        case 13:
          command = encode($(input).val());
          history(command);
          execute(command);
          $(input).val('');
          return $(input).focus();
      }
    });
  });

}).call(this);
