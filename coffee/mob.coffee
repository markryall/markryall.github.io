$ ->
  encode = (value) ->
    return $('<div/>').text(value).html()

  decode = (value) ->
    return $('<div/>').html(value).text()

  prompt = "~markryall &gt; "
  input = '#inputfield'
  history = '#history'
  completion = '#completion'

  say = (message) ->
    $('#history').append "<div>#{message}</div>"

  clear = () -> $('#history').html('')

  reload = () -> window.location.reload true

  history = (command) ->
    say "#{prompt} #{command}"

  $(input).focus()

  $('body').click -> $(input).focus()

  files = "Gemfile Gemfile.lock Guardfile Rakefile coffee css favicon.ico index.html js mobile spec".split ' '

  execute = (command) ->
    switch command
      when 'ls' then say files.join ' '
      when 'clear' then clear()
      when 'reload' then reload()
      when 'music' then window.lastfm (track) -> say track
      else say "command not found: #{command}"

  command = -> $(input).val()

  tabcomplete = () ->
    all = 'clear ls music reload'.split ' '
    exp = new RegExp "^#{command()}"
    matches = $.grep all, (v) -> exp.test v
    if matches.length == 1
      $(input).val matches[0]
    else
      $(completion).html(matches.join ' ')

  $(input).keydown (e) ->
    $(completion).html('')
    if e.keyCode == 9
      tabcomplete()
      e.preventDefault()

  $(input).keyup (e) ->
    switch e.keyCode
      when 13
        history command()
        execute command()
        $(input).val ''
        $(input).focus()
      # when 38 # up
      # when 40 # down
