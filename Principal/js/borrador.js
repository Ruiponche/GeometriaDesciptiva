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

borrador.getActive = function(){
    return this.active;
}

borrador.isBetween = function(aX,aY,bX,bY,cX,cY){
    if((aX > cX && cX > bX)||(aX < cX && cX < bX)||(aX == cX && cX == bX))
        if((aY > cY && cY > bY)||(aY < cY && cY < bY)||(aY == cY && cY == bY))
            return true;
    return false;
}

borrador.intersect = function(x1,x2,y1,y2,xC,yC,r,i){  //devuelve las rotaciones sobre la linea original
    x1 = x1 -xC;
    x2 = x2 -xC;
    y1 = y1 -yC;
    y2 = y2 -yC;
    var abc = findGeneralLineEquation(x1,x2,y1,y2);
    var a=0,b=0,c=0;
    a = abc[0]; b = abc[1]; c = abc[2]; 
    //c = c - (a*xC) - (b*yC);
    var iX1=0, iX2=0, iY1=0, iY2=0; //puntos de interseccion
    var exp = 0;
    exp = Math.pow(r,2) * (Math.pow(a,2) + Math.pow(b,2)) - Math.pow(c,2); 
    if (exp <0 ) {return;} // no hubo interseccion 

    exp = Math.sqrt(exp);
    iX1 = ((a * c )+ b * exp)/(Math.pow(a,2) + Math.pow(b,2));
    iX2 = ((a * c )- b * exp)/(Math.pow(a,2) + Math.pow(b,2));
    iY1 = ((b * c )- a * exp)/(Math.pow(a,2) + Math.pow(b,2));
    iY2 = ((b * c )+ a * exp)/(Math.pow(a,2) + Math.pow(b,2));

     iX1 = -iX1 +xC ;
     iX2 = -iX2 +xC;
     iY1 = -iY1 +yC;
     iY2 = -iY2 +yC;
    //codigo para dibujar intersecciones
    // var p1 = [iX1,iY1];
    // var p2 = [iX2,iY2];

    // p1 = point.rotate(rectas[i].getRotation(),p1[0],p1[1],0,0);
    // p2 = point.rotate(rectas[i].getRotation(),p2[0],p2[1],0,0);
    // console.log(rectas[i].getRotation());
    // var t = rectas[i].getTranslation();
    // p1 = point.translate(t[0],t[1],p1[0], p1[1]);
    // p2 = point.translate(t[0],t[1],p2[0], p2[1]);

    // this.intersections[0] = p1[0]; 
    // this.intersections[1] = p1[1]; 
    // this.intersections[2] = p2[0]; 
    // this.intersections[3] = p2[1]; 


    var btw1 = false, btw2 = false;
    a = rectas[i].getStartPoint();
    b = rectas[i].getEndPoint();
    //console.log("ax="+a[0] + "  ay="+a[1]+"  bx="+b[0]+"  by="+b[1] + "  cx="+iX1+"  cy="+iY1 );

    btw1 = borrador.isBetween(a[0],a[1],b[0],b[1],iX1,iY1);
    btw2 = borrador.isBetween(a[0],a[1],b[0],b[1],iX2,iY2);

    if(btw1 ==true && btw2 ==true){
        var newLine = jQuery.extend(true, {}, rectas[i]);
        if (distance(a[0],a[1],iX1,iY1) < distance(b[0],b[1],iX1,iY1)) { //si el borrador esta dentro de la linea
            rectas[i].setStartPoint(a[0],a[1]);
            rectas[i].setEndPoint(iX1,iY1);

            newLine.setStartPoint(iX2,iY2);
            newLine.setEndPoint(b[0],b[1]);
            rectas.push(newLine);
            return;
        };
    }
    else if(btw1 ==false && btw2 ==false){
        console.log("ninguno");
        if (iX1 < a[0] && iX2 < a[0] || iX1 < b[0] && iX2 < b[0] ||
            iX1 > a[0] && iX2 > a[0] || iX1 > b[0] && iX2 > b[0] ||
            iY1 > a[1] && iY2 > a[1] || iY1 > b[1] && iY2 > b[1] ||
            iY1 < a[1] && iY2 < a[1] || iY1 < b[1] && iY2 < b[1] ) //si la linea completamente fuera
                return;
        if(iX1 < a[0] && iX2 > b[0] || iX1 < b[0] && iX2 > a[0]  ||
           iX2 < a[0] && iX1 > b[0] || iX2 < b[0] && iX1 > a[0]  ||
           iY1 < a[1] && iY2 > b[1] || iY1 < b[1] && iY2 > a[1]  ||
           iY2 < a[1] && iY1 > b[1] || iY2 < b[1] && iY1 > a[1]  ){ //si la linea esta completamente dentro
                rectas.splice(i,1); 
                return;
            } 
    }else if(btw1 ==true && btw2 ==false){ //si 1 es el punto dentro de la interseccion
        if( distance(a[0],a[1],iX2,iY2) < distance(b[0],b[1],iX2,iY2)){ //el punto mas cercano a 2 se borra
            rectas[i].setStartPoint(iX1,iY1);
            rectas[i].setEndPoint(b[0],b[1]); 
            return;
        }else{
            rectas[i].setStartPoint(iX1,iY1);
            rectas[i].setEndPoint(a[0],a[1]); 
            return;
        }
    }else{ // bt2 es true y btw1 es false
        if(distance(a[0],a[1],iX1,iY1) < distance(b[0],b[1],iX1,iY1)){ //el punto mas cercano a 1 se borra
            rectas[i].setStartPoint(iX2,iY2);
            rectas[i].setEndPoint(b[0],b[1]); 
            return;
        }else{
            rectas[i].setStartPoint(iX2,iY2);
            rectas[i].setEndPoint(a[0],a[1]); 
            return;
        }
    }
    console.log(btw1);
    console.log(btw2);
};

borrador.checkRects = function(x,y){
    for(i = 0 ; i< rectas.length ; i++){
        startPoint = rectas[i].getStartPoint(); 
        endPoint = rectas[i].getEndPoint();
        eraserPos = borrador.getPosToLine(rectas[i],x, y);
        //console.log("ePos = "+ eraserPos[0]+","+eraserPos[1]);
        borrador.intersect(startPoint[0], endPoint[0],startPoint[1], endPoint[1],
                                    eraserPos[0],eraserPos[1],borrador.getRadius(), i);
    }
}

borrador.checkPoints = function(x,y){
    for(i = 0 ; i< puntos.length ; i++){
        if(distance(puntos[i].getX(),puntos[i].getY(),x,y) < this.radius){  //si el punto esta dentro del borrador
            puntos.splice(i,1);
        }
             
    }
}

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
        if (i==0 && borrador.getActive()){
            borrador.checkRects(e.pageX-60,e.pageY);
            borrador.checkPoints(e.pageX-60,e.pageY);
            i++;
        }
    });

    $('#myCanvas').mousemove(function(e){
        borrador.setPosition(e.pageX-60, e.pageY);
        if(i==1 && borrador.getActive()){
            borrador.checkRects(e.pageX-60,e.pageY);
            borrador.checkPoints(e.pageX-60,e.pageY);
        }
    });

    $('#myCanvas').mouseup(function(e){
        if(i==1 && borrador.getActive()){
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

    // context.arc(this.position2[0], this.position2[1], this.radius, 0, 2 * Math.PI, false);
    // context.fillStyle = this.fillStyle;
    // context.fill();

    // context.arc(this.intersections[0], this.intersections[1], 3, 0, 2 * Math.PI, false);
    // context.fillStyle = "blue";
    // context.fill();

    // context.arc(this.intersections[2], this.intersections[3], 3, 0, 2 * Math.PI, false);
    // context.fillStyle = "red";
    // context.fill();

    context.lineWidth = 1;
    context.strokeStyle = this.strokeStyle;
    context.moveTo(this.position[0]-(this.radius/3),this.position[1]);
    context.lineTo(this.position[0]+(this.radius/3),this.position[1]);
    context.moveTo(this.position[0],this.position[1]-(this.radius/3));
    context.lineTo(this.position[0],this.position[1]+(this.radius/3));
    context.stroke();
    context.closePath();
}


