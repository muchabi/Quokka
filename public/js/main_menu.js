$(function(){
  $("input[type=submit], a, button").button();

  $("#btn-phone").on("click", function(){
    location.href="/d/contacts";
  });
  
  $("#btn-notes").on("click", function(){
    location.href="/d/notes_menu";
  });
  
});