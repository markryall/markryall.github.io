window.lastfm = (callback) ->
  date = (string) ->
    seconds = parseInt string
    time = moment seconds * 1000
    time.fromNow()

  $.ajax
    url: 'http://ws.audioscrobbler.com/2.0/',
    data:
      'method': 'user.getrecenttracks',
      'nowplaying': 'true',
      'user': 'mryall',
      'api_key': '21f8c75ad38637220b20a03ad61219a4',
      'format': 'json',
    success: (data) ->
      display = (track) ->
        description = "#{track.name} by #{track.artist['#text']} from #{track.album['#text']}"
        message = if track['@attr'] and track['@attr'].nowplaying
          "Now listening to #{description}"
        else
          "#{date track.date.uts}: #{description}"
        callback message
      display track for track in data.recenttracks.track