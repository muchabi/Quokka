var imgDataRef;
var canvas;
var ctx;
var canvasHeight, canvasWidth;

$.extend({
    getUrlVars : function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(
            window.location.href.indexOf('?') + 1).split('&');
        for ( var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar : function(name) {
        return $.getUrlVars()[name];
    }
});

$(document).ready(function(){
  //Create a reference to the img data we are syncing with.
  imgDataRef = new Firebase('https://quokka.firebaseio.com/techconnect-img-data/');
  
  // initialize the canvas globals
  canvas = document.getElementById("canvas-scratchpad");
  ctx = canvas.getContext("2d");
  canvasHeight = canvas.height;
  canvasWidth = canvas.width;
  
  var call_contact;

  if ($.getUrlVar('name')) {
      call_contact = $.getUrlVar('name');
  } else {
      call_contact = 'Jane';
  }

  $("video").volume = 0;
  updateContact(call_contact);
  updateCallStatus(false);


  setTimeout(function(){
    updateCallStatus(true);
  },9000);
  
  
  imgDataRef.on("value", drawImg);
  
  // set the current image to nothingness
  imgDataRef.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAbCAIAAAB5kqHOAAAAJUlEQVRIie3NAQkAAAwDoPUvvbU4HLSA6ZWYTCaTyWQymUzPpgH2DQiTB3XnzwAAAABJRU5ErkJggg==");

});

var drawImg = function(snapshot){
  img = snapshot.val();
  console.log("attempting to draw image encoded as: " + img);
        
  var img2 = new Image();
  img2.onload = function(){
    var heightScaleFactor = img2.height/canvasHeight;
    var widthScaleFactor = img2.width/canvasWidth;
    var maxScaleFactor = Math.max(heightScaleFactor, widthScaleFactor);
    var newImgHeight = img2.height;
    var newImgWidth = img2.width;
    if (maxScaleFactor > 1){
      // we need to scale the image down so it fits in the canvas.
      newImgHeight = img2.height/maxScaleFactor;
      newImgWidth = img2.width/maxScaleFactor;
    }
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img2, (canvasWidth-newImgWidth)/2, (canvasHeight-newImgHeight)/2, newImgWidth, newImgHeight);
  }
  img2.src = img;
};

$(".toggle_button").click(function(e){
  var target = e.toElement;
  var isTuringOff = $(target).hasClass('toggle_button_on');
//var target = $('.'+button_id);
if(isTuringOff){
  $(target).removeClass('toggle_button_on');
}else{
  $(target).addClass('toggle_button_on');
}

if(target.id=='btn_screen_share'){
  $('#txt_screen_share').text(isTuringOff ? 'CANNOT' : 'CAN');
}else{
  $('#txt_microphone').text(isTuringOff ? 'CANNOT' : 'CAN');
}
});

$("#call_bottom").click(function(e){
  location.href="/d/contacts";
});

var updateContact = function(name, photo){
  $(".call_contact").text(name);
}

var updateCallStatus = function(isConnected){
  if(isConnected){
    $("#call_headline").removeClass('call_headline_calling');
    $("#call_headline").addClass('call_headline_connected');
    $("#call_status").text('Connected');
    $("#video-phone-ringing").hide();
    $("#div-scratchpad").show();
    $("#setup-new-conference").click();
  }else{
    $("#call_headline").addClass('call_headline_calling');
    $("#call_headline").removeClass('call_headline_connected');
    $("#call_status").text('Connecting');
    $("#video-phone-ringing").show();

    $("#video-phone-ringing")[0].play();
  }
};