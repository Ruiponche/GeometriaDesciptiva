function Arco(){
	this.xCentro = -1, this.yCentro = -1, 
    this.xA = -1, this.yA = -1;
    this.xB = -1, this.yB = -1;
    this.radius = 0; 
    this.startAngle = 0, this.endAngle = 0, this.lastEndAngle = 0, this.changeClock = -1;
    this.counterClockwise = true;
    this.ready = false;
    this.done = false;
    this.draw = draw;
    this.print = print;
    this.getXCentro = getXCentro;
    this.getReady = getReady;
    this.getDone = getDone;
}

function getXCentro(){	
	return this.xCentro;
};
function getYCentro(){	
	return this.xCentro;
};
function getXA(){	
	return this.xA;
};
function getYA(){	
	return this.yA;
};
function getXB(){	
	return this.xB;
};
function getYB(){	
	return this.yB;
};
function getRadius(){	
	return this.radius;
};
function getStartAngle(){	
	return this.startAngle;
};
function getEndAngle(){	
	return this.endAngle;
};
function getCounterClockwise(){	
	return this.counterClockwise;
};
function getReady(){	
	return this.ready;
};
function getDone(){	
	return this.done;
};

Arco.prototype.getYCentro = function (){
	return this.yCentro;
};
Arco.prototype.getRadius = function (){
	return this.radius;
};
Arco.prototype.getStartAngle = function (){
	return this.startAngle;
};
Arco.prototype.getEndAngle = function (){
	return this.endAngle;
};
Arco.prototype.getCounterClockwise = function (){
	return this.counterClockwise;
};


function draw(arco){
activeTool = true;
console.log("holis me estan llamando?");
  var clicks = 0;
  var i = 0;
      $('#myCanvas').click(function(e){
        if (i==0) {
        	    console.log("asignando valor");
              	arco.xCentro = e.pageX-60;
				arco.yCentro = e.pageY;
				console.log("centro "+arco.xCentro);
				arco.done = false;
              i++;
        };
      });
      $('#myCanvas').mousedown(function(e) {
        if(i==1){
        	arco.done = false;
			arco.xA = e.pageX-60;
			arco.yA = e.pageY;
			//set start angle
			arco.startAngle  = Math.atan((arco.yA - arco.yCentro) / (arco.xA - arco.xCentro)) ;
				if(arco.xCentro-arco.xA > 0 && arco.yA -arco.yCentro > 0){
			    	arco.startAngle  = arco.startAngle + Math.PI;
				};
			  	if(arco.xCentro-arco.xA > 0 && arco.yA -arco.yCentro < 0){
			    	arco.startAngle  = arco.startAngle + Math.PI;
			  	};
			//set radius
			arco.endAngle = arco.startAngle;
			arco.radius = Math.sqrt( (arco.xA-=arco.xCentro)*arco.xA + (arco.yA-=arco.yCentro)*arco.yA );
			arco.xA = e.pageX-60;
			arco.yA = e.pageY;
        i++;
        };
      });    
      $('#myCanvas').mousemove(function(e){
        if(i==2){
        	arco.xB = e.pageX-60;
		 	arco.yB= e.pageY;
		 	//set endAngle
		 	arco.endAngle  = Math.atan((arco.yB - arco.yCentro) / (arco.xB - arco.xCentro)) ;
			    if(arco.xCentro-arco.xB > 0 && arco.yB -arco.yCentro > 0){
			        arco.endAngle  = arco.endAngle + Math.PI;
			    };
			    if(arco.xCentro-arco.xB > 0 && arco.yB -arco.yCentro < 0){
			        arco.endAngle  = arco.endAngle + Math.PI;
			    };
			//set change clock
				if(Math.abs(arco.lastEndAngle - arco.endAngle) > Math.PI*1.9 ){
		    	arco.changeClock = arco.changeClock * -1;
		    	console.log("cambiando reloj");
				}
			//setConunterClockwise
		 	 	if(arco.changeClock == -1){
					if(arco.endAngle > arco.startAngle ){
					arco.counterClockwise = false;
					}else{
			      	arco.counterClockwise = true;
			    	}
		  		}
		  	arco.lastEndAngle = arco.endAngle;
		  	arco.ready = true;
        };
      });
      $('#myCanvas').mouseup(function(e){
        if (i==2) {
        	arco.done = true;
        	activeTool = false;
        	i++;
        };
      });
      console.log("centroooo "+arco.xCentro);
};

function print(context){
	context.beginPath();
	context.lineWidth = 1;
	context.globalAlpha=1;
	context.strokeStyle = 'black';
	if(this.getReady){
		context.arc(this.getXCentro(),this.getYCentro(), this.getRadius(), this.getStartAngle(), this.getEndAngle(), this.getCounterClockwise());
		context.stroke();
	}
	if(!this.getDone()){
		context.strokeStyle = 'gray';
		context.fillRect(arcos[i].getXCentro(),arcos[i].getYCentro(),3,3);
	}
	context.closePath();
}