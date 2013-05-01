(function() {
  $(function() {
    $("#inputfield").focus();
    return $("#inputfield").keyup(function(e) {
      switch (e.keyCode) {
        case 13:
          $('#history').append("<div>&gt; <span class=\"i\">" + ($("#inputfield").val()) + "</span></div>");
          $("#inputfield").val("");
          return $("#inputfield").focus();
      }
    });
  });

}).call(this);
