var resaltador = { 
    startPoint : [0,0],
    endPoint : [0,0],
	active: false,
    translation:[0,0],
    rotation: 0,
};

resaltador.setPoints = function(x1,y1,x2,y2,rotation,transX,transY){
	resaltador.startPoint = [x1,y1];
	resaltador.endPoint = [x2,y2];
	if(arguments.length == 7){
		this.translation = [transX,transY];     //si me pasan rotacion y translacion los tomo
		this.rotation = rotation;
	}else{
		this.translation = [0,0];
		this.rotation = 0;
	}
}

resaltador.setActive = function(value){
	resaltador.active = value;
}


resaltador.print = function(context){
	context.beginPath();
	context.translate(this.translation[0],this.translation[1]);
	context.rotate(-this.rotation*Math.PI/180);
	context.lineWidth = 2;
	context.globalAlpha=1;
	context.strokeStyle = strokeStyle[4];
	context.moveTo(resaltador.startPoint[0],resaltador.startPoint[1]);
	context.lineTo(resaltador.endPoint[0],resaltador.endPoint[1]);
	context.stroke();
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.closePath();
}