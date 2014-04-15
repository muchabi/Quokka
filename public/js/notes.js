$(function(){
  var category = $("body").attr("id").substring(10);
  var questionsDivSelector = "#div-" + category + "-questions";
  var questionLinksSelector = questionsDivSelector + " a";
  
  $(questionLinksSelector).on("click", function(){
    console.log("clicked on link " + $(this).attr("id"));
    var questionIDSubstring = $(this).attr("id").substring(2);
    var questionDivSelector = "#div-" + questionIDSubstring;
    $(questionsDivSelector).hide();
    $(questionDivSelector).show();
    console.log("showed " + questionDivSelector);
  });
});