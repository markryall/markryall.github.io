window.schatter = (site_name, say, push) ->

  schatter_base = 'https://schatter.herokuapp.com'
  schatter_urls = {}
  schatter_token = ''
  conversations = []
  conversation = {}

  schatter = (url, params) ->
    params.url = url
    params.headers = 'Accept': 'application/json'
    params.data = {} unless params.data
    params.data.auth_token = schatter_token if schatter_token
    $.ajax params

  schatter schatter_base,
    success: (data) ->
      schatter_urls.conversations = data._links.conversations.href

  conversations = (term) ->
    if schatter_token == ''
      say term, 'please enter your token'
      return
    schatter schatter_urls.conversations,
      success: (data) ->
        conversations = data.conversations
        for conversation, i in conversations
          say term, "#{i+1} #{conversation.name}"
    return

  load_people = (conversation, callback) ->
    schatter conversation._links.people.href,
      success: (data) ->
        conversation.people = data.people
        conversation.person = {} unless conversation.person
        for person in conversation.people
          conversation.person[person.uuid] = person
        callback()

  load_messages = (conversation, callback) ->
    schatter conversation._links.messages.href,
      success: (data) ->
        conversation.messages = data.messages
        conversation.message = {} unless conversation.message
        for message in conversation.messages
          conversation.message[message.uuid] = message
        callback()

  new_message = (content, callback) ->
    schatter conversation._links.messages.href,
      type: 'post',
      data:
        content: content,
      success: (data) ->
        callback()

  conversation_commands =
    say: (strings...) ->
      new_message strings.join ' ', ->
        say this, 'message created'
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
    load_people conversation, ->
      term.echo "people in this conversation:"
      for person in conversation.people
        term.echo "  #{person.email}"
    load_messages conversation, ->
        for message in conversation.messages
          term.echo "#{moment message.timestamp * 1000} #{conversation.person[message.person_id].email} #{message.content}"
    push term, conversation_commands,
      prompt: "#{site_name}/chat/#{conversation.name} > "
    return

  token: (string) ->
    schatter_token = string if string
    this.echo "token set to #{schatter_token}"
    return
  conversations: -> conversations this
  join: (index) -> join this, index

