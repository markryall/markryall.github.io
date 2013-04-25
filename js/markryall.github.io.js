(function() {
  $(function() {
    var commands;

    commands = function(command, term) {
      switch (command) {
        case 'help':
          term.echo("available commands are help");
          break;
        default:
          term.echo("unknown command");
      }
    };
    return $('body').terminal(commands, {
      greetings: 'welcome',
      onBlur: function() {
        return false;
      }
    });
  });

}).call(this);
