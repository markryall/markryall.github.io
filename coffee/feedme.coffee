window.feedme = ->
  comment = (slug, name, email, content, callback) ->
    data =
      comment:
        slug: slug,
        name: name,
        email: email,
        body: content
    $.ajax
      url: 'http://feedmeplease.herokuapp.com/comments/create',
      data: data,
      type: 'post',
      success: (data) ->
        callback 'thanks for the feedback'

  comments = (slug, message_callback, callback) ->
    term = this
    $.ajax
      url: "http://feedmeplease.herokuapp.com/comments/#{slug}",
      success: (data) ->
        display = (comment) ->
          time = moment comment.created_at
          message_callback "#{time.fromNow()}: #{comment.name} said #{comment.body}"
        callback data
        display comment.comment for comment in data

  comment: comment,
  comments: comments