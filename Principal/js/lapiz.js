var lapiz = {
    ready : false,
    active: false,
    done : false,
    cancel: false,
};

lapiz.setActive = function(active){
    this.active = active;
}

function setRotation(closer){
    switch(closer){
        case 3: case 4: case 5:
            return escuadra.getRotation();
        break;
        case 6: case 7: case 8:
            return cartabon.getRotation();
        break;

        default:
            return 0;
        break;
    }
}

function setTranslation(closer){
    switch(closer){
        case 3: case 4: case 5:
            return escuadra.getTranslation();
        break;
        case 6: case 7: case 8:
            return cartabon.getTranslation();
        break;
        default:
            return [0,0];
        break;
    }
}


function setPoint(closer,x,y){
    var point = [0,0];
    switch(closer){
        case 1:
            if(reglaT.horizontal){
                point = [x,reglaT.getY1()];
            }else{
                point = [reglaT.getX1(),y];
            }
        break;
        case 2:
            if(reglaT.horizontal){
                point = [x,reglaT.getY2()];
            }else{
                point = [reglaT.getX2(),y];
            }
        break;
        case 3:
        case 4:
        case 5:
            point = escuadra.getPointProjection(closer,x,y);    //obtener la proyeccion del punto x,y sobre la recta R
        break;
        case 6:
        case 7:
        case 8:
            point = cartabon.getPointProjection(closer,x,y);
        default:
        break;
    }
    return point;
};

$('#lapiz').click(function() {
    if(!lapiz.active){
        lapiz.active = true;
        lapiz.drawRecta();
        lapiz.cancel = false;
    }
    else{
        lapiz.active = false;
        console.log("yeah");
        lapiz.cancel = true;
     }
});

lapiz.drawRecta = function(){
	var line = new Recta;
    var distances = [100,100,100,100,100,100,100,100]; //distancias a los lados de la regla T y escuadras
    var i = 0,j=0 ;
    var closer;

    $('#9hl').click(function() {
        if(i<2)
            auxRect.strokeStyle = line.strokeStyle = 0;
    });
    $('#2hl').click(function() {
        if(i<2)
            auxRect.strokeStyle = line.strokeStyle = 1;
    });
    $('#2bl').click(function() {
        if(i<2)
            auxRect.strokeStyle = line.strokeStyle = 2;
    });
    $('#9bl').click(function() {
        if(i<2)
            auxRect.strokeStyle = line.strokeStyle = 3;
    });
    
    activeTool = true;
    $('#myCanvas').mousemove(function(e){
        if(j==1){
            var point = new Punto;
            point.setPunto(e.pageX-60,e.pageY);
            puntos.push(point);
        }
        if(lapiz.cancel){
            i=2;
            auxRect.resetRecta();
        }
        if(i==0){
            if(reglaT.getActive()){
                distances[0] = reglaT.distancePointTo1(e.pageX-60, e.pageY);
                distances[1] = reglaT.distancePointTo2(e.pageX-60, e.pageY);
            }
            if(escuadra.getActive()){
                distances[2] = escuadra.distancePointTo1(e.pageX-60, e.pageY);
                distances[3] = escuadra.distancePointTo2(e.pageX-60, e.pageY);
                distances[4] = escuadra.distancePointTo3(e.pageX-60, e.pageY);
            }
            if(cartabon.getActive()){
                distances[5] = cartabon.distancePointTo1(e.pageX-60, e.pageY);
                distances[6] = cartabon.distancePointTo2(e.pageX-60, e.pageY);
                distances[7] = cartabon.distancePointTo3(e.pageX-60, e.pageY);
                //console.log("lado 1:"+distances[5]);
                //console.log("lado 2:"+distances[6]);
                //console.log("lado 3:"+distances[7]);
            }
            values = findMin(distances[0],distances[1],distances[2],distances[3],distances[4],
                    distances[5],distances[6],distances[7]);  //values[0] valor de la d mas cercana, values[1] # linea cerca
            line.minValue = values [0]; //valor de la distancia a la linea mas cer
            closer = values[1]; //numero de linea mas cercana
            if(line.minValue < 10){
                switch(closer){
                    case 1:
                    case 2:
                        resaltador.setActive(true);
                        reglaT.resaltador(closer);
                    break;
                    case 3:
                    case 4:
                    case 5:
                        resaltador.setActive(true);
                        escuadra.resaltador(closer);
                    break;
                    case 6:
                    case 7:
                    case 8:
                        resaltador.setActive(true);
                        cartabon.resaltador(closer);
                    default:
                    break;
                } 
            }else{
                resaltador.setActive(false);
            }
        }

        if(i==1){
            auxRect.endPoint = line.endPoint = setPoint(closer,e.pageX-60,e.pageY);
        }
    });

    $('#myCanvas').mousedown(function(e) {
        if(i==0 && line.minValue < 10){
            resaltador.setActive(false);
            auxRect.startPoint = line.startPoint = setPoint(closer,e.pageX-60,e.pageY);
            auxRect.rotation = line.rotation = setRotation(closer);
            auxRect.translation = line.translation = setTranslation(closer);
            auxRect.endPoint = line.endPoint = line.startPoint;
            i++;
        }
        if(i==0 && line.minValue > 10){
            j++;
        }


    });

    $('#myCanvas').mouseup(function(e){
        if(i==0){
            var point = new Punto;
            point.setPunto(e.pageX-60,e.pageY);
            puntos.push(point);
            console.log("puntooo");
        }
        if(i==1){
            i++;
            auxRect.resetRecta();
            rectas.push(line);        
            activeTool = false;
            lapiz.active = false;
            $('#9hl').fadeToggle("fast");
            $('#2hl').fadeToggle("fast");
            $('#2bl').fadeToggle("fast");
            $('#9bl').fadeToggle("fast");
        }
        j = 0;
    });


};