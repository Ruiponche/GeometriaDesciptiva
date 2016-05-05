function Punto(){
    this.x = 0;
    this.y = 0;
    this.strokeStyle = 2;
    this.setPunto = setPunto;
    this.printPunto = printPunto;
    this.getX = getX;
    this.getY = getY;
}

function getX(){
    return this.x;
}

function getY(){
    return this.y;
}

function setPunto(x,y){
    this.strokeStyle = auxRect.getStrokeStyle();
    this.x = x;
    this.y = y;
}

function printPunto(context){
    context.beginPath();
    context.fillStyle = strokeStyle[this.strokeStyle];
    context.arc(this.x,this.y, 1, 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();
}