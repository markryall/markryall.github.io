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
    data = {}
    data.message_id = conversation.last_message.uuid if conversation.last_message
    schatter conversation._links.messages.href,
      data: data,
      success: (data) ->
        console.log data
        conversation.new_messages = data.messages
        conversation.messages = [] unless conversation.messages
        conversation.message = {} unless conversation.message
        for message in data.messages
          conversation.messages.push message
          conversation.message[message.uuid] = message
          conversation.last_message = message
        callback()

  new_message = (content, callback) ->
    schatter conversation._links.messages.href,
      type: 'post',
      data:
        content: content,
      success: (data) ->
        callback()

  new_person = (email, callback) ->
    schatter conversation._links.people.href,
      type: 'post',
      data:
        email: email,
      success: (data) ->
        callback()

  conversation_commands =
    say: (words...) ->
      term = this
      new_message words.join(' '), ->
        say term, 'message created'
      return
    invite: (email) ->
      term = this
      new_person email, ->
        say term, "#{email} invited to conversation"
      return
    refresh: ->
      term = this
      load_messages conversation, ->
        for message in conversation.new_messages
          say term, "#{moment message.timestamp * 1000} #{conversation.person[message.person_id].email} #{message.content}"
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

