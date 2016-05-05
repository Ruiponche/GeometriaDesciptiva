var borrador = { 
    position: [0, 0],
    position2: [0, 0],
    active:false,
    radius:50,
    complete: false,
    fillStyle: "white",
    strokeStyle: "#c3c3c3",
    intersections: [0,0,0,0],
};

borrador.getRadius = function(){
    return this.radius;
}

borrador.setPosition = function(x,y){
this.position[0] = x;
this.position[1] = y;
}

borrador.setIntersections = function(intersections){
this.intersections[0]= intersections[0];
this.intersections[1]= intersections[1];
this.intersections[2]= intersections[2];
this.intersections[3]= intersections[3];
}

borrador.increaseSize = function(){
    if(this.radius<99)
        this.radius = this.radius + 1;
    document.getElementById("tamano").innerHTML = this.radius;
}

borrador.decreaseSize = function(){
    if(this.radius>1)
        this.radius = this.radius - 1;
    document.getElementById("tamano").innerHTML = this.radius;
}

borrador.getPosToLine = function(recta,x,y){
    var t = recta.getTranslation();
    var p = point.translate(x,y,-t[0],-t[1]);
        p = point.rotate(-recta.getRotation(), p[0], p[1],0,0);
    this.position2 = p;
    return p;
}

borrador.erase = function(){
    var i=0;
    $('#myCanvas').mousedown(function(e){
        if (i==0){
            i++;
        }
    });

    $('#myCanvas').mousemove(function(e){
        borrador.setPosition(e.pageX-60, e.pageY);
        if(i==1){
            for(i = 0 ; i< rectas.length ; i++){
                startPoint = rectas[i].getStartPoint(); 
                endPoint = rectas[i].getEndPoint();
                eraserPos = borrador.getPosToLine(rectas[i], e.pageX-60, e.pageY);
                //console.log("ePos = "+ eraserPos[0]+","+eraserPos[1]);
                var intersections = intersectionsSegmentCircle(startPoint[0], endPoint[0],startPoint[1], endPoint[1],
                                            eraserPos[0],eraserPos[1],borrador.getRadius());
                translation = rectas[i].getTranslation();
                var iPoint1 = iPoint2 = [0,0];
                    iPoint1 = point.rotate(rectas[i].getRotation(), intersections[0],intersections[1],0,0);
                    iPoint2 = point.rotate(rectas[i].getRotation(), intersections[2],intersections[3],0,0);
                    iPoint1 = point.translate(iPoint1[0],iPoint1[1],translation[0],translation[1]);
                    iPoint2 = point.translate(iPoint2[0],iPoint2[1],translation[0],translation[1]);
                intersections[0] = iPoint1[0]; intersections[1] = iPoint1[1];
                intersections[2] = iPoint2[0]; intersections[3] = iPoint2[1];
                borrador.setIntersections(intersections);
            }
        }
    });

    $('#myCanvas').mouseup(function(e){
        if(i==1){
            i=0;
        }
    });
}



borrador.activateDeactivate = function(){
    if(this.active){
        activeTool = false;
        this.active = false;
        canvas.style.cursor = "auto";
    }else{
        activeTool = true;
        this.active = true;
        canvas.style.cursor = "none";
        borrador.erase();
    }
    document.getElementById("tamano").innerHTML = this.radius;
}

borrador.print = function(context){
    context.beginPath();
    context.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.fillStyle;
    context.fill();

    context.arc(this.position2[0], this.position2[1], this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.fillStyle;
    context.fill();

    context.arc(this.intersections[0], this.intersections[1], 3, 0, 2 * Math.PI, false);
    context.fillStyle = "blue";
    context.fill();

    context.arc(this.intersections[2], this.intersections[3], 3, 0, 2 * Math.PI, false);
    context.fillStyle = "blue";
    context.fill();

    context.lineWidth = 1;
    context.strokeStyle = this.strokeStyle;
    context.moveTo(this.position[0]-(this.radius/3),this.position[1]);
    context.lineTo(this.position[0]+(this.radius/3),this.position[1]);
    context.moveTo(this.position[0],this.position[1]-(this.radius/3));
    context.lineTo(this.position[0],this.position[1]+(this.radius/3));
    context.stroke();
    context.closePath();
}


