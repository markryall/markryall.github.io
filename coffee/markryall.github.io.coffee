$ ->
  commands = (command, term) ->
    switch command
      when 'help'
        term.echo "available commands are help"
      else
        term.echo "unknown command"
    return

  $('body').terminal commands,
    greetings: 'welcome',
    onBlur: -> false
