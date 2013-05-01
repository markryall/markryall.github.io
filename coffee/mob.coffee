$ ->
  encode = (value) ->
    return $('<div/>').text(value).html()

  decode = (value) ->
    return $('<div/>').html(value).text()

  prompt = "~markryall &gt; "
  input = '#inputfield'
  history = '#history'

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
      else say "command not found: #{command}"

  tabcomplete = () ->

  $(input).keydown (e) ->
    if e.keyCode == 9
      tabcomplete()
      e.preventDefault()

  $(input).keyup (e) ->
    switch e.keyCode
      when 13
        command = encode $(input).val()
        history command
        execute command
        $(input).val ''
        $(input).focus()
      # when 38 # up
      # when 40 # down
