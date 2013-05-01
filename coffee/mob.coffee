$ ->
  $("#inputfield").focus()

  $("#inputfield").keyup (e) ->
    switch e.keyCode
      when 13
        $('#history').append "<div>&gt; <span class=\"i\">#{$("#inputfield").val()}</span></div>"
        $("#inputfield").val("");
        $("#inputfield").focus();
      #   break
      # when 38
      #   break
      # when 40
      #   break