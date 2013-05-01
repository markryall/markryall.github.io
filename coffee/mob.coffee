$ ->
  encode = (value) -> $('<div/>').text(value).html()
  decode = (value) -> $('<div/>').html(value).text()

  prompt = "~markryall &gt; "
  input = $('#inputfield')
  history = $('#history')
  completion = $('#completion')

  say = (message) -> history.append "<div>#{message}</div>"
  clear = () -> history.html ''
  reload = () -> window.location.reload true
  open = (url) -> window.open url
  ran = (command) -> say "#{prompt} #{command}"

  input.focus()

  $('body').click -> input.focus()

  files = "Gemfile Gemfile.lock Guardfile Rakefile coffee css favicon.ico index.html js mobile spec".split ' '

  execute = (command) ->
    switch command
      when 'call skype' then open 'skype:mark_ryall'
      when 'call phone' then open 'skype:+61414740489'
      when 'send email' then open 'mailto:mark@ryall.com'
      when 'ls' then say files.join ' '
      when 'clear' then clear()
      when 'reload' then reload()
      when 'music' then window.lastfm (track) -> say track
      else say "command not found: #{command}"

  command = -> input.val()

  tabcomplete = () ->
    all = 'call skype|call phone|clear|ls|music|reload|send email'.split '|'
    exp = new RegExp "^#{command()}"
    matches = $.grep all, (v) -> exp.test v
    if matches.length == 1
      input.val matches[0]
    else
      completion.html(matches.join ' ')

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
