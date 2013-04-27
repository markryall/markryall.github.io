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
    bitbucket: -> open 'https://bitbucket.org/markryall',
    coderwall: -> open 'https://coderwall.com/markryall',
    linkedin: -> open 'http://linkedin.com/in/markryall',
    flickr: -> open 'http://flickr.com/photos/markryall',
    aboutme: -> open 'http://about.me/markryall',
    lastfm: -> open 'http://last.fm/user/mryall',
    goodreads: -> open 'http://www.goodreads.com/user/show/1908681-mark-ryall',

    skype: -> open 'skype:mark_ryall',
    phone: -> open 'skype:+61414740489',
    mail: -> open 'mailto:mark@ryall.com',

    eval: (strings...) ->
      result = window.eval strings.join ' '
      say this, String(result) if result
  }

  ls = ''
  ls += "#{key}\n" for key of commands
  commands['ls'] = -> say this, ls

  $('body').terminal commands,
    greetings: """

    hi and welcome to this place

    hit the tab key for available commands.

    """,
    prompt: ' > ',
    tabcompletion: true,
    onBlur: -> false,
