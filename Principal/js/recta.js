function Recta(){
    this.startPoint = [0,0];
    this.endPoint = [0,0];
    this.translation = [0,0];
    this.rotation = [0];
    this.anchor = "none";
    this.anchoredSide = 0;
    this.lineWidth = 1;
    this.resetRecta = resetRecta;
    this.printRecta = printRecta;
    this.minValue = 999;
    this.strokeStyle = 2;
    this.setStartPoint = setStartPoint;
    this.setEndPoint = setEndPoint;
}

Recta.prototype.getStrokeStyle = function (){
    return this.strokeStyle;
};

Recta.prototype.getStrokeStyle = function (){
    return this.strokeStyle;
};

Recta.prototype.getStartPoint = function (){
    return this.startPoint;
};

Recta.prototype.getEndPoint = function (){
    return this.endPoint;
};

Recta.prototype.getTranslation = function (){
    return this.translation;
};

Recta.prototype.getRotation = function (){
    return this.rotation;
};

function setStartPoint(x,y){
    this.startPoint = [x,y];
}

function setEndPoint(x,y){
    this.endPoint = [x,y];
}


function resetRecta(){
    this.startPoint = [0,0];
    this.endPoint = [0,0];
    this.translation = [0,0];
    this.rotation = [0];
    this.anchor = "none";
    this.anchoredSide = 0;
    this.lineWidth = 1;
    this.printRecta = printRecta;
    this.minValue = 999;
    this.strokeStyle = 2;    
}

function printRecta(context){
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
    // context.moveTo(this.startPoint[0],this.startPoint[1]);
    // context.lineTo(this.endPoint[0],this.endPoint[1]);
    // context.stroke();
    context.closePath();
}