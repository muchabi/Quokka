$(function(){
  $("input[type=submit], a, button").button();

  $("#btn-phone").on("click", function(){
    if (Math.random() > 0.33){
      location.href="/d/contacts";
    }
    else{
      location.href="/d/offline_msg";
    }
  });
  
  $("#btn-notes").on("click", function(){
    location.href="/d/notesmenu";
  });
  
});