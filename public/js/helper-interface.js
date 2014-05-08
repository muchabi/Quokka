
// copy paste image code adapted from 
// http://stackoverflow.com/questions/18377891/how-can-i-let-user-paste-image-data-from-the-clipboard-into-a-canvas-element-in
document.onkeydown = function(e) {return on_keyboard_action(e); }
document.onkeyup = function(e) {return on_keyboardup_action(e); }

var canvas = document.getElementById("cc");
var ctx = canvas.getContext("2d");
var ctrl_pressed = false;
var keycode;
var imgDataRef;
function on_keyboard_action(event){
  keycode = event.keyCode;  
  //ctrl
  if(keycode==17){
    if(ctrl_pressed == false)
      ctrl_pressed = true;
    if (!window.Clipboard)
      pasteCatcher.focus();
  }
}
function on_keyboardup_action(event){
	//ctrl
	if(keycode==17)
		ctrl_pressed = false;
}

//=== Clipboard ================================================================

//firefox
var pasteCatcher;
var canvasHeight = 188;
var canvasWidth = 276;
if (!window.Clipboard){
	pasteCatcher = document.createElement("div");
	pasteCatcher.setAttribute("id", "paste_ff");
	pasteCatcher.setAttribute("contenteditable", "");
	pasteCatcher.style.cssText = 'opacity:0;position:fixed;top:0px;left:0px;';
	pasteCatcher.style.marginLeft = "-20px";
	document.body.appendChild(pasteCatcher);
	pasteCatcher.focus();
	document.addEventListener("click", function(){
		//pasteCatcher.focus();
  });
	document.getElementById('paste_ff').addEventListener('DOMSubtreeModified',function(){
		if(pasteCatcher.children.length == 1){
			img = pasteCatcher.firstElementChild.src;
            
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
      console.log(img);
      imgDataRef.set(img);
			pasteCatcher.innerHTML = '';
    }
  },false);
}
//chrome
window.addEventListener("paste", pasteHandler);
function pasteHandler(e){
	if(e.clipboardData) {
		var items = e.clipboardData.items;
		if (items){
			for (var i = 0; i < items.length; i++) {
				if (items[i].type.indexOf("image") !== -1) {
					var blob = items[i].getAsFile();
					var URLObj = window.URL || window.webkitURL;
					var source = URLObj.createObjectURL(blob);
					paste_createImage(source);
        }
      }
    }
		// If we can't handle clipboard data directly (Firefox),
		// we need to read what was pasted from the contenteditable element
		else{
    }
  }
	else{
		setTimeout(paste_check_Input, 1);
  }
}
function paste_check_Input(){
	var child = pasteCatcher.childNodes[0];
	pasteCatcher.innerHTML = "";
	if (child){
		if (cild.tagName === "IMG"){
			paste_createImage(child.src);
    }
  }
}
function paste_createImage(source){
	var pastedImage = new Image();
	pastedImage.onload = function() {
    ctx.drawImage(pastedImage, 0, 0);
  }
	pastedImage.src = source;
}

$("#btn-clear").on("click", function(){
  // clear the canvas and wipe out the firebase data
  imgDataRef.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAbCAIAAAB5kqHOAAAAJUlEQVRIie3NAQkAAAwDoPUvvbU4HLSA6ZWYTCaTyWQymUzPpgH2DQiTB3XnzwAAAABJRU5ErkJggg==");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
});
//=== /Clipboard ===============================================================


$(document).ready(function () {

    //Create a reference to the img data we are syncing with.
    imgDataRef = new Firebase('https://quokka.firebaseio.com/techconnect-img-data/');
});

