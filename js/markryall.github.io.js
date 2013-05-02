(function() {
  var __slice = [].slice;

  $(function() {
    var commands, email, feedback, name, open, push, say, site_name, submenu;

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
        if (name === '' || email === '') {
          this.echo('please enter your name and email before submitting a comment');
          return;
        }
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
      },
      comments: function() {
        var term;

        term = this;
        $.ajax({
          url: 'http://feedmeplease.herokuapp.com/comments',
          success: function(data) {
            var comment, display, _i, _len, _results;

            display = function(comment) {
              var time;

              time = moment(comment.created_at);
              return term.echo("" + (time.fromNow()) + ": " + comment.name + " said " + comment.body);
            };
            _results = [];
            for (_i = 0, _len = data.length; _i < _len; _i++) {
              comment = data[_i];
              _results.push(display(comment));
            }
            return _results;
          }
        });
      }
    };
    submenu = function(term, commands, menu_name, description) {
      term.echo(description);
      term.echo('(hit ctrl-d or exit to return to main menu)\n');
      return push(term, commands, {
        prompt: "" + site_name + "/" + menu_name + " > "
      });
    };
    commands = {
      feedback: function() {
        return submenu(this, feedback, 'feedback', 'here you can give me some feedback');
      },
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
