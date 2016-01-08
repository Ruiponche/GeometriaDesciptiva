      window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

      var arcos = new Array;

      function newArc(){
        var arco = new Arco();
        draw(arco);
        arcos.push(arco);
      }

      function animate(canvas, context, startTime) {
        var time = (new Date()).getTime() - startTime;
        var linearSpeed = 100;
        var newX = linearSpeed * time / 2000;
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (reglaT.active) {
          reglaT.print(context);
        };

        for(i = 0 ; i< arcos.length ; i++){
          arcos[i].print(context);
        }

        escuadra45.print(context);

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