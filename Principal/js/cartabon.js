var cartabon = { 
    points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //los ultimos seis son las coordenadas del triangulo invertido
    active:false,
    mirror: false,
    translation:[200,200],
    rotation: 0,
    anchor: "none",
    anchoredSide: 1, //lado de la cartabon que está sobre el ancla
    anchorRotation: 0,  // rotacion que le suma el ancla a la cartabon
    sideLength: 1,  // lado mas corto del cartabon
    longSideLength: 1, // lado mas largo del cartabon
    sideAnchor:0, //lado del ancla sobre el cual está la escadra
    lastX: 0, lastY: 0,
};

cartabon.clicked = function(x,y){  
    var test = point.translate(x,y,-this.translation[0],-this.translation[1]);
    test = point.rotate(-this.rotation, test[0], test[1],0,0);

    if(!this.mirror){
        var vertx=[this.points[0], this.points[2], this.points[4]],
            verty=[this.points[1], this.points[3], this.points[5]];
    }else{
        var vertx=[this.points[6], this.points[8], this.points[10]],
            verty=[this.points[7], this.points[9], this.points[11]];  
    }

    var i, j, c = false;
    for( i = 0, j = 2; i < 4; j = i++ ) {   //Copyright (c) 1970-2003, Wm. Randolph Franklin
        if( ( ( verty[i] > test[1] ) != ( verty[j] > test[1] ) ) &&
            ( test[0] < ( vertx[j] - vertx[i] ) * ( test[1] - verty[i] ) / ( verty[j] - verty[i] ) + vertx[i] ) ) {
                c = !c;
        }
    }
    return c;

}

cartabon.getAnchor = function(){
	return this.anchor;
}

cartabon.unchain = function(){
    cartabon.setAnchor("none");
}

cartabon.getAnchorRotation = function(side){
    if(!this.mirror){
        switch(side){
            case 1:
                return this.rotation +180;
            break;

            case 2:
                return this.rotation + 90;
            break;

            case 3:
                return this.rotation - 60;
            break;
        }
    }else{
        switch(side){
            case 1:
                return this.rotation +180;
            break;

            case 2:
                return this.rotation +60;
            break;

            case 3:
                return this.rotation - 90;
            break;
        }
    }
}

cartabon.getActive = function(){
    return this.active;
}

cartabon.getRotation = function(){
    return this.rotation;
}

cartabon.getTranslation = function(){
    return [this.translation[0], this.translation[1]];
}

cartabon.getAnchorTranslation = function(side,x,y,escuadraTranslation){
    var translation = [0,0];
    if(!this.mirror){
        switch(side){
            case 1:
                translation = cartabon.getPointProjection(6,x,y);
                translation[1] = translation[1]+escuadraTranslation;
            break;

            case 2:
                translation = cartabon.getPointProjection(7,x,y);
                translation[0] = translation[0]-escuadraTranslation;
            break;

            case 3:
                translation = cartabon.getPointProjection(8,x,y);
                translation[0] = translation[0]+(escuadraTranslation*Math.cos(30*Math.PI/180));
                translation[1] = translation[1]-(escuadraTranslation*Math.sin(30*Math.PI/180));
            break;
        }
    }else{
        switch(side){
            case 1:
                translation = cartabon.getPointProjection(6,x,y);
                translation[1] = translation[1]+escuadraTranslation;
            break;

            case 2:
                translation = cartabon.getPointProjection(7,x,y);
                translation[0] = translation[0]-(escuadraTranslation*Math.cos(30*Math.PI/180));
                translation[1] = translation[1]-(escuadraTranslation*Math.sin(30*Math.PI/180));
            break;

            case 3:
                translation = cartabon.getPointProjection(8,x,y);
                translation[0] = translation[0]+escuadraTranslation;
            break;
        }
    }

    translation = point.rotate(this.rotation,translation[0],translation[1],0,0 );
    translation = point.translate(translation[0],translation[1],this.translation[0],this.translation[1]);
    return translation;
}

cartabon.getMirror = function(){
    return this.mirror;
}

cartabon.setTranslation = function(x,y){
    if(this.active)
        this.translation = [x,y];
}

cartabon.setRotation = function(r){
        this.rotation = r;
}

cartabon.activateDeactivate = function(){
	if(!activeTool){
	    if(this.active){
	        this.active = false;
                if(rotador.getAnchor()=="cartabon")
                    rotador.setHide(true);
	    }else{
	        this.active = true;
	        this.setAttributes();
	    }
	}
}

cartabon.setPosition = function(position){
	this.points[0] += position[0];
	this.points[2] += position[0];
	this.points[4] += position[0];
	this.points[1] += position[1];
	this.points[3] += position[1];
	this.points[5] += position[1];
}

cartabon.scale = function(original,s){
    this.points[0] = original[0] - s ;
    this.points[1] = original[1] + (Math.sqrt(3)*s) ;
    this.points[2] = original[2] + s ;
    this.points[3] = original[3] + (Math.sqrt(3)*s) ;
    this.points[4] = original[4] - s ;
    this.points[5] = original[5] - (Math.sqrt(3)*s) ;
    this.points[6] = this.points[0];
    this.points[7] = this.points[1] ;
    this.points[8] = this.points[2] ;
    this.points[9] = this.points[3] ;
    this.points[10] = original[4] + s ;
    this.points[11] = this.points[5] ;

	this.sideLength =  2*s;
    this.longSideLength =  2 * Math.sqrt(3) *s ;

}

cartabon.setAnchor = function(anchor){
    $('#cartabonunchain').fadeToggle();
	this.anchor = anchor;
}

cartabon.rotateAnchor = function(value){
    if ((value && !this.mirror) || (!value && this.mirror)) {
        if(this.anchoredSide<3){
            this.anchoredSide++;
        }else{
            this.anchoredSide = 1;
        }
    }
    if((!value && !this.mirror)||(value && this.mirror)){
        if(this.anchoredSide>1){
            this.anchoredSide--;
        }else{
            this.anchoredSide = 3;
        }
    }
	cartabon.posOverAnchor(this.lastX,this.lastY);
}

cartabon.flip = function(){
    if(this.mirror){
        this.mirror = false;
        if(rotador.getAnchor()=="cartabon")
            rotador.flip();
    }else{
        this.mirror = true;
        if(rotador.getAnchor()=="cartabon")
            rotador.flip();
    }
    cartabon.posOverAnchor(this.lastX,this.lastY);
}

cartabon.setanchoredSide = function(anchoredSide) {
	this.anchoredSide = anchoredSide;
}

cartabon.calculateRotation = function(){
    if(!this.mirror){
        switch(this.anchoredSide){
            case 1:
                return 0;
            break;
            case 2:
                return 90;
            break;
            case 3:
                return 240;
            break
        }
    }else{
        switch(this.anchoredSide){
            case 1:
                return 0;
            break;
            case 2:
                return 270;
            break;
            case 3:
                return 120;
            break
        }
    }
}

cartabon.calculateTranslation = function(){
    switch(this.anchoredSide){
        case 1:
            return(this.longSideLength/2);
        break;
        case 2:
            return(this.sideLength/2);
        break;
        case 3:
            return 0;
        break;
    }
}

cartabon.followAnchor = function(x,y){
    if(this.anchor =="reglaT"){
        this.rotation = reglaT.getAnchorRotation(this.sideAnchor) + cartabon.calculateRotation();
        if (reglaT.horizontal) {
            if(this.sideAnchor == 1){
                this.translation = [this.lastX, reglaT.getTranslation(this.sideAnchor) - cartabon.calculateTranslation()];
            }else if(this.sideAnchor ==2){
                this.translation = [this.lastX, reglaT.getTranslation(this.sideAnchor) + cartabon.calculateTranslation()];
            }
        }else{
            if(this.sideAnchor == 1){
                this.translation = [reglaT.getTranslation(this.sideAnchor) - cartabon.calculateTranslation(), this.lastY];
            }else if(this.sideAnchor ==2){
                this.translation = [reglaT.getTranslation(this.sideAnchor) + cartabon.calculateTranslation(), this.lastY];
            }
        }
    }
}
cartabon.posOverReglaT = function(x,y){
    if (reglaT.horizontal) {
        if(y< (reglaT.getY()+10)){
            this.sideAnchor = 1;
            this.rotation = reglaT.getAnchorRotation(this.sideAnchor) + cartabon.calculateRotation();
            this.translation = [x, reglaT.getTranslation(this.sideAnchor)-cartabon.calculateTranslation()];
        }else if(y> (reglaT.getY()-10)){
            this.sideAnchor = 2;
            this.rotation = reglaT.getAnchorRotation(this.sideAnchor) + cartabon.calculateRotation();
            this.translation = [x, reglaT.getTranslation(this.sideAnchor)+cartabon.calculateTranslation()];
        }
    }else{
        if(x> (reglaT.getX()+10)){
            this.sideAnchor = 2;
            this.rotation = reglaT.getAnchorRotation(this.sideAnchor) + cartabon.calculateRotation();
            this.translation = [reglaT.getTranslation(this.sideAnchor) + cartabon.calculateTranslation(), y];
        }else if(x< (reglaT.getX()-10)){
            this.sideAnchor = 1;
            this.rotation = reglaT.getAnchorRotation(this.sideAnchor) + cartabon.calculateRotation();
            this.translation = [reglaT.getTranslation(this.sideAnchor) - cartabon.calculateTranslation(), y];
        }
    }  
}

cartabon.posOverEscuadra = function(x,y){
    var distances = [0,0,0];
    var values = [0,0];
    distances[0] = escuadra.distancePointTo1(x,y);
    distances[1] = escuadra.distancePointTo2(x,y);
    distances[2] = escuadra.distancePointTo3(x,y);
    values = findMin(distances[0],distances[1],distances[2]);
    this.rotation = escuadra.getAnchorRotation(values[1]) + cartabon.calculateRotation(); //1 = this.sideAnchor terminar!!
    this.translation = escuadra.getAnchorTranslation(values[1],x,y,cartabon.calculateTranslation());
    console.log("cartabon anclado a escuadra" + this.rotation);
}

cartabon.posOverAnchor = function(x,y){ //posicionar sobre el ancla
	this.lastX = x;
	this.lastY = y;
	if(this.anchor =="reglaT"){
        cartabon.posOverReglaT(x,y);
	}

    if(this.anchor == "escuadra"){
        cartabon.posOverEscuadra(x,y);
    }
}

cartabon.setAttributes = function(context){
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
            cartabon.setPosition(position);
        i++;
        };

        if(i==2 && reglaT.clicked(e.pageX,e.pageY)==false && escuadra.clicked(e.pageX,e.pageY)==false){
            activeTool = false;
            i=4;
        }
        if(i==4 && cartabon.clicked(e.pageX-60, e.pageY) && !activeTool){
            i=3;
        }
        if(i==4 && !cartabon.clicked(e.pageX-60, e.pageY) && !activeTool && !rotador.clicked(e.pageX-60, e.pageY)){
            rotador.setActive(false);
        }
        if(cartabon.clicked(e.pageX-60, e.pageY) && cartabon.getAnchor()=="none" && !activeTool){
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
            cartabon.scale(originalSize,d);
        };

        if(i==3 && cartabon.getAnchor()=="none"){
            cartabon.setTranslation(e.pageX-60, e.pageY);
            rotador.setHide(true);
        }
        if(i==3 && (cartabon.getAnchor()=="reglaT"||cartabon.getAnchor()=="escuadra")){ //eligiendo x o y  sobre la reglaT segun sea el caso
            cartabon.posOverAnchor(e.pageX-60, e.pageY);
        };

        if(i==5 && rotador.getAnchor() == "cartabon"){
            cartabon.setRotation(rotador.rotate(e.pageX-60, e.pageY));
        }
    });

    $('#myCanvas').mouseup(function(e){
        if (i==1) {
            i++;
        }

        if(i==2 || a==1){
            if(reglaT.clicked(e.pageX, e.pageY) ){
                cartabon.setAnchor("reglaT"); 
                i=3;
            }else if(escuadra.clicked(e.pageX, e.pageY)){
                cartabon.setAnchor("escuadra");
                i=3;
            }else{
                a=0;
            }
        }

    });
    $('#myCanvas').click(function(e){
        if(i ==3 && (cartabon.getAnchor()=="reglaT"||cartabon.getAnchor()=="escuadra") && cartabon.clicked(e.pageX-60,e.pageY) ){
            i++;
            console.log(cartabon.getAnchor());
            activeTool = false;
        };

        if(i==3 && cartabon.getAnchor()=="none"){
            i=4; a=1; //ativo el anclaje por si elij
            rotador.setPosition("cartabon",cartabon.getRotation(), cartabon.getTranslation());
            if(cartabon.getMirror())
                rotador.flip();
        }

        if(i==5){
            i=4;
        }
        console.log("i:"+i);
    });
}

cartabon.rotateAndTranslate = function(context){
context.translate(this.translation[0],this.translation[1]);
context.rotate(-this.rotation*Math.PI/180);
}


cartabon.print = function(context){
	context.beginPath();
	cartabon.rotateAndTranslate(context);
	context.lineWidth = 1;
	context.globalAlpha=0.3;
    if(!this.mirror){
    context.moveTo(this.points[0], this.points[1]);
        for( i=2 ; i < 5 ; i+=2 ){
            context.lineTo( this.points[i] , this.points[i+1] )
        }
    }else{
    context.moveTo(this.points[6], this.points[7]);
        for( i=8 ; i < 11 ; i+=2 ){
            context.lineTo( this.points[i] , this.points[i+1] )
        }
    }
	context.fill();
	context.setTransform(1, 0, 0, 1, 0, 0); // reseteo el context
	context.closePath();
}

cartabon.getSidePoints = function(side){
    var p1 = [0,0]
        p2 = [0,0];
    var m = 0;
        if(this.mirror)   //si la cartabon esta en modo espejo las coordenadas son las siguientes 6
            m=6;
        switch(side){
            case 6:
                p1 = [this.points[2+m],this.points[3+m]];
                p2 = [this.points[0+m],this.points[1+m]];
            break;
            case 7:
                p1 = [this.points[4+m],this.points[5+m]];
                p2 = [this.points[0+m],this.points[1+m]];
            break;
            case 8:
                p1 = [this.points[4+m],this.points[5+m]];
                p2 = [this.points[2+m],this.points[3+m]];
            break;
        }
    return [p1[0],p1[1],p2[0],p2[1]];
}

cartabon.distancePointTo = function(x,y,side){  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
    var p = point.translate(x,y,-this.translation[0],-this.translation[1]);
        p = point.rotate(-this.rotation, p[0], p[1],0,0);
    var aux = cartabon.getSidePoints(side);
        p1 = [aux[0],aux[1]],
        p2 = [aux[2],aux[3]];


    var y2_y1 = p2[1] - p1[1];
        x2_x1 = p2[0] - p1[0];
        x2y1 = p2[0]*p1[1];
        y2x1 = p2[1]*p1[0];
    var sqrt = Math.pow(y2_y1,2)+Math.pow(x2_x1,2);
        sqrt = Number(sqrt.toString().match(/^\d+(?:\.\d{0,2})?/));
        sqrt = Math.sqrt(sqrt);
        sqrt = Number(sqrt.toString().match(/^\d+(?:\.\d{0,2})?/));
    var distance = Math.abs(y2_y1*p[0] - x2_x1*p[1] + x2y1 - y2x1)/sqrt;

    return distance;


}

cartabon.distancePointTo1 = function(x,y){
    return cartabon.distancePointTo(x,y,6);
}

cartabon.distancePointTo2 = function(x,y){
    return cartabon.distancePointTo(x,y,7);
}

cartabon.distancePointTo3 = function(x,y){
    return cartabon.distancePointTo(x,y,8);
}

cartabon.resaltador = function(side){
    var m = 0;
        if(this.mirror)
            m=6;
    switch(side){
        case 6:
            console.log("h 6");
            resaltador.setPoints(this.points[2+m],this.points[3+m],this.points[0+m],this.points[1+m],
                                this.rotation,this.translation[0],this.translation[1]);
        break;
        case 7:
            console.log("h 7");
            resaltador.setPoints(this.points[0+m],this.points[1+m],this.points[4+m],this.points[5+m],
                                this.rotation,this.translation[0],this.translation[1]);
        break;
        case 8:
            console.log("h 9");
            resaltador.setPoints(this.points[2+m],this.points[3+m],this.points[4+m],this.points[5+m],
                                this.rotation,this.translation[0],this.translation[1]);
        break;
    }
}

cartabon.getPointProjection = function(side,x,y){//https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line(anothformula)
    var p = point.translate(x,y,-this.translation[0],-this.translation[1]);
        p = point.rotate(-this.rotation, p[0], p[1],0,0);
    var pointProjection = [0,0];
    if(side ==6){
        console.log("6");
        return[p[0], this.points[1]];
    }
    if(!this.mirror){
        switch(side){
            case 7:
                console.log("7");
                return[this.points[0], p[1]];
            break;
            case 8:
                console.log("8");
                return [(p[0] + (Math.sqrt(3)*p[1])) /4,  (Math.sqrt(3)*p[0]+ 3*p[1] ) /4];
            break;
        }
    }else{
        switch(side){
            case 8:
                console.log("7");
                return[this.points[8], p[1]];
            break;
            case 7:
                console.log("8");
                return [(p[0] - (Math.sqrt(3)*p[1])) /4,  (-Math.sqrt(3)*p[0]+ 3*p[1] ) /4];
            break;
        } 
    }

    return pointProjection;
}