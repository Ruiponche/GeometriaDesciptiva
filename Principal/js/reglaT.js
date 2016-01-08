var reglaT = {
	x : 100, y : 100, 
    width : 50, height : 800,
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
	         console.log("desactivandooo");
	    }else{
	        this.active = true;
	        this.positioning = false;
	    }
	}
}

reglaT.rotate = function(){
	if(this.horizontal){
		this.horizontal = false;
	}else{
		this.horizontal = true;
	}
}

reglaT.setPosition = function(x,y){
	if(this.horizontal){
		this.y = y;
	}else{
		this.x = x-60;
	}
	
	//console.log(x +"x , y "+y);
}

reglaT.clicked = function(x,y){
	if(this.active && !activeTool){
		if(this.horizontal){
			if( y < this.y + this.width/2 && y > this.y - this.width/2 ){
				console.log("fui clickeada");
				return true;
			}else{
				return false;
			}
		}else{
			if( x < this.x + this.width/2 +60  && x > this.x - this.width/2 +60 ){
				console.log("fui clickeada");
				return true;
			}else{
				return false;
			}
		}
	}else{
		return false;
	}
}

function moveReglaT(positioning, x, y){
		if (positioning){
			reglaT.setPosition(x,y);
		}
}

	$('#myCanvas').mousemove(function(e){
		if (this.positioning){
			reglaT.setPosition(e.pageX,e.pageY);
		};
	});

	$('#myCanvas').click(function(e){
		if(reglaT.clicked(e.pageX, e.pageY)){
			if(this.positioning){
				this.positioning = false;
			}else{
				this.positioning = true;
			}
		}
		return;
	});


reglaT.print = function(context){
	//console.log("positioning: " + this.positioning + ".  horizontal: " + this.horizontal );
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
	context.closePath();
}