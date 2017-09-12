var canvas;
var ctx;
var x;
var y;
var download;
var data;
var img;
var textcolor;
var lineHeight  = 190;
var startHeight = 550;
var lastY       = startHeight;
var maxChars    = 65;
var canvasWidth = 1750;
var canvasHeight = 2475;

var font  = '140pt HelveticaInseratLTPro';
var align = 'center';

$(window).load(function(){

  prepareExample();

  $('.thumb').on('click',function(){
    var imgId = $(this).attr('data-bg');
    img = document.getElementById(imgId);
    textcolor = $(this).attr('data-textcolor'); 
    changeBackground(); 
  });

  document.getElementById('checkboxAgreed').onchange = function () {
    document.getElementById('download_container').className = this.checked;
  };
});

function changeBackground() {
  ctx.fillStyle = textcolor;
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y);
  ctx.restore();
  text = $('#custom-text').val();
  text = text.toUpperCase();
  var newHeight = startHeight - ((lastY - startHeight) / 2);
  wrapText(ctx, text, canvas.width / 2, newHeight, canvasWidth - canvasWidth / 15, lineHeight);
}

function prepareExample() {
  img = document.getElementById('bg1');
  textcolor = $('.thumb:first').attr('data-textcolor');

  var deviceWidth = window.innerWidth;

  canvas        = document.getElementById('memecanvas');
  canvas.width  = canvasWidth;
  canvas.height = canvasHeight;

  ctx           = canvas.getContext('2d');

  x = canvas.width / 2 - img.width / 2;
  y = canvas.height / 2 - img.height / 2;

  ctx.drawImage(img, x, y);

  ctx.textAlign = align;
  ctx.lineWidth = 0;
  ctx.font      = font;
  ctx.fillStyle = textcolor;
  doTransform();

}

function doTransform() {
  text  = $('#custom-text').val();
  text = text.toUpperCase();
  chars = document.getElementById('charsLeft');

  chars.innerHTML = maxChars - text.length;

  if (text.length <= maxChars) {
    ctx.save();
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Finally, draw the image
    ctx.drawImage(img, x, y);

    ctx.restore();

    var newHeight = startHeight - ((lastY - startHeight) / 2);
    wrapText(ctx, text, canvas.width / 2, newHeight, canvasWidth - canvasWidth / 15, lineHeight);
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line  = '';

  for (var n = 0; n < words.length; n++) {
    var testLine  = line + words[n] + ' ';
    var metrics   = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line  = words[n] + ' ';
      y += lineHeight;
      lastY = y;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function downloadCanvasAsPng() {
  ReImg.fromCanvas(document.querySelector('canvas')).downloadPng();
}

function onBlur(el) {
  if (el.value == '') {
    el.value = el.defaultValue;
  }
}

function onFocus(el) {
  if (el.value == el.defaultValue) {
    el.value = '';
  }
}
