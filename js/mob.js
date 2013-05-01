(function() {
  $(function() {
    var clear, decode, encode, execute, history, input, prompt, say;

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
    history = function(command) {
      return say("" + prompt + " " + command);
    };
    $(input).focus();
    $('body').click(function() {
      return $(input).focus();
    });
    execute = function(command) {
      switch (command) {
        case 'ls':
          return say('Gemfile      Gemfile.lock Guardfile    Rakefile     coffee       css          favicon.ico  index.html   js           mobile       spec');
        case 'clear':
          return clear();
        default:
          return say("command not found: " + command);
      }
    };
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
