var escuadra45 = { 
    puntos: [0, 0, 100,100, 0, 200],
    color: ["Red", "Blue", "Green", "White", "Black"]
};

escuadra45.print = function(context){
	context.fillStyle = '#f00';
	context.beginPath();
	context.moveTo(this.puntos[0], this.puntos[1]);
	for( i=2 ; i < this.puntos.length-1 ; i+=2 ){
		context.lineTo( this.puntos[i] , this.puntos[i+1] )
	}
	context.closePath();
	context.fill();
}
