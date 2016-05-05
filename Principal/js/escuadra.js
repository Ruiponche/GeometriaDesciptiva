var escuadra = { 
    points: [0, 0, 0,0, 0, 0],
    active:false,
    translation:[200,200],
    rotation: 0,
    anchor: "none",
    anchoredSide: 1, //lado de la escuadra que está sobre el ancla
    anchorRotation: 0, // rotacion que le suma el ancla a la escuadra
    sideLength: 1, 
    sideAnchor:0, //lado del ancla sobre el cual está la escuadra
    lastX: 0, lastY: 0,
};


escuadra.clicked = function(x,y){  
    var test = point.translate(x,y,-this.translation[0],-this.translation[1]);
    test = point.rotate(-this.rotation, test[0], test[1],0,0);

    var vertx=[this.points[0], this.points[2], this.points[4]],
        verty=[this.points[1], this.points[3], this.points[5]];

    var i, j, c = false;
    for( i = 0, j = 2; i < 4; j = i++ ) {   //Algoritmo de Randolph Franklin
        if( ( ( verty[i] > test[1] ) != ( verty[j] > test[1] ) ) &&
            ( test[0] < ( vertx[j] - vertx[i] ) * ( test[1] - verty[i] ) / ( verty[j] - verty[i] ) + vertx[i] ) ) {
                c = !c;
        }
    }
    return c;

}

escuadra.getAnchor = function(){
	return this.anchor;
}

escuadra.unchain = function(){
    escuadra.setAnchor("none");
}

escuadra.getActive = function(){
    return this.active;
}

escuadra.getRotation = function(){
    return this.rotation;
}

escuadra.getAnchorRotation = function(side){
    switch(side){
        case 1:
            return this.rotation +180;
        break;

        case 2:
            return this.rotation + 90;
        break;

        case 3:
            return this.rotation - 45;
        break;
    }
}

escuadra.getTranslation = function(){
    return [this.translation[0], this.translation[1]];
}

escuadra.getAnchorTranslation = function(side,x,y,cartabonTranslation){
    var translation = [0,0];
    switch(side){
        case 1:
            translation = escuadra.getPointProjection(3,x,y);
            translation[1] = translation[1]+cartabonTranslation;
        break;

        case 2:
            translation = escuadra.getPointProjection(4,x,y);
            translation[0] = translation[0]-cartabonTranslation;
        break;

        case 3:
            translation = escuadra.getPointProjection(5,x,y);
            translation[0] = translation[0]+(cartabonTranslation*Math.cos(45*Math.PI/180));
            translation[1] = translation[1]-(cartabonTranslation*Math.cos(45*Math.PI/180));
        break;
    }

    translation = point.rotate(this.rotation,translation[0],translation[1],0,0 );
    translation = point.translate(translation[0],translation[1],this.translation[0],this.translation[1]);
    return translation;
}

escuadra.getLastX = function(){
    return this.lastX;
}

escuadra.getLastY = function(){
    return this.lastY;
}

escuadra.activateDeactivate = function(){
	if(!activeTool){
	    if(this.active){
	    	this.points= [0, 1, 1,1, 0, 0];
	        this.active = false;
            if(rotador.getAnchor()=="escuadra")
                rotador.setHide(true);
	    }else{
	        this.active = true;
	        this.setAttributes();
	    }
	}
}

escuadra.setTranslation = function(x,y){
    if(this.active)
        this.translation = [x,y];
}

escuadra.setRotation = function(r){
        this.rotation = r;
}

escuadra.setPosition = function(position){
	this.points[0] += position[0];
	this.points[2] += position[0];
	this.points[4] += position[0];
	this.points[1] += position[1];
	this.points[3] += position[1];
	this.points[5] += position[1];
}

escuadra.scale = function(original,s){
	this.points[0] = original[0] - s ;
	this.points[1] = original[1] + s ;
	this.points[2] = original[2] + s ;
	this.points[3] = original[3] + s ;
	this.points[4] = original[4] - s ;
	this.points[5] = original[5] - s ;
	this.sideLength =  Math.sqrt( (this.points[2]-this.points[0])*(this.points[2]-this.points[0]) + 
		(this.points[3]-this.points[1])*(this.points[3]-this.points[1]) );

}

escuadra.setAnchor = function(anchor){
    $('#escuadraunchain').fadeToggle();
	this.anchor = anchor;
}

escuadra.rotateAnchor = function(value){
	if (value) {
		if(this.anchoredSide<3){
			this.anchoredSide++;
		}else{
			this.anchoredSide = 1;
		}
	}else{
		if(this.anchoredSide>1){
			this.anchoredSide--;
		}else{
			this.anchoredSide = 3;
		}
	};
	escuadra.posOverAnchor(this.lastX,this.lastY);
}

escuadra.setanchoredSide = function(anchoredSide) {
	this.anchoredSide = anchoredSide;
}

escuadra.calculateRotation = function(){
    switch(this.anchoredSide){
        case 1:
            return 0;
        break;
        case 2:
            return 90;
        break;
        case 3:
            return 225;
        break
    }
}

escuadra.calculateTranslation = function(){  //sólo para la regla T
    if(this.anchoredSide == 1 || this.anchoredSide == 2){
        return (this.sideLength/2);
    }else{
        return 0;
    }
}

escuadra.followAnchor = function(x,y){
    if(this.anchor =="reglaT"){
        this.rotation = reglaT.getAnchorRotation(this.sideAnchor) + escuadra.calculateRotation();
        if (reglaT.horizontal) {
            if(this.sideAnchor == 1){
                this.translation = [this.lastX, reglaT.getTranslation(this.sideAnchor) - escuadra.calculateTranslation()];
            }else if(this.sideAnchor ==2){
                this.translation = [this.lastX, reglaT.getTranslation(this.sideAnchor) + escuadra.calculateTranslation()];
            }
        }else{
            if(this.sideAnchor == 1){
                this.translation = [reglaT.getTranslation(this.sideAnchor) - escuadra.calculateTranslation(), this.lastY];
            }else if(this.sideAnchor ==2){
                this.translation = [reglaT.getTranslation(this.sideAnchor) + escuadra.calculateTranslation(), this.lastY];
            }
        }
    }
}

escuadra.posOverAnchor = function(x,y){ //posicionar sobre el ancla
    this.lastX = x;
    this.lastY = y;
    if(this.anchor =="reglaT"){
        escuadra.posOverReglaT(x,y);
    }

    if(this.anchor == "cartabon"){
        escuadra.posOverCartabon(x,y);
    }
}

escuadra.posOverCartabon = function(x,y){
    var distances = [0,0,0];
    var values = [0,0];
    distances[0] = cartabon.distancePointTo1(x,y);
    distances[1] = cartabon.distancePointTo2(x,y);
    distances[2] = cartabon.distancePointTo3(x,y);
    values = findMin(distances[0],distances[1],distances[2]);
    this.rotation = cartabon.getAnchorRotation(values[1]) + escuadra.calculateRotation(); 
    this.translation = cartabon.getAnchorTranslation(values[1],x,y,escuadra.calculateTranslation());
}

escuadra.posOverReglaT = function(x,y){ //posicionar sobre el ancla
    if (reglaT.horizontal) {
        if(y< (reglaT.getY()+10)){
            this.sideAnchor = 1;
            this.rotation = reglaT.getAnchorRotation(this.sideAnchor) + escuadra.calculateRotation();
            this.translation = [x, reglaT.getTranslation(this.sideAnchor) - escuadra.calculateTranslation()];
        }else if(y> (reglaT.getY()-10)){
            this.sideAnchor = 2;
            this.rotation = reglaT.getAnchorRotation(this.sideAnchor) + escuadra.calculateRotation();
            this.translation = [x, reglaT.getTranslation(this.sideAnchor) + escuadra.calculateTranslation()];
        }
    }else{
        if(x> (reglaT.getX()+10)){
            this.sideAnchor = 2;
            this.rotation = reglaT.getAnchorRotation(this.sideAnchor) + escuadra.calculateRotation();
            this.translation = [reglaT.getTranslation(this.sideAnchor) + escuadra.calculateTranslation(), y];
        }else if(x< (reglaT.getX()-10)){
            this.sideAnchor = 1;
            this.rotation = reglaT.getAnchorRotation(this.sideAnchor) + escuadra.calculateRotation();
            this.translation = [reglaT.getTranslation(this.sideAnchor) - escuadra.calculateTranslation(), y];
        }
    };
}

escuadra.setAttributes = function(context){
	var i = 0; a=0;
	var position = [0,0];
	var d=0;
	var originalSize = [0, 0, 0,0, 0, 0];
    var lastMouseDown = [0,0];
    $('#myCanvas').mousedown(function(e) {
        lastMouseDown = [e.pageX-60, e.pageY];
        if(i==0){
        	activeTool =true;
        	position = [e.pageX, e.pageY];
        	escuadra.setPosition(position);
        i++;
        };

        if(i==2 && reglaT.clicked(e.pageX,e.pageY)==false  && cartabon.clicked(e.pageX,e.pageY)==false){
            activeTool = false;
            i=4;
        };
        if(i==4 && escuadra.clicked(e.pageX-60, e.pageY) && !activeTool){
            i=3;
        }
        if(i==4 && !escuadra.clicked(e.pageX-60, e.pageY) && !activeTool && !rotador.clicked(e.pageX-60, e.pageY)){
            rotador.setActive(false);
        }
        if(escuadra.clicked(e.pageX-60, e.pageY) && escuadra.getAnchor()=="none" && !activeTool){
            i=3;
        }
        if(rotador.clicked(e.pageX-60, e.pageY)){
            console.log("click");
            i=5;
        }
    });

    $('#myCanvas').mousemove(function(e){
        if(i==1){ //escalando
        	d = Math.sqrt((position[0]-(e.pageX-60))*(position[0]-(e.pageX-60))+((position[1]-e.pageY)*(position[1]-e.pageY)));
    		escuadra.scale(originalSize,d);
        };

        if(i==3 && escuadra.getAnchor()=="none"){
            escuadra.setTranslation(e.pageX-60, e.pageY);
            rotador.setHide(true);
        }
        if(i==3 && (escuadra.getAnchor()=="reglaT"||escuadra.getAnchor()=="cartabon")){ //eligiendo x o y  sobre la reglaT segun sea el caso
        	escuadra.posOverAnchor(e.pageX-60, e.pageY);
        };

        if(i==5 && rotador.getAnchor() == "escuadra"){
            escuadra.setRotation(rotador.rotate(e.pageX-60, e.pageY));
        }
    });

    $('#myCanvas').mouseup(function(e){
        if (i==1) {
        	i++;
        }

        if(i==2 || a==1){
            if(reglaT.clicked(e.pageX, e.pageY) ){
                escuadra.setAnchor("reglaT"); 
                i=3;
            }else if(cartabon.clicked(e.pageX, e.pageY)){
                escuadra.setAnchor("cartabon");
                i=3;
            }else{
                a=0;
            }
        }

    });
	$('#myCanvas').click(function(e){
        if(i ==3 && (escuadra.getAnchor()=="reglaT"||escuadra.getAnchor()=="cartabon") && escuadra.clicked(e.pageX-60,e.pageY) ){
            i++;
            console.log(escuadra.getAnchor());
            activeTool = false;
        };

        if(i==3 && escuadra.getAnchor()=="none"){
            i=4; a=1; //ativo el anclaje por si elij
            rotador.setPosition("escuadra",escuadra.getRotation(), escuadra.getTranslation());
        }

        if(i==5){
            i=4;
        }
        console.log("i:"+i);
	});
}

escuadra.rotateAndTranslate = function(context){
context.translate(this.translation[0],this.translation[1]);
context.rotate(-this.rotation*Math.PI/180);
}


escuadra.print = function(context){
	context.beginPath();
	escuadra.rotateAndTranslate(context);
	context.lineWidth = 1;
	context.globalAlpha=0.3;
	context.moveTo(this.points[0], this.points[1]);

	for( i=2 ; i < this.points.length-1 ; i+=2 ){
		context.lineTo( this.points[i] , this.points[i+1] )
	}

	context.fill();
	context.setTransform(1, 0, 0, 1, 0, 0); // reseteo el context

	context.closePath();
    
	
}

escuadra.getSidePoints = function(side){
    var p1 = [0,0]
        p2 = [0,0];
        switch(side){
            case 3:
                p1 = [this.points[2],this.points[3]];
                p2 = [this.points[0],this.points[1]];
            break;
            case 4:
                p1 = [this.points[4],this.points[5]];
                p2 = [this.points[0],this.points[1]];
            break;
            case 5:
                p1 = [this.points[4],this.points[5]];
                p2 = [this.points[2],this.points[3]];
            break;
        }
    return [p1[0],p1[1],p2[0],p2[1]];
}

escuadra.distancePointTo = function(x,y,side){  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
    var p = point.translate(x,y,-this.translation[0],-this.translation[1]);
        p = point.rotate(-this.rotation, p[0], p[1],0,0);
    var aux = escuadra.getSidePoints(side);
        p1 = [aux[0],aux[1]],
        p2 = [aux[2],aux[3]];
        
    var y2_y1 = p2[1] - p1[1];
        x2_x1 = p2[0] - p1[0];
        x2y1 = p2[0]*p1[1];
        y2x1 = p2[1]*p1[0];

    var distance = Math.abs(y2_y1*p[0] - x2_x1*p[1] + x2y1 - y2x1)/(Math.sqrt(Math.pow(y2_y1,2)+Math.pow(x2_x1,2)));

    return distance;
}

escuadra.distancePointTo1 = function(x,y){
    return escuadra.distancePointTo(x,y,3);
}

escuadra.distancePointTo2 = function(x,y){
    return escuadra.distancePointTo(x,y,4);
}

escuadra.distancePointTo3 = function(x,y){
    return escuadra.distancePointTo(x,y,5);
}

// escuadra.getMandB = function(side){
//     var aux = escuadra.getSidePoints(side);
//         p1 = [aux[0],aux[1]],
//         p2 = [aux[2],aux[3]];
//     var m = (p2[1] - p1[1])/(p2[0] - p1[0]);
//         b = p1[1] - (m * p1[0]);
//     return [m,b];
// }

escuadra.getPointProjection = function(side,x,y){//https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line(anothformula)
    var p = point.translate(x,y,-this.translation[0],-this.translation[1]);
        p = point.rotate(-this.rotation, p[0], p[1],0,0);
    var pointProjection = [0,0];
    switch(side){
        case 3:
            return[p[0], this.points[1]];
        break;
        case 4:
            return[this.points[0], p[1]];
        break;
        case 5:
            return [(p[0]+p[1])/2,(p[0]+p[1])/2];
        break;
    }

    return pointProjection;
}

escuadra.resaltador = function(side){
    switch(side){
        case 3:
            resaltador.setPoints(this.points[0],this.points[1],this.points[2],this.points[3],
                                this.rotation,this.translation[0],this.translation[1]);
        break;
        case 4:
            resaltador.setPoints(this.points[0],this.points[1],this.points[4],this.points[5],
                                this.rotation,this.translation[0],this.translation[1]);
        break;
        case 5:
            resaltador.setPoints(this.points[2],this.points[3],this.points[4],this.points[5],
                                this.rotation,this.translation[0],this.translation[1]);
        break;
    }
}
