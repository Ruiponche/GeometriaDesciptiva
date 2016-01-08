var reglaT = {
	x : 100, y : 100, 
    width : 50, height : 800,
    horizontal : false,
    print : print,
    positioning: false,
    active : false
}

function handler(e) {
    // do something
}

$("#archive").click(handler(e)); // bind the first time
$("#archive").unbind('click', handler); // unbind
$("#archive").click(handler); // bind again