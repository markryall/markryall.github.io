(function() {
  window.lastfm = function(callback) {
    var date;

    date = function(string) {
      var seconds, time;

      seconds = parseInt(string);
      time = moment(seconds * 1000);
      return time.fromNow();
    };
    return $.ajax({
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
          return callback(message);
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

}).call(this);
