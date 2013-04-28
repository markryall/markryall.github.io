window.schatter = ->

  schatter_urls = {}
  auth_token = ''
  conversations = []

  conversations = (term) ->
    if schatter_token == ''
      say term, 'please enter your auth token'
      return
    term = this
    $.ajax
      url:'http://schatter.herokuapp.com/comments',
      success: (data) ->
        display = (comment) ->
          time = moment comment.created_at
          term.echo "#{time.fromNow()}: #{comment.name} said #{comment.body}"
        display comment for comment in data
    return

  auth_token: (string) ->
    auth_token = string
    this.echo "auth_token set to #{string}"
    return
  conversations: -> conversations this
