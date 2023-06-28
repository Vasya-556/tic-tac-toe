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
    move = 0;

    return false;
}

function check(){
    var winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // рядки
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // стовпці
        [0, 4, 8], [2, 4, 6] // діагоналі
    ];
    
    for (var i = 0; i < winningCombinations.length; i++) {
        var [a, b, c] = winningCombinations[i];
        if (cell[a] === cell[b] && cell[a] === cell[c] && cell[a] !== '') {
            return cell[a]; // Повертаємо символ переможця ('x' або 'o')
        }
    }
    
    if (!cell.includes('')) {
        return 'tie'; // Повертаємо 'tie' у випадку нічиєї
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
        mode = 'hard';
    }
    if(move < 5)
        o_move(mode);
    else{
        move = 0;
    }

    var winner = check();
    if (winner == 'x'){
        x_counter++;
        x_score.innerHTML = `X : ${x_counter}`;
        document.getElementById('game-info').innerHTML = 'X is win';
        clearBoard();
    }
    else if (winner == 'o'){
        o_counter++;
        o_score.innerHTML = `O : ${o_counter}`;
        document.getElementById('game-info').innerHTML = 'O is win';
        clearBoard();
    }
    else if (winner == 'tie'){
        document.getElementById('game-info').innerHTML = 'TIE';
        clearBoard();
    }

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
    else if(difficulty == 'normal'){
        if (!used_cell[4])
            other = document.getElementById('b5');
        else{
            var id = generate_random();
            other = document.getElementById(`b${id}`);
        }
    }
    else if (difficulty == 'hard'){
        var bestScore = -Infinity;
        var bestMove;

        for (var i = 0; i < 9; i++) {
            if (!used_cell[i]) {
                // Спробувати зробити хід
                used_cell[i] = true;
                cell[i] = 'o';

                // Рекурсивно викликати алгоритм мінімаксу для гравця 'x'
                var score = minimax(cell, used_cell, false);

                // Скасувати хід
                used_cell[i] = false;
                cell[i] = '';

                // Оновити найкращий хід
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        other = document.getElementById(`b${bestMove + 1}`);
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

function minimax(cell, used_cell, isMaximizing) {
    var result = check();

    if (result === 'x') {
        return -1; // Гравець 'x' виграв, повертаємо -1
    } else if (result === 'o') {
        return 1; // Гравець 'o' виграв, повертаємо 1
    } else if (result === 'tie') {
        return 0; // Нічия, повертаємо 0
    }

    if (isMaximizing) {
        var bestScore = -Infinity;

        for (var i = 0; i < 9; i++) {
            if (!used_cell[i]) {
                // Спробувати зробити хід
                used_cell[i] = true;
                cell[i] = 'o';

                // Рекурсивно викликати алгоритм мінімаксу для гравця 'x'
                var score = minimax(cell, used_cell, false);

                // Скасувати хід
                used_cell[i] = false;
                cell[i] = '';

                // Оновити найкращий рахунок
                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;
    } else {
        var bestScore = Infinity;

        for (var i = 0; i < 9; i++) {
            if (!used_cell[i]) {
                // Спробувати зробити хід
                used_cell[i] = true;
                cell[i] = 'x';

                // Рекурсивно викликати алгоритм мінімаксу для гравця 'o'
                var score = minimax(cell, used_cell, true);

                // Скасувати хід
                used_cell[i] = false;
                cell[i] = '';

                // Оновити найкращий рахунок
                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }
}