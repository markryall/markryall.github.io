(function() {
  var __slice = [].slice;

  $(function() {
    var commands, contact, links, ls, open, push, say;

    say = function(term, message) {
      term.echo(message);
    };
    open = function(url) {
      window.open(url);
    };
    push = function(term, commands, options) {
      term.push(commands, options);
    };
    ls = function(commands) {
      var key, list;

      list = '';
      for (key in commands) {
        list += "" + key + "\n";
      }
      return commands['ls'] = function() {
        return say(this, list);
      };
    };
    links = {
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
        return open('http://www.goodreads.com/user/show/1908681-mark-ryall');
      }
    };
    ls(links);
    contact = {
      skype: function() {
        return open('skype:mark_ryall');
      },
      phone: function() {
        return open('skype:+61414740489');
      },
      mail: function() {
        return open('mailto:mark@ryall.com');
      }
    };
    ls(contact);
    commands = {
      links: function() {
        return push(this, links, {
          prompt: 'markryall/links > '
        });
      },
      contact: function() {
        return push(this, contact, {
          prompt: 'markryall/contact > '
        });
      },
      "eval": function() {
        var result, strings;

        strings = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        result = window["eval"](strings.join(' '));
        if (result) {
          return say(this, String(result));
        }
      }
    };
    ls(commands);
    return $('body').terminal(commands, {
      greetings: "\nhi and welcome to this place\n\nhit the tab key for available commands.\n",
      prompt: 'markryall > ',
      tabcompletion: true,
      onBlur: function() {
        return false;
      }
    });
  });

}).call(this);
