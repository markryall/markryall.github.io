$ ->
  prompt = "~markryall &gt; "
  input = '#inputfield'

  say = (message) ->
    $('#history').append "<div>#{message}</div>"

  history = (command) ->
    say "#{prompt} #{command}"

  $(input).focus()

  $('body').click -> $(input).focus()

  execute = (command) ->
    switch command
      when 'ls'
        say 'Gemfile      Gemfile.lock Guardfile    Rakefile     coffee       css          favicon.ico  index.html   js           mobile       spec'

  $(input).keyup (e) ->
    switch e.keyCode
      when 13
        command = $(input).val()
        history command
        execute command
        $(input).val ''
        $(input).focus()