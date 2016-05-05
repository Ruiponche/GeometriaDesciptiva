var rotador = { 
    position: [25, -25],
    radius: 4,
    active: false,
    hide: true,
    rotation: 0,
    translation: [0,0],
    anchor: "none",
    flipped: false,
};

rotador.reset = function(){
    this.position =  [25, -25];
    this.radius= 4;
    this.active= false,
    this.hide= true,
    this.rotation= 0;
    this.translation= [0,0];
    this.anchor= "none";
    this.flipped= false;   
}

rotador.getAnchor = function(value){
    return this.anchor;
}

rotador.flip = function(x,y){
    this.position = [-this.position[0], this.position[1]];
    if(!this.flipped)
        this.flipped = true;
    else
        this.flipped = false;
}

rotador.setActive = function(value){
    this.active = value;
}

rotador.setActive = function(value){
    this.active = value;
}

rotador.setHide = function(value){
    this.hide = value;
}

rotador.rotate = function(x,y){
    var p = point.translate(x,y,-this.translation[0],-this.translation[1]);
    var angle = 0;
    p[1] = -p[1];

    angle  = Math.atan(p[1] / p[0]) *(180 /Math.PI);
    if(!this.flipped) //si no esta volteada la regla
        angle = angle -45;
    else
        angle = angle -135;

        if((p[0] < 0 && p[1] < 0)  || (p[0] < 0 && p[1] > 0)){
            angle  = angle+180;
        }
        // if(p[0] < 0 &&  p[1]< 0){
        //     angle  = angle + Math.PI;
        // }
    this.rotation = angle;
    return angle;
}

rotador.clicked = function(x,y){
    var p = point.translate(x,y,-this.translation[0],-this.translation[1]);
        p = point.rotate(-this.rotation, p[0], p[1],0,0);
    var d = Math.sqrt((p[0]-this.position[0])*(p[0]-this.position[0]) + (p[1]-this.position[1])*(p[1]-this.position[1]));
    if(d < this.radius){
        return true;
    }else{
        return false;
    }
}

rotador.rotateAndTranslate = function(context){
    context.translate(this.translation[0],this.translation[1]);
    context.rotate(-this.rotation*Math.PI/180);
}

rotador.setPosition = function(anchor,rotation, translation){
    rotador.reset();
    this.hide = false;
    this.anchor = anchor;
    this.active = true;
    this.rotation = rotation;
    this.translation = translation;
}

rotador.activate = function(x,y){ //tomo el centro del triangulo que voy a girar
    this.active = true;
}

rotador.print = function(context){
    if(!activeTool){
        context.beginPath();
        context.fillStyle = 'gray';
        rotador.rotateAndTranslate(context);
        context.arc(this.position[0],this.position[1], this.radius, 0, 2 * Math.PI, false);
        context.fill();
        if(this.position[0]> 0){
            context.moveTo(this.position[0]-5,this.position[1]+5);
            context.lineTo(this.position[0]-23,this.position[1]+23);
        }else{
            context.moveTo(this.position[0]+5,this.position[1]+5);
            context.lineTo(this.position[0]+23,this.position[1]+23);          
        }
        context.stroke();
        context.closePath();
    }
}