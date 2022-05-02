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

    function play(i, j){

        element = document.querySelector('#p'+i+''+j);

        if(board[i][j] !== 0){
            return 0;
        }

        if(player1){
            element.innerHTML = 'X';
            player1 = false;
            player2 = true;
            board[i][j] = 1;
            plays++;
            score1++;
            if(checkDiagonal() || check()){
                result = 'x';
                winner(result);
            }
        }else{
            element.innerHTML = 'O';
            player1 = true;
            player2 = false;
            board[i][j] = -1;
            plays++;
            socore2++;
            if(checkDiagonal() || check()){
                result = 'o';
                winner(result);
            }
        }
        if(plays == 9 && result == null){
            draw++;
            winner(result);
            console.log('draw');
        }
    }

    function winner(res){
        let resultGame = document.querySelector('.winner');

        if(res == 'x'){
            resultGame.innerHTML = 'Player 1  ( X ) Win';
        }else if(res == 'o'){
            resultGame.innerHTML = 'Player 2 ( O ) Win';
        }else{
            resultGame.innerHTML = 'Draw!!';
        }
    }

    function checkDiagonal(){

        let j = 3;
        for(let i = 0; i<=2; i++){
            result_diagonalx += board[i][i];
            j -= 1;
            result_diagonaly += board[i][j];
        }

        if(result_diagonalx == 3 || result_diagonalx == -3 || result_diagonaly == 3 || result_diagonaly == -3){
            result_diagonalx = 0;
            result_diagonaly = 0;
            return true;
        }else{
            result_diagonalx = 0;
            result_diagonaly = 0;
        }
        return false;
    }

    function check(){
        for(let i = 0; i<=2; i++){
            for(let j = 0; j<=2; j++){
                result_row += board[i][j];
                result_column += board[j][i];
            }

            if(result_row == 3 || result_row == -3 || result_column == 3 || result_column == -3){
                result_row = 0;
                result_column = 0;
                return true;
            }else{
                result_row = 0;
                result_column = 0;
            }
        }
        return false;
    }

    function table(){
        console.table(board);
    }



