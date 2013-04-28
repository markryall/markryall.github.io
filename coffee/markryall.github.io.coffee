$ ->
  say = (term, message) ->
    term.echo message
    return

  open = (url) ->
    window.open url
    return

  push = (term, commands, options) ->
    term.push commands, options
    return

  site_name = 'markryall'
  name = ''
  email = ''

  feedback =
    name: (string) ->
      name = string
      say this, "name set to #{string}"
    email: (string) ->
      email = string
      say this, "email set to #{string}"
    comment: (strings...) ->
      if name == '' or email == ''
        this.echo 'please enter your name and email before submitting a comment'
        return
      term = this
      content = strings.join ' '
      $.ajax
        url:'http://feedmeplease.herokuapp.com/comments/create',
        data:
          'comment':
            'name': name,
            'email': email,
            'body': content,
        type: 'post',
        success: (data) ->
          say term, 'thanks for the feedback'
      return
    comments: () ->
      term = this
      $.ajax
        url:'http://feedmeplease.herokuapp.com/comments',
        success: (data) ->
          display = (comment) ->
            time = moment comment.created_at
            term.echo "#{time.fromNow()}: #{comment.name} said #{comment.body}"
          display comment for comment in data
      return

  links =
    twitter: -> open 'http://twitter.com/markryall',
    facebook: -> open 'http://facebook.com/mark.ryall',
    github: -> open 'http://github.com/markryall',
    bitbucket: -> open 'https://bitbucket.org/markryall',
    coderwall: -> open 'https://coderwall.com/markryall',
    linkedin: -> open 'http://linkedin.com/in/markryall',
    flickr: -> open 'http://flickr.com/photos/markryall',
    aboutme: -> open 'http://about.me/markryall',
    lastfm: -> open 'http://last.fm/user/mryall',
    goodreads: -> open 'http://www.goodreads.com/user/show/1908681-mark-ryall',

  contact =
    skype: -> open 'skype:mark_ryall',
    phone: -> open 'skype:+61414740489',
    mail: -> open 'mailto:mark@ryall.com',

  date = (string) ->
    seconds = parseInt string
    time = moment seconds * 1000
    time.fromNow()

  music = (term) ->
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
          term.echo message
        display track for track in data.recenttracks.track
    return

  submenu = (term, commands, menu_name, description) ->
    term.echo description
    term.echo '(hit ctrl-d or exit to return to main menu)\n'
    push term, commands,
      prompt: "#{site_name}/#{menu_name} > "

  commands =
    reload: -> window.location.reload true,
    links: -> submenu this, links, 'links', 'here are some links to various sites i use',
    contact: -> submenu this, contact, 'contact', 'here are some ways you can contact me',
    feedback: -> submenu this, feedback, 'feedback', 'here you can give me some feedback',
    music: -> music this,
    eval: (strings...) ->
      result = window.eval strings.join ' '
      say this, String(result) if result

  $('body').terminal commands,
    greetings: """
    hello, i am mark ryall

    this site will not work without a keyboard so please don't
    frustrate yourself if you are using a phone or tablet

    hit the tab key to see the available commands

    """,
    prompt: "#{site_name} > ",
    tabcompletion: true,
    onBlur: -> false,
