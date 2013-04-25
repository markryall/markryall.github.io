$ ->
  say = (term, message) ->
    term.echo message
    return

  open = (url) ->
    window.open url
    return

  commands = {
    twitter: -> open 'http://twitter.com/markryall',
    facebook: -> open 'http://facebook.com/mark.ryall',
    github: -> open 'http://github.com/markryall',
    linkedin: -> open 'http://linkedin.com/in/markryall',
    flickr: -> open 'http://flickr.com/photos/markryall',
    aboutme: -> open 'http://about.me/markryall',
    lastfm: -> open 'http://last.fm/user/mryall'
  }

  help = 'available commands are: '
  help += "\n\t#{key}" for key of commands
  commands['help'] = -> say this, help

  $('body').terminal commands,
    greetings: 'welcome',
    onBlur: -> false,
