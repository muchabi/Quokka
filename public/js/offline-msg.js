$(function(){
  $("button").button();
  $("#btn-send").on("click", function(){
    location.href = "/d/offline_msg_confirm";
  });
});