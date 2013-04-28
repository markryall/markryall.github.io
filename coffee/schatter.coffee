window.schatter = ->

  schatter_base = 'https://schatter.herokuapp.com'
  schatter_urls = {}
  schatter_token = ''
  conversations = []

  schatter = (url, params) ->
    params.url = url
    params.headers = 'Accept': 'application/json'
    params.data = {} unless params.data
    params.data.auth_token = schatter_token
    $.ajax params

  schatter schatter_base,
    success: (data) ->
      schatter_urls.conversations = data._links.conversations.href

  conversations = (term) ->
    if schatter_token == ''
      term.echo 'please enter your token'
      return
    schatter schatter_urls.conversations,
      success: (data) ->
        conversations = data.conversations
        for conversation, i in conversations
          term.echo "#{i+1} #{conversation.name}"
    return

  join = (term, index) ->
    if schatter_token == ''
      term.echo 'please enter your token'
      return
    i = parseInt index
    conversation = conversations[i-1]
    unless conversation
      term.echo "no conversation at index #{index}"
      return
    schatter conversation._links.people.href,
      success: (data) ->
        conversation.people = data.people
        conversation.person = {}
        term.echo "people in this conversation:"
        for person in conversation.people
          conversation.person[person.uuid] = person
          term.echo "  #{person.email}"
    schatter conversation._links.messages.href,
      success: (data) ->
        conversation.messages = data.messages
        for message in conversation.messages
          term.echo "#{moment message.timestamp * 1000} #{conversation.person[message.person_id].email} #{message.content}"
    return

  token: (string) ->
    schatter_token = string if string
    this.echo "token set to #{schatter_token}"
    return
  conversations: -> conversations this
  join: (index) -> join this, index
