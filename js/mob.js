(function() {
  $(function() {
    var execute, history, input, prompt, say;

    prompt = "~markryall &gt; ";
    input = '#inputfield';
    say = function(message) {
      return $('#history').append("<div>" + message + "</div>");
    };
    history = function(command) {
      return say("" + prompt + " " + command);
    };
    $(input).focus();
    execute = function(command) {
      switch (command) {
        case 'ls':
          return say('Gemfile      Gemfile.lock Guardfile    Rakefile     coffee       css          favicon.ico  index.html   js           mobile       spec');
      }
    };
    return $(input).keyup(function(e) {
      var command;

      switch (e.keyCode) {
        case 13:
          command = $(input).val();
          history(command);
          execute(command);
          $(input).val('');
          return $(input).focus();
      }
    });
  });

}).call(this);
