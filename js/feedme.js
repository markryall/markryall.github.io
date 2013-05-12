(function() {
  window.feedme = function() {
    var comment, comments;

    comment = function(slug, name, email, content, callback) {
      var data;

      data = {
        comment: {
          slug: slug,
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
    comments = function(slug, message_callback, callback) {
      var term;

      term = this;
      return $.ajax({
        url: "http://feedmeplease.herokuapp.com/comments/" + slug,
        success: function(data) {
          var display, _i, _len, _results;

          display = function(comment) {
            var time;

            time = moment(comment.created_at);
            return message_callback("" + (time.fromNow()) + ": " + comment.name + " said " + comment.body);
          };
          callback(data);
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            comment = data[_i];
            _results.push(display(comment.comment));
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
