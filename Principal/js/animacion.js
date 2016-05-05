      window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 10);
        };
      })();
      var auxArc = new Arco;
      var arcos = new Array;
      var auxRect = new Recta;
      var rectas = new Array;
      var puntos = new Array;

      function newArc(){
        if(!activeTool){
          auxArc.reset();
          compas.drawArc(arcos, auxArc);
        }
      }

      function newLine(){
        if(!activeTool){
          auxRect.resetRecta();
          lapiz.draw(rectas, auxRect);
        }
      }

      function animate(canvas, context, startTime) {
        context.canvas.width  = window.innerWidth-75;
        context.canvas.height = window.innerHeight-10;
        var time = (new Date()).getTime() - startTime;
        var linearSpeed = 100;
        var newX = linearSpeed * time / 2000;
        context.clearRect(0, 0, canvas.width, canvas.height);

        for(i = 0 ; i< arcos.length ; i++){
          arcos[i].print(context);
        }
        auxArc.print(context);

        for(i = 0 ; i< rectas.length ; i++){
          rectas[i].printRecta(context);
        }
        for(i = 0 ; i< puntos.length ; i++){
          puntos[i].printPunto(context);
        }
        auxRect.printRecta(context);

        if (reglaT.active) {
          reglaT.print(context);
        };

        if(resaltador.active){
          resaltador.print(context);
        };
        
        if(escuadra.active){
          escuadra.print(context);
        };

        if(cartabon.active){
          cartabon.print(context);
        };

        if(rotador.active && !rotador.hide){
          rotador.print(context);
        };        

        if(borrador.active){
          borrador.print(context);
        }; 

        requestAnimFrame(function() {
          animate(canvas, context, startTime);
        });
      }
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');


      setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(canvas, context, startTime);
      }, 1000);