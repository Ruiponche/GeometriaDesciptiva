var escalimetro = {
	startPoint : [0,0], endPoint : 100, 
    scale:  100,
    active: false,
}

escalimetro.setAttributes = function(escala){
	var i = 0;
    $('#myCanvas').mousedown(function(e) {
        if(i==0){
        	activeTool =true;
        	escala.startPoint = [e.pageX-60, e.pageY];
        i++;
        };
        if(i==1){
            i=3;
        }
    });

	$('#myCanvas').mousemove(function(e){
		if (i==1){
			escala.endPoint = [e.pageX-60, e.pageY];
		};
	});

	$('#myCanvas').mouseup(function(e){
		if (i==1){
			i++;
			escala.generatePoints();
		};
	});
}

function generatePoints(){    //extraigo la rotacion y traslacion de la linea y la sitúo horizontal en el origen
	this.rotation = this.findAngle();
	this.translation = this.startPoint;
    this.startPoint = point.translate(x,y,-this.translation[0],-this.translation[1]);
    this.endPoint = point.translate(x,y,-this.translation[0],-this.translation[1]);
    this.endPoint = point.rotate(-this.rotation, this.endPoint[0], this.endPoint[1],0,0);

    var start = 0, end = this.endPoint[0];
    var scaleMin = 4; // 4 pixeles son un centrimetro, este número cambiará dependiendo de la escala

    for(start; start < end ; start+= scaleMin){
    	console.log("lele");
    }

}

function findAngle(A,B,C) {
	var A = this.startPoint,
		B = this.endPoint,
		C = [this.endPoint[0],this.startPoint[1]];
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
}

function escala(){
	this.startPoint = [0,0]; 
    this.endPoint = [0,0];
    this.upperPoints = [];
    this.lowerPoints = [];
    this.scale = 100;
    this.rotation = 0;
    this.translation = [0,0];
}

function PrintScale(context){
    context.beginPath();
    context.translate(this.translation[0],this.translation[1]);
    context.rotate(-this.rotation*Math.PI/180);
    context.lineWidth = 1;
    context.globalAlpha=1;
    context.strokeStyle = strokeStyle[this.getStrokeStyle()];
    context.moveTo(this.startPoint[0],this.startPoint[1]);
    context.lineTo(this.endPoint[0],this.endPoint[1]);
    //console.log("xStart:"+this.startPoint[0]+"yStart:"+this.startPoint[1]);
    //console.log("xEnd:"+this.endPoint[0]+"yEnd:"+this.endPoint[1]);
    context.stroke();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.closePath();
}