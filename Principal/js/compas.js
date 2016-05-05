var compas = {
    ready : false,
    active: false,
    done : false, //sirve para borrar la marca del centro del compas
    cancel: false,
};

compas.setActive = function(active){
    this.active = active;
}

$('#compas').click(function() {
    if(!compas.active){
        compas.cancel = false;
        compas.active = true;
        compas.drawArc();
    }
    else{
        compas.active = false;
        console.log("yeah");
        compas.cancel = true;
     }
});

compas.drawArc = function(){
var arco = new Arco;
activeTool = true;
  var i = 0;

        $('#9h').click(function() {
            if(i<3)
                auxArc.strokeStyle = arco.strokeStyle = 0;
        });
        $('#2h').click(function() {
            if(i<3)
                auxArc.strokeStyle = arco.strokeStyle = 1;
        });
        $('#2b').click(function() {
            if(i<3)
                auxArc.strokeStyle = arco.strokeStyle = 2;
        });
        $('#9b').click(function() {
            if(i<3)
                auxArc.strokeStyle = arco.strokeStyle = 3;
        });

      $('#myCanvas').click(function(e){
        if(compas.cancel){
            i=3;
            auxArc.reset();
        }
            
        if (i==0) {
                auxArc.xCentro = arco.xCentro = e.pageX-60;
                auxArc.yCentro = arco.yCentro = e.pageY;
                arco.done = false;
              i++;
        };
      });
      $('#myCanvas').mousedown(function(e) {
        if(compas.cancel){
            i=3;
            auxArc.reset();
        }
        if(i==1){
            auxArc.done = arco.done = false;
            auxArc.xA = arco.xA = e.pageX-60;
            auxArc.yA = arco.yA = e.pageY;
            //set start angle
            auxArc.startAngle = arco.startAngle  = Math.atan((arco.yA - arco.yCentro) / (arco.xA - arco.xCentro)) ;
                if(arco.xCentro-arco.xA > 0 && arco.yA -arco.yCentro > 0){
                    auxArc.startAngle = arco.startAngle  = arco.startAngle + Math.PI;
                };
                if(arco.xCentro-arco.xA > 0 && arco.yA -arco.yCentro < 0){
                    auxArc.startAngle = arco.startAngle  = arco.startAngle + Math.PI;
                };
            //set radius
            auxArc.endAngle = arco.endAngle = arco.startAngle;
            auxArc.radius = arco.radius = Math.sqrt( (arco.xA-=arco.xCentro)*arco.xA + (arco.yA-=arco.yCentro)*arco.yA );
            auxArc.xA = arco.xA = e.pageX-60;
            auxArc.yA = arco.yA = e.pageY;
        i++;
        };
      });    
      $('#myCanvas').mousemove(function(e){
        if(compas.cancel){
            i=3;
            auxArc.reset();
        }
        if(i==2){
            auxArc.xB = arco.xB = e.pageX-60;
            auxArc.yB = arco.yB= e.pageY;
            //set endAngle
            auxArc.endAngle = arco.endAngle  = Math.atan((arco.yB - arco.yCentro) / (arco.xB - arco.xCentro)) ;
                if(arco.xCentro-arco.xB > 0 && arco.yB -arco.yCentro > 0){
                    auxArc.endAngle = arco.endAngle  = arco.endAngle + Math.PI;
                };
                if(arco.xCentro-arco.xB > 0 && arco.yB -arco.yCentro < 0){
                    auxArc.endAngle = arco.endAngle  = arco.endAngle + Math.PI;
                };
            //set change clock
                if(Math.abs(arco.lastEndAngle - arco.endAngle) > Math.PI*1.9 ){
                auxArc.changeClock = arco.changeClock = arco.changeClock * -1;
                }
            //setConunterClockwise
                if(arco.changeClock == -1){
                    if(arco.endAngle > arco.startAngle ){
                    auxArc.counterClockwise = arco.counterClockwise = false;
                    }else{
                    auxArc.counterClockwise = arco.counterClockwise = true;
                    }
                }
            auxArc.lastEndAngle = arco.lastEndAngle = arco.endAngle;
            auxArc.ready = arco.ready = true;
        };
      });
      $('#myCanvas').mouseup(function(e){
        if(compas.cancel){
            i=3;
            auxArc.reset();
        }
        if (i==2) {
            auxArc.done = arco.done = true;
            compas.active = false;
            auxArc.reset();
            arcos.push(arco);
            activeTool = false;
            i++;
            $('#9h').fadeToggle("fast");
            $('#2h').fadeToggle("fast");
            $('#2b').fadeToggle("fast");
            $('#9b').fadeToggle("fast");
        };
      });
};
