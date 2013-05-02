(function() {
  $(function() {
    var commands, open, push, say, site_name, submenu;

    say = function(term, message) {
      term.echo(message);
    };
    open = function(url) {
      window.open(url);
    };
    push = function(term, commands, options) {
      term.push(commands, options);
    };
    site_name = 'markryall';
    submenu = function(term, commands, menu_name, description) {
      term.echo(description);
      term.echo('(hit ctrl-d or exit to return to main menu)\n');
      return push(term, commands, {
        prompt: "" + site_name + "/" + menu_name + " > "
      });
    };
    commands = {
      chat: function() {
        return submenu(this, window.schatter(site_name, say, push), 'chat', "here is where you will eventually be able to chat with me and other liberal like minded people\n\nthis does not actually work quite yet but will soon\n\nfirst, you will need to log in to http://schatter.herokuapp.com to get your auth token.");
      }
    };
    return $('body').terminal(commands, {
      greetings: "",
      prompt: "" + site_name + " > ",
      tabcompletion: true,
      onBlur: function() {
        return false;
      }
    });
  });

}).call(this);
