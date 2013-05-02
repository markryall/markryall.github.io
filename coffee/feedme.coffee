window.feedme = ->
  comment = (name, email, content, callback) ->
    data =
      comment:
        name: name,
        email: email,
        body: content
    $.ajax
      url: 'http://feedmeplease.herokuapp.com/comments/create',
      data: data,
      type: 'post',
      success: (data) ->
        callback 'thanks for the feedback'

  comments = (callback) ->
    term = this
    $.ajax
      url:'http://feedmeplease.herokuapp.com/comments',
      success: (data) ->
        display = (comment) ->
          time = moment comment.created_at
          callback "#{time.fromNow()}: #{comment.name} said #{comment.body}"
        display comment for comment in data

  comment: comment,
  comments: comments