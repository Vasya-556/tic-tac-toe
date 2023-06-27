var x_counter = 0;
var o_counter = 0;
var move = 0;


var used_cell = [
    false,false,false,
    false,false,false,
    false,false,false];
var cell = [
    '','','',
    '','','',
    '','',''];

function clearBoard(){
    for (var i = 0; i < 9; i++){
        used_cell[i] = false;
        cell[i] = '';
        document.getElementById(`b${i+1}`).innerHTML = '';
        document.getElementById(`b${i+1}`).disabled = false;
    }

    return false;
}

function check(){
    var isWin = null;
    if(cell[0] == 'x' && cell[1] == 'x' && cell[2] == 'x'){
        isWin = true;
    }
    else if (cell[3] == 'x' && cell[4] == 'x' && cell[5] == 'x'){
        isWin = true;
    }
    else if (cell[6] == 'x' && cell[7] == 'x' && cell[8] == 'x'){
        isWin = true;
    }

    else if (cell[0] == 'x' && cell[3] == 'x' && cell[6] == 'x'){
        isWin = true;
    }
    else if (cell[1] == 'x' && cell[4] == 'x' && cell[7] == 'x'){
        isWin = true;
    }
    else if (cell[2] == 'x' && cell[5] == 'x' && cell[8] == 'x'){
        isWin = true;
    }

    else if (cell[0] == 'x' && cell[4] == 'x' && cell[8] == 'x'){
        isWin = true;
    }
    else if (cell[6] == 'x' && cell[4] == 'x' && cell[2] == 'x'){
        isWin = true;
    }


    if(cell[0] == 'o' && cell[1] == 'o' && cell[2] == 'o'){
        isWin = false;
    }
    else if (cell[3] == 'o' && cell[4] == 'o' && cell[5] == 'o'){
        isWin = false;
    }
    else if (cell[6] == 'o' && cell[7] == 'o' && cell[8] == 'o'){
        isWin = false;
    }

    else if (cell[0] == 'o' && cell[3] == 'o' && cell[6] == 'o'){
        isWin = false;
    }
    else if (cell[1] == 'o' && cell[4] == 'o' && cell[7] == 'o'){
        isWin = false;
    }
    else if (cell[2] == 'o' && cell[5] == 'o' && cell[8] == 'o'){
        isWin = false;
    }

    else if (cell[0] == 'o' && cell[4] == 'o' && cell[8] == 'o'){
        isWin = false;
    }
    else if (cell[6] == 'o' && cell[4] == 'o' && cell[2] == 'o'){
        isWin = false;
    }

    if (isWin == true){
        x_counter++;
        x_score.innerHTML = `X : ${x_counter}`;
        for (var i = 0; i < 9; i++){
            if(used_cell[i] == false){
                var id = `b${i+1}`;
                document.getElementById(id).disabled = true;
            }
        }
    }
    
    if(isWin == false){
        o_counter++;
        o_score.innerHTML = `O : ${o_counter}`;
        for (var i = 0; i < 9; i++){
            if(used_cell[i] == false){
                var id = `b${i+1}`;
                document.getElementById(id).disabled = true;
            }
        }
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
    
    x_move(that);
    move ++;
    var radioGroup = document.querySelectorAll('input[name="radioGroup"]');
    var selectedOption;
    var mode = '';

    for (var i = 0; i < radioGroup.length; i++) {
    if (radioGroup[i].checked) {
        selectedOption = radioGroup[i].value;
        break;
    }
    }

    if (selectedOption === "option1") {
        mode = 'easy';
    } else if (selectedOption === "option2") {
        mode = 'normal';
    } else if (selectedOption === "option3") {
        mode = 'friend';
    }
    console.log(move);
    if(move < 5)
        o_move(mode);
    else{
        move = 0;
    }

    check();

    return false;
}

function x_move(that){
    disable();

    that.innerHTML = "X";
    that.style.fontSize = '70px';
    that.style.color = '#333';
    use(that.id,'x');

    enable();
}

function o_move(difficulty){

    var other;

    if(difficulty == 'easy'){
        var id = generate_random();
        other = document.getElementById(`b${id}`);
    }

    if(difficulty == 'normal'){
        if (!used_cell[4])
            other = document.getElementById('b5');
        else {
            var id = generate_random();
            other = document.getElementById(`b${id}`);
        }
        // if(cell[0] == 'x' && cell[1] == 'x')
        //     other = document.getElementById('b3');
    }

    disable();



    other.innerHTML = "O";
    other.style.fontSize = '70px';
    other.style.color = '#333';
    use(other.id,'o');

    enable();
}

function generate_random(){
    var randomNum;
    while (true){
        randomNum = Math.floor(Math.random() * 9) + 1;
        if (used_cell[randomNum - 1] == true){
            continue;
        }
        else
            break;
    }
    var number = randomNum; 
    return number;
}