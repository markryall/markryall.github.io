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
  name = ''
  email = ''

  feedback =
    name: (string) ->
      name = string
      say this, "name set to #{string}"
    email: (string) ->
      email = string
      say this, "email set to #{string}"
    comment: (strings...) ->
      if name == '' or email == ''
        this.echo 'please enter your name and email before submitting a comment'
        return
      term = this
      content = strings.join ' '
      $.ajax
        url:'http://feedmeplease.herokuapp.com/comments/create',
        data:
          'comment':
            'name': name,
            'email': email,
            'body': content,
        type: 'post',
        success: (data) ->
          say term, 'thanks for the feedback'
      return
    comments: () ->
      term = this
      $.ajax
        url:'http://feedmeplease.herokuapp.com/comments',
        success: (data) ->
          display = (comment) ->
            time = moment comment.created_at
            term.echo "#{time.fromNow()}: #{comment.name} said #{comment.body}"
          display comment for comment in data
      return

  submenu = (term, commands, menu_name, description) ->
    term.echo description
    term.echo '(hit ctrl-d or exit to return to main menu)\n'
    push term, commands,
      prompt: "#{site_name}/#{menu_name} > "

  commands =
    feedback: -> submenu this, feedback, 'feedback', 'here you can give me some feedback',
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
