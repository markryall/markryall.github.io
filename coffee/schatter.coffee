window.schatter = ->

  schatter_base = 'https://schatter.herokuapp.com'
  schatter_urls = {}
  schatter_token = ''
  conversations = []

  $.ajax
    url: schatter_base,
    headers:
      'Accept': 'application/json',
    success: (data) ->
      schatter_urls.conversations = data._links.conversations.href

  conversations = (term) ->
    if schatter_token == ''
      term.echo 'please enter your token'
      return
    $.ajax
      url: schatter_urls.conversations,
      data:
        auth_token: schatter_token,
      success: (data) ->
        conversations = data.conversations
        for conversation, i in conversations
          term.echo "#{i+1} #{conversation.name}"
    return

  token: (string) ->
    schatter_token = string if string
    this.echo "token set to #{schatter_token}"
    return
  conversations: -> conversations this
