$ ->
  say = (term, message) ->
    term.echo message
    return

  open = (url) ->
    window.open url
    return

  push = (term, commands, options) ->
    term.push commands, options
    return

  site_name = 'markryall'

  submenu = (term, commands, menu_name, description) ->
    term.echo description
    term.echo '(hit ctrl-d or exit to return to main menu)\n'
    push term, commands,
      prompt: "#{site_name}/#{menu_name} > "

  commands =
    chat: -> submenu this, window.schatter(site_name, say, push), 'chat', """
      here is where you will eventually be able to chat with me and other liberal like minded people

      this does not actually work quite yet but will soon

      first, you will need to log in to http://schatter.herokuapp.com to get your auth token.
      """

  $('body').terminal commands,
    greetings: "",
    prompt: "#{site_name} > ",
    tabcompletion: true,
    onBlur: -> false,
