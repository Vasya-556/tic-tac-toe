var x_counter = 0;
var o_counter = 0;

var used_cell = [
    false,false,false,
    false,false,false,
    false,false,false];
var cell = [
    '','','',
    '','','',
    '','',''];


function check(){
    if(cell[1] == 'x' && cell[2] == 'x' && cell[3] == 'x'){
        alert('You win');
    }
}

function use(id,value){
    switch (id) {
        case 'b1':
            used_cell[0] = true;
            cell[0] = value;
            break;
        case 'b2':
            used_cell[1] = true;
            cell[1] = value;
            break;
        case 'b3':
            used_cell[2] = true;
            cell[2] = value;
            break;

        case 'b4':
            used_cell[3] = true;
            cell[3] = value;
            break;
        case 'b5':
            used_cell[4] = true;
            cell[4] = value;
            break;
        case 'b6':
            used_cell[5] = true;
            cell[5] = value;
            break;

        case 'b7':
            used_cell[6] = true;
            cell[6] = value;
            break;
        case 'b8':
            used_cell[7] = true;
            cell[7] = value;
            break;
        case 'b9':
            used_cell[8] = true;
            cell[8] = value;
            break;
        }
}

function disable(){
    document.getElementById("b1").disabled = true;
    document.getElementById("b2").disabled = true;
    document.getElementById("b3").disabled = true;
    
    document.getElementById("b4").disabled = true;
    document.getElementById("b5").disabled = true;
    document.getElementById("b6").disabled = true;

    document.getElementById("b7").disabled = true;
    document.getElementById("b8").disabled = true;
    document.getElementById("b9").disabled = true;
}

function enable(){
    for (var i = 0; i < 9; i++){
        if(used_cell[i] == false){
            var id = `b${i+1}`;
            document.getElementById(id).disabled = false;
        }
    }
}

function process(that){
    disable();

    check();

    that.innerHTML = "X";
    that.style.fontSize = '70px';
    that.style.color = '#333';

    use(that.id,'x');

    enable();
    

    return false;
}