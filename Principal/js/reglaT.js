var reglaT = {
	x : 100, y : 100, 
    width : 50, height : 2000,
    horizontal : false,
    print : print,
    positioning: false,
    active : false,
    
    /*blocked: false*/
}

/*reglaT.block = function(){
	this.blocked = true;
}

reglaT.unblock = function(){
	this.blocked = false;
}*/

reglaT.activateDeactivate = function(){
	if(!activeTool){
	    if(this.active){
	        this.active = false;
	    }else{
	        this.active = true;
	        this.positioning = false;
	    }
	}
}

reglaT.getX = function(){
	return this.x;
}

reglaT.getY = function(){
	return this.y;
}

reglaT.getX1 = function(){
	return this.x - (this.width/2);
}

reglaT.getX2 = function(){
	return this.x + (this.width/2);
}

reglaT.getY1 = function(){
	return this.y - (this.width/2);
}

reglaT.getY2 = function(){
	return this.y + (this.width/2);
}

reglaT.getActive = function(){
	return this.active;
}

reglaT.getAnchorRotation = function(side){
	if(this.horizontal){
		if(side == 1 )
			return 0;
		else if(side == 2)
			return 180;
	}else{
		if(side == 1 )
			return 90;
		else if(side == 2)
			return 270;	
	}
}

reglaT.getTranslation = function(side){
	if(this.horizontal){
		if(side == 1 )
			return this.y - (this.width)/2 ;  //el objeto anclado se encuentra encima de la reglaT
		else if(side == 2)
			return this.y + (this.width)/2;     //por debajo de la reglaT
	}else{
		if(side == 1 )
			return this.x - (this.width)/2 ;    //se encuentra a la izquierda
		else if(side == 2)
			return this.x + (this.width)/2;     //se encuentra a la derecha             
	}
}

reglaT.rotate = function(){
	if(this.horizontal){
		this.horizontal = false;
	}else{
		this.horizontal = true;
	}
	if(escuadra.getActive() && escuadra.getAnchor()=="reglaT")
		escuadra.followAnchor();
	if(cartabon.getActive() && cartabon.getAnchor()=="reglaT")
		cartabon.followAnchor();
}

reglaT.setPosition = function(x,y){
	if(this.horizontal){
		this.y = y;
	}else{
		this.x = x-60;
	}
	if(escuadra.anchor=="reglaT"){
		escuadra.followAnchor(x,y);
	}
	if(cartabon.anchor=="reglaT"){
		cartabon.followAnchor(x,y);
	}
	//console.log(x +"x , y "+y);
}

reglaT.clicked = function(x,y){
	if(this.active){
		if(this.horizontal){
			if( y < this.y + this.width/2 && y > this.y - this.width/2 ){
				return true;
			}else{
				return false;
			}
		}else{
			if( x < this.x + this.width/2 +60  && x > this.x - this.width/2 +60 ){
				return true;
			}else{
				return false;
			}
		}
	}else{
		return false;
	}
}

	$('#myCanvas').mousemove(function(e){
		if (this.positioning){
			reglaT.setPosition(e.pageX,e.pageY);
		};
	});

	$('#myCanvas').mousedown(function(e){
		if(reglaT.clicked(e.pageX, e.pageY) && !activeTool){
			this.positioning = true;
		}
		return;
	});

	$('#myCanvas').click(function(e){
		if(this.positioning){
			this.positioning = false;
		}
		return;
	});

reglaT.print = function(context){

	context.beginPath();
	context.lineWidth = 1;
	context.globalAlpha=0.2;
	if(!this.horizontal){
		context.fillRect(this.x - this.width/4 , 0 ,this.width/2,this.height);
		context.fillRect(this.x - this.width/2 , 0 ,this.width,this.height);
	}else{
		context.fillRect(0, this.y - this.width/4 ,this.height, this.width/2);
		context.fillRect(0, this.y - this.width/2 ,this.height, this.width);
	}
	context.globalAlpha=1;
	context.closePath();
}

reglaT.distancePointTo1 = function(x,y){
	if(this.horizontal){
		return Math.abs(y-(this.y-(this.width/2)));
	}else{
		return Math.abs(x-(this.x-(this.width/2)));
	}
}

reglaT.distancePointTo2 = function(x,y){
	if(this.horizontal){
		return Math.abs(y-(this.y+(this.width/2)));
	}else{
		return Math.abs(x-(this.x+(this.width/2)));
	}
}

reglaT.resaltador = function(side){
	if(this.horizontal){
		if(side == 1){
			resaltador.setPoints(0,this.y-(this.width/2), 1000,this.y-(this.width/2));
		}else{
			resaltador.setPoints(0,this.y+(this.width/2), 1000,this.y+(this.width/2));
		}
	}else{
		if(side == 1){
			resaltador.setPoints(this.x-(this.width/2),0,this.x-(this.width/2),1000);
		}else{
			resaltador.setPoints(this.x+(this.width/2),0,this.x+(this.width/2),1000);
		}	
	}
}