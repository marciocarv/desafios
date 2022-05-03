let board = [[0,0,0],[0,0,0],[0,0,0]];
    let result = null;
    let player1 = true;
    let player2 = false;
    let score1 = 0;
    let score2 = 0;
    let draw = 0;
    let plays = 0;
    let result_row = 0;
    let result_column = 0;
    let result_diagonalx = 0;
    let result_diagonaly = 0;
    let element;
    let resultField = document.querySelector('.winner');
    let resultGame = document.querySelector('#result');
    let turn;
    let row =[];
    let column = [];
    let diagonalx = [];
    let diagonaly = [];

    function play(i, j){

        element = document.querySelector('#p'+i+''+j);

        if(board[i][j] !== 0){
            return 0;
        }

        if(result != null){
            return 0;
        }

        if(player1){
            element.innerHTML = 'X';
            player1 = false;
            player2 = true;
            board[i][j] = 1;
            plays++;
            turn = 'Player 2 ( "O" )';
            document.querySelector('#turn').innerHTML = turn;
            if(checkDiagonal() || checkColumn() || checkRow()){
                result = 'x';
                winner(result);
            }
        }else{
            element.innerHTML = 'O';
            player1 = true;
            player2 = false;
            board[i][j] = -1;
            plays++;
            turn = 'Player 1 ( "X" )';
            document.querySelector('#turn').innerHTML = turn;
            if(checkDiagonal() || checkColumn() || checkRow()){
                result = 'o';
                winner(result);
            }
        }
        if(plays == 9 && result == null){
            winner(result);
        }
    }

    function winner(res){
        resultField.classList.remove('hidden');
        if(res == 'x'){
            resultGame.innerHTML = 'Player 1  ( X ) Win';
            score1++;
            document.querySelector('#score1').innerHTML = score1;
        }else if(res == 'o'){
            resultGame.innerHTML = 'Player 2 ( O ) Win';
            score2++;
            document.querySelector('#score2').innerHTML = score2;
        }else{
            resultGame.innerHTML = 'Draw!!';
            draw++;
            document.querySelector('#draw').innerHTML = draw;
        }
    }

    function reset(){
        let field_board = document.querySelectorAll('.field_board');

        field_board.forEach(function(field, key){
            field.innerHTML = '';
        });
        board = [[0,0,0],[0,0,0],[0,0,0]];
        result = null;
        player1 = true;
        player2 = false;
        plays = 0;
        result_row = 0;
        result_column = 0;
        result_diagonalx = 0;
        result_diagonaly = 0;
        resultField.classList.add('hidden');
    }

    function checkDiagonal(){

        let j = 3;
        for(let i = 0; i<=2; i++){
            result_diagonalx += board[i][i];
            diagonalx.push('p'+i+i);
            j -= 1;
            result_diagonaly += board[i][j];
            diagonaly.push('p'+i+j);
        }

        if(result_diagonalx == 3 || result_diagonalx == -3){
            return true;
        }else if(result_diagonaly == 3 || result_diagonaly == -3){
            return true;
        }else{
            result_diagonalx = 0;
            result_diagonaly = 0;
            diagonalx.splice();
            diagonaly.splice();
        }
        console.log(diagonalx);
        console.log(diagonaly);
        return false;
    }

    function checkRow(){
        for(let i = 0; i<=2; i++){
            for(let j = 0; j<=2; j++){
                result_row += board[i][j];
                row.push('p'+i+j);
            }

            if(result_row == 3 || result_row == -3){
                return true;
            }else{
                result_row = 0;
                row.splice();
            }
        }
        console.log(row);
        return false;
    }

    function checkColumn(){
        for(let i = 0; i<=2; i++){
            for(let j = 0; j<=2; j++){
                result_column += board[j][i];
                column.push('p'+j+i);
            }

            if(result_column == 3 || result_column == -3){
                return true;
            }else{
                result_column = 0;
                column.splice();
            }
        }
        console.log(column);
        return false;
    }

    function table(){
        console.table(board);
    }



