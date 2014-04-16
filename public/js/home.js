$(function(){
  $("input[type=submit], a, button").button();

  $("#btn-phone").on("click", function(){
    alert("Hook this up to Tommy's code.");
  });
  
  $("#btn-notes").on("click", function(){
    location.href="/d/notesmenu";
  });
  
});

