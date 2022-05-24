let hit = 0;
let hits = document.querySelector('#hits');
let attempts = 70;
let atts = document.querySelector('#atts');
let battleField = document.querySelector('#battleField');
let board = [];
let fields = [];
let message = document.querySelector('.message');
let score = document.querySelector('#score');
let resultGame = true;
let reset;
let winMessage = document.querySelector('.win');
let lostMessage = document.querySelector('.lost');
let ResetButon = document.querySelector('.reset');

const ships = [
    {
        name: 'carrier',
        quantity: 1,
        size: 5
    },
    {
        name: 'battleship',
        quantity: 2,
        size: 4
    },
    {
        name: 'destroyer',
        quantity: 3,
        size: 3
    },
    {
        name: 'submarine',
        quantity: 4,
        size: 2
    },
    {
        name: 'patrolBoat',
        quantity: 5,
        size: 1
    },
]

function createFields(){
    atts.innerHTML = attempts;
    hits.innerHTML = hit;
    for(let i = 0; i<10; i++){
        for(let j = 0; j<10; j++){
            let id = 'field'.concat(parseInt(i+''+j));
            let field = document.createElement('div');
            field.setAttribute('id', id);
            field.setAttribute('class', 'field');
            field.classList.add('water');
            battleField.appendChild(field);
            board.push(
                {
                    x: i,
                    y: j,
                    value: 'water' 
                }
            );
        }
    }
}

function setShips(){
    ships.map((ship)=>{
        for(let i = 0; i<ship.quantity; i++){
            sort(ship);
        }
    });
}

function sort(ship){
    let startFieldx = Math.floor(Math.random() * 10);
    let startFieldy = Math.floor(Math.random() * 10);
    let direction = Math.floor(Math.random() * 2);

    fieldsChecked = check(startFieldx, startFieldy, direction, ship);

    if(!fieldsChecked){
        sort(ship); //se não cabe ele chama novamente
    }else{
        for(let i=0; i<ship.size; i++){
            board[fieldsChecked[i]].value = ship.name;
        }
    }    
}

function check(startFieldx, startFieldy, direction, ship){
    let fieldsChecked = [];
    if(direction == 0){ //horizontal
        if(startFieldy + ship.size - 1 > 9){
            //console.log('não cabe');
            return false; // não cabe
        }
        // cabe
        for(let i = 0; i<ship.size; i++){
            if(board[parseInt(startFieldx+''+(startFieldy+i))].value === 'water'){
                fieldsChecked.push(parseInt(startFieldx+''+(startFieldy+i)));
                //console.log('vazio');
            }else{
                //console.log('ocupado');
                return false;
            }
        }
        return fieldsChecked; // não está ocupado
        
    }else{ //vertical
        if(startFieldx + ship.size - 1 > 9){
            //console.log('não cabe');
            return false; // não cabe
        }
        // cabe
        for(let i = 0; i<ship.size; i++){
            if(board[parseInt((startFieldx+i)+''+startFieldy)].value === 'water'){
                fieldsChecked.push(parseInt(startFieldx+i+''+startFieldy));
                //console.log('vazio');
            }else{
                //console.log('ocupado');
                return false;
            }
        }
        return fieldsChecked; // não está ocupado
    }
}

function endGame(result){
    if(result == 'win'){
        winMessage.classList.remove('hidden');
        ResetButon.classList.remove('hidden');
        document.querySelector('.atts').classList.add('hidden');
        document.querySelector('.hits').classList.add('hidden');
        message.classList.add('hidden');
        resultGame = false;
    }else{
        lostMessage.classList.remove('hidden');
        ResetButon.classList.remove('hidden');
        document.querySelector('.atts').classList.add('hidden');
        document.querySelector('.hits').classList.add('hidden');
        message.classList.add('hidden');
        resultGame = false;
    }
    reset = document.querySelector('#reset');
    reset.addEventListener('click', ()=>{
        resetGame();
    });
}

function start(){
    fields = document.querySelectorAll('.field');

    fields.forEach((item, index)=>{
        item.addEventListener('click', ()=>{
            if(!resultGame){
                return false;
            }
            if(item.classList[1] === 'water'){
                attempts--;
                atts.innerHTML = attempts;
            }
            if(board[index].value === 'water'){
                message.style.color = "rgb(241, 116, 116)";
                message.innerHTML = 'Hit the water :(';
                item.classList.remove('water');
                item.classList.add('waterHited');
                item.innerHTML = 'X';
            }else{
                message.style.color = "rgb(141, 240, 207)";
                message.innerHTML = 'Hit the '+board[index].value;
                item.classList.remove('water');
                item.classList.add(board[index].value);
                    hit++;
                    hits.innerHTML = hit;
            }
            if(attempts == 0 && hit < 35){
                endGame('lost');
            }
            if(hit == 35){
                endGame('win');
            }
        })
    });
}

function resetGame(){
    console.log('reset');
    winMessage.classList.add('hidden');
    lostMessage.classList.add('hidden');
    ResetButon.classList.add('hidden');
    document.querySelector('.atts').classList.remove('hidden');
    document.querySelector('.hits').classList.remove('hidden');
    message.classList.remove('hidden');
    resultGame = true;

    hit = 0;
    attempts = 70;
    battleField.innerHTML = "";
    board = [];
    fields = [];
    createFields();
    setShips();
    start();
}

createFields();
setShips();
start();
