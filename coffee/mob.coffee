$ ->
  encode = (value) -> $('<div/>').text(value).html()
  decode = (value) -> $('<div/>').html(value).text()

  email = 'mark@ryall.name'
  input = $ '#input'
  history = $ '#history'
  completion = $ '#completion'
  question = $ '#question'
  terminal = $ '#terminal'
  ps1 = $ '#PS1'
  query = $ '#query'
  answer = $ '#answer'
  repository = 'https://github.com/markryall/markryall.github.io'
  commands = {}

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
  ran = (command) -> say "#{ps1.text()} #{command}"
  age = (birth) ->
    now = moment()
    time = moment birth
    display = (unit)-> say "#{now.diff(time, unit)} #{unit}"
    display unit for unit in "seconds minutes hours days weeks months years".split ' '

  comments = ->
    feedme.comments (message) -> say encode message

  comment = ->
    ask 'what is your name ? ', (name) ->
      ask 'what is your email ? ', (email) ->
        ask 'what would you like to say ? ', (content) ->
          feedme.comment name, email, content, (message) ->
            say message

  files = "Gemfile Gemfile.lock Guardfile Rakefile coffee css favicon.ico index.html js spec".split ' '

  ssh = (user) -> load_deets user

  commands_for = (data) ->
    commands =
      fork: -> open repository,
      ls: -> say files.join ' ',
      music: -> window.lastfm (track) -> say track,
      clear: clear,
      reload: reload,
      comments: comments,
      comment: comment,
      ssh: ssh
    if data
      commands.age = -> age data.birth
      for k,v of data.links
        commands[k] = -> open v

  commands_for null

  load_deets = (email) ->
    $.ajax
      url: "https://deets.herokuapp.com/deets/#{MD5 email}",
      headers:
        'Accept': 'application/json',
      success: (data) ->
        ps1.text "~#{email} > "
        commands_for data

  load_deets email

  command_regexp = new RegExp "^(\\w+)(.*)"
  execute = (command) ->
    matches = command_regexp.exec command
    if commands[matches[1]]
      commands[matches[1]] matches[2].trim()
    else
      say "command not found: #{matches[1]}"

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
