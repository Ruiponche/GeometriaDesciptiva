function Arco(){
	this.xCentro = -1, this.yCentro = -1, 
    this.xA = -1, this.yA = -1;
    this.xB = -1, this.yB = -1;
    this.radius = 0; 
    this.startAngle = 0, this.endAngle = 0, this.lastEndAngle = 0, this.changeClock = -1;
    this.counterClockwise = true;
    this.ready = false;
    this.done = false;
    this.print = print;
    this.getXCentro = getXCentro;
    this.getReady = getReady;
    this.getDone = getDone;
    this.reset = reset;
    this.strokeStyle = 2;
}

function reset(){	
	this.xCentro = -1, this.yCentro = -1, 
    this.xA = -1, this.yA = -1;
    this.xB = -1, this.yB = -1;
    this.radius = 0; 
    this.startAngle = 0, this.endAngle = 0, this.lastEndAngle = 0, this.changeClock = -1;
    this.counterClockwise = true;
    this.ready = false;
    this.done = false;
    this.strokeStyle = 2;
};

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
Arco.prototype.getXCentro = function (){
	return this.xCentro;
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
Arco.prototype.getStrokeStyle = function (){
	return this.strokeStyle;
};

function print(context){
	context.beginPath();
	context.lineWidth = 1;
	context.globalAlpha=1;
	context.strokeStyle = strokeStyle[this.getStrokeStyle()];
	if(this.getReady){
		context.arc(this.getXCentro(),this.getYCentro(), this.getRadius(), this.getStartAngle(), this.getEndAngle(), this.getCounterClockwise());
		context.stroke();
	}
	if(!this.getDone()){
		context.strokeStyle = strokeStyle[this.getStrokeStyle()];
		context.fillRect(this.getXCentro(),this.getYCentro(),3,3);
	}
	context.closePath();
}