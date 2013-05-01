(function() {
  $(function() {
    var history, prompt, say;

    prompt = "&gt; ";
    say = function(message) {
      return $('#history').append("<div>" + message + "</div>");
    };
    history = function(command) {
      return say("" + prompt + " <span class=\"i\">" + command + "</span>");
    };
    $("#inputfield").focus();
    return $("#inputfield").keyup(function(e) {
      var command;

      switch (e.keyCode) {
        case 13:
          command = $("#inputfield").val();
          history(command);
          $("#inputfield").val("");
          return $("#inputfield").focus();
      }
    });
  });

}).call(this);
