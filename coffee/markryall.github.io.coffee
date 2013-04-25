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
    lastfm: -> open 'http://last.fm/user/mryall',
    eval: (strings...) ->
      result = window.eval strings.join ' '
      say this, String(result) if result
  }

  ls = ''
  ls += "#{key}\n" for key of commands
  commands['ls'] = -> say this, ls

  $('body').terminal commands,
    greetings: 'welcome',
    tabcompletion: true,
    onBlur: -> false,
