$(function(){
  var categoryButtons = $("#div-notes-categories button");
  
  categoryButtons.on("click", function(){
    var category = $(this).attr("id").substring(4);
    location.href="/d/notes_" + category;
  });
});