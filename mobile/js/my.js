$(function() {
  $("#inputfield").focus();

  $("#inputfield").keyup(function(e) {
    switch(e.keyCode) {
      case 13:
        $('#history').append("<div>&gt; <span class=\"i\">"+$("#inputfield").val()+"</span></div>");
        $("#inputfield").val("");
        $("#inputfield").focus();
        break;
      case 38:
        // up
        break;
      case 40:
        // down
        break;
      default:
        // alert(e.keyCode);
    }
  });
});