(function() {
  window.feedme = function() {
    var comment, comments;

    comment = function(name, email, content, callback) {
      var data;

      data = {
        comment: {
          name: name,
          email: email,
          body: content
        }
      };
      return $.ajax({
        url: 'http://feedmeplease.herokuapp.com/comments/create',
        data: data,
        type: 'post',
        success: function(data) {
          return callback('thanks for the feedback');
        }
      });
    };
    comments = function(callback) {
      var term;

      term = this;
      return $.ajax({
        url: 'http://feedmeplease.herokuapp.com/comments',
        success: function(data) {
          var display, _i, _len, _results;

          display = function(comment) {
            var time;

            time = moment(comment.created_at);
            return callback("" + (time.fromNow()) + ": " + comment.name + " said " + comment.body);
          };
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            comment = data[_i];
            _results.push(display(comment));
          }
          return _results;
        }
      });
    };
    return {
      comment: comment,
      comments: comments
    };
  };

}).call(this);
