$ ->
  encode = (value) -> $('<div/>').text(value).html()
  decode = (value) -> $('<div/>').html(value).text()

  prompt = "~markryall &gt; "

  input = $ '#input'
  history = $ '#history'
  completion = $ '#completion'
  question = $ '#question'
  terminal = $ '#terminal'
  query = $ '#query'
  answer = $ '#answer'

  command = -> input.val()

  feedme = window.feedme()

  say = (message) -> history.append "<div>#{message}</div>"

  answered = ->

  ask = (prompt, callback) ->
    show_question prompt
    answered = (answer) -> callback(answer)

  show_question = (prompt) ->
    question.text prompt
    answer.val ''
    terminal.hide()
    query.show()
    answer.focus()

  show_terminal = ->
    query.hide()
    terminal.show()
    input.focus()

  answer.keyup (e) ->
    switch e.keyCode
      when 27
        show_terminal()
      when 13
        a = answer.val()
        show_terminal()
        answered a

  clear = () -> history.html ''
  reload = () -> window.location.reload true
  open = (url) -> window.open url
  ran = (command) -> say "#{prompt} #{command}"
  age = ->
    now = moment()
    time = moment(-25381800000)
    display = (unit)-> say "#{now.diff(time, unit)} #{unit}"
    display unit for unit in "seconds minutes hours days weeks months years".split ' '

  comments = ->
    feedme.comments (message) -> say message

  comment = ->
    ask 'what is your name ? ', (name) ->
      ask 'what is your email ? ', (email) ->
        ask 'what would you like to say ? ', (content) ->
          feedme.comment name, email, content, (message) ->
            say message

  files = "Gemfile Gemfile.lock Guardfile Rakefile coffee css favicon.ico index.html js spec".split ' '

  skype = (account) ->
    say account
    open "skype:#{account}"

  commands =
    skype: -> skype 'mark_ryall',
    phone: -> skype '+61414740489',
    email: ->
      say 'mark@ryall.name'
      open 'mailto:mark@ryall.name',
    twitter: -> open 'http://twitter.com/markryall',
    facebook: -> open 'http://facebook.com/mark.ryall',
    github: -> open 'http://github.com/markryall',
    bitbucket: -> open 'https://bitbucket.org/markryall',
    coderwall: -> open 'https://coderwall.com/markryall',
    linkedin: -> open 'http://linkedin.com/in/markryall',
    flickr: -> open 'http://flickr.com/photos/markryall',
    aboutme: -> open 'http://about.me/markryall',
    lastfm: -> open 'http://last.fm/user/mryall',
    goodreads: -> open 'http://www.goodreads.com/user/show/1908681'
    fork: -> open 'https://github.com/markryall/markryall.github.io'
    ls: -> say files.join ' ',
    music: -> window.lastfm (track) -> say track
    clear: clear,
    reload: reload,
    age: age,
    comments: comments,
    comment: comment

  execute = (command) ->
    if commands[command]
      commands[command]()
    else
      say "command not found: #{command}"

  tabcomplete = () ->
    all = Object.keys(commands).sort()
    exp = new RegExp "^#{command()}"
    matches = $.grep all, (v) -> exp.test v
    if matches.length == 1
      input.val matches[0]
    else
      completion.html(matches.join '<br>')

  input.keydown (e) ->
    completion.html ''
    if e.keyCode == 9
      tabcomplete()
      e.preventDefault()

  input.keyup (e) ->
    switch e.keyCode
      when 13
        ran command()
        execute command()
        input.val ''
        input.focus()
      # when 38 # up
      # when 40 # down

  input.focus()

  $('body').click -> input.focus()
