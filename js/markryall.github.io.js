(function() {
  $(function() {
    var commands, help, key, open, say;

    say = function(term, message) {
      term.echo(message);
    };
    open = function(url) {
      window.open(url);
    };
    commands = {
      twitter: function() {
        return open('http://twitter.com/markryall');
      },
      facebook: function() {
        return open('http://facebook.com/mark.ryall');
      },
      github: function() {
        return open('http://github.com/markryall');
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
      }
    };
    help = 'available commands are: ';
    for (key in commands) {
      help += "\n\t" + key;
    }
    commands['help'] = function() {
      return say(this, help);
    };
    return $('body').terminal(commands, {
      greetings: 'welcome',
      onBlur: function() {
        return false;
      }
    });
  });

}).call(this);
