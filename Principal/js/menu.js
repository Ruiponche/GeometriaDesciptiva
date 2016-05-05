$(document).keypress(function(e) {      //shortcuts
    if(e.which == 49) {
        newArc();
       $('#9h').fadeToggle("fast");
       $('#2h').fadeToggle("fast");
       $('#2b').fadeToggle("fast");
       $('#9b').fadeToggle("fast");
    }
    if(e.which == 50) {
        reglaT.activateDeactivate();
        $('#reglaT_girar').fadeToggle();
    }
    if(e.which == 51) {
      $('#escuadraah').fadeToggle();
      $('#escuadrah').fadeToggle();
    }
    if(e.which == 52) {
        cartabon.activateDeactivate();
        $('#cartabonah').fadeToggle();
        $('#cartabonh').fadeToggle();
        $('#cartabonflip').fadeToggle();
    }
    if(e.which == 53) {
        newLine();
       $('#9hl').fadeToggle("fast");
       $('#2hl').fadeToggle("fast");
       $('#2bl').fadeToggle("fast");
       $('#9bl').fadeToggle("fast");
    }
});

   $('#9h').toggle();  //ocultar imagenes al inicio
   $('#2h').toggle();
   $('#2b').toggle();
   $('#9b').toggle();

   $('#9hl').toggle();
   $('#2hl').toggle();
   $('#2bl').toggle();
   $('#9bl').toggle();

   $('#reglaT_girar').toggle();
   
   $('#escuadraah').toggle();
   $('#escuadrah').toggle();
   $('#escuadraunchain').toggle();

  $('#cartabonah').toggle();
  $('#cartabonh').toggle();
  $('#cartabonflip').toggle();
  $('#cartabonunchain').toggle();

  $('#mas').toggle();
  $('#menos').toggle();
  $('#tamano').toggle();

$('#compas').click(function() {     //al clickear las herramientas principales
   $('#9h').fadeToggle("fast");
   $('#2h').fadeToggle("fast");
   $('#2b').fadeToggle("fast");
   $('#9b').fadeToggle("fast");
});

$('#reglaT').click(function() {
  $('#reglaT_girar').fadeToggle();
});

$('#escuadra').click(function() {
  $('#escuadraah').fadeToggle();
  $('#escuadrah').fadeToggle();
});

$('#cartabon').click(function() {
  $('#cartabonah').fadeToggle();
  $('#cartabonh').fadeToggle();
  $('#cartabonflip').fadeToggle();
});

$('#lapiz').click(function() {
   $('#9hl').fadeToggle("fast");
   $('#2hl').fadeToggle("fast");
   $('#2bl').fadeToggle("fast");
   $('#9bl').fadeToggle("fast");
});

$('#borrador').click(function() {     //al clickear las herramientas principales
   $('#mas').fadeToggle("fast");
   $('#menos').fadeToggle("fast");
   $('#tamano').fadeToggle("fast");
   borrador.activateDeactivate();
});

var interval;
document.getElementById("mas").addEventListener('mousedown',function(e) {
    interval = setInterval(function() {
        borrador.increaseSize();
    },25); // 500ms between each frame
});
document.getElementById("mas").addEventListener('mouseup',function(e) {
    clearInterval(interval);
});
// Thank you, Timo002, for your contribution!
// This code will stop the interval if you move your mouse away from the button while still holding it.
document.getElementById("mas").addEventListener('mouseout',function(e) {
    clearInterval(interval);
});

document.getElementById("menos").addEventListener('mousedown',function(e) {
    interval = setInterval(function() {
        borrador.decreaseSize();
    },10); // 500ms between each frame
});
document.getElementById("menos").addEventListener('mouseup',function(e) {
    clearInterval(interval);
});
// Thank you, Timo002, for your contribution!
// This code will stop the interval if you move your mouse away from the button while still holding it.
document.getElementById("menos").addEventListener('mouseout',function(e) {
    clearInterval(interval);
});


function dlCanvas() {
  var activeTools = [0,0,0];   
  if(reglaT.getActive()){
    activeTools[0] = 1;
    reglaT.activateDeactivate();
  }
  if(cartabon.getActive()){
    activeTools[1] = 1;
    cartabon.activateDeactivate();
  }
  if(escuadra.getActive()){
    activeTools[2] = 1;
    escuadra.activateDeactivate();
  }
  var dt = canvas.toDataURL('image/png');
  dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Lamina.png');

  if(activeTools[0]==1){
    reglaT.activateDeactivate();
  }
  if(activeTools[1]==1){
    cartabon.activateDeactivate();
  }
  if(activeTools[2]==1){
    escuadra.activateDeactivate();
  }
  this.href = dt;
};
document.getElementById("dl").addEventListener('click', dlCanvas, false);
