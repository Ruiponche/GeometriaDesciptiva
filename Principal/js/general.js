var activeTool = false;
var lastX = 0; //variables auxiliares para guardar una posicion que necesitaré luego
var lastY = 0;

var point = [0,0];

point.rotate = function(angle,xR, yR, xC, yC){  //buscar matriz de rotacion
    var radians = (Math.PI / 180) * angle,
	    cos = Math.cos(radians),
	    sin = Math.sin(radians),
	    x = (cos * (xR - xC)) + (sin * (yR - yC)) + xC,
	    y = (cos * (yR - yC)) - (sin * (xR - xC)) + yC;
	return[x,y];
}

point.translate = function(x,y,xT,yT){
	x +=xT;
	y +=yT;
	return[x,y];
}

var lineWidth = [1,1,2,2,2];
var strokeStyle = ["#D9D9D9","#888888","#414141","#000000","#00F7FF"];

function distance(x1, y1,x2,y2){
    var d = Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
    return d;
}

function findMin(){  //busca el minimo valor entre las distancias a los lados de las reglas
    var i;
    var min = Infinity;
    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] < min) {
            min = arguments[i];
            closer = i+1;
        }
    }
    var values = [min,closer]
    return values; //retorna el minimo valor la regla al cual esta asociado
};

function findMin(){  //busca el minimo valor entre las distancias a los lados de las reglas
    var i;
    var min = Infinity;
    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] < min) {
            min = arguments[i];
            closer = i+1;
        }
    }
    var values = [min,closer]
    return values; //retorna el minimo valor la regla al cual esta asociado
};

//http://stackoverflow.com/questions/13242738/how-can-i-find-the-general-form-equation-of-a-line-from-two-points

function findGeneralLineEquation(x1,x2,y1,y2){
    var abc = [0,0,0];
    abc[0]= y1 - y2; //valor de a
    abc[1]= x2 - x1; //valor de b
    abc[2] = (x1-x2)*y1 + (y2-y1)*x1;//valor de c
    //console.log("a = "+abc[0]+",b = "+abc[1]+",c = "+abc[2]); 
    return abc; //retorno a, b y c
};
// stackoverflow how-can-you-determine-a-point-is-between-two-other-points-on-a-line-segment

