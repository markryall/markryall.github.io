$ ->
  prompt = "&gt; "

  say = (message) ->
    $('#history').append "<div>#{message}</div>"

  history = (command) ->
    say "#{prompt} <span class=\"i\">#{command}</span>"

  $("#inputfield").focus()

  $("#inputfield").keyup (e) ->
    switch e.keyCode
      when 13
        command = $("#inputfield").val()
        history command
        $("#inputfield").val("");
        $("#inputfield").focus();