(function() {
  var __slice = [].slice;

  $(function() {
    var commands, contact, date, email, feedback, links, ls, music, name, open, push, say;

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
    name = '';
    email = '';
    feedback = {
      name: function(string) {
        name = string;
        return say(this, "name set to " + string);
      },
      email: function(string) {
        email = string;
        return say(this, "email set to " + string);
      },
      comment: function() {
        var content, strings, term;

        strings = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        term = this;
        content = strings.join(' ');
        $.ajax({
          url: 'http://feedmeplease.herokuapp.com/comments/create',
          data: {
            'comment': {
              'name': name,
              'email': email,
              'body': content
            }
          },
          type: 'post',
          success: function(data) {
            return say(term, 'thanks for the feedback');
          }
        });
      }
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
    date = function(string) {
      var seconds, time;

      seconds = parseInt(string);
      time = moment(seconds * 1000);
      return time.fromNow();
    };
    music = function(term) {
      $.ajax({
        url: 'http://ws.audioscrobbler.com/2.0/',
        data: {
          'method': 'user.getrecenttracks',
          'nowplaying': 'true',
          'user': 'mryall',
          'api_key': '21f8c75ad38637220b20a03ad61219a4',
          'format': 'json'
        },
        success: function(data) {
          var display, track, _i, _len, _ref, _results;

          display = function(track) {
            var description, message;

            description = "" + track.name + " by " + track.artist['#text'] + " from " + track.album['#text'];
            message = track['@attr'] && track['@attr'].nowplaying ? "Now listening to " + description : "" + (date(track.date.uts)) + ": " + description;
            return term.echo(message);
          };
          _ref = data.recenttracks.track;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            track = _ref[_i];
            _results.push(display(track));
          }
          return _results;
        }
      });
    };
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
      music: function() {
        return music(this);
      },
      feedback: function() {
        return push(this, feedback);
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
