let hits = 0;
let bombs = 0;
let attempts = 70;
let battleField = document.querySelector('#battleField');
let board = [];

const ships = [
    {
        name: 'carrier',
        quantity: 2,
        size: 5
    },/*
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
        quantity: 2,
        size: 3
    },
    {
        name: 'patrolBoat',
        quantity: 1,
        size: 2
    },*/
]

function createFields(){
    for(let i = 0; i<10; i++){
        for(let j = 0; j<10; j++){
            let id = 'field'.concat(',', i.toString(), ',',j.toString());
            let field = document.createElement('div');
            field.setAttribute('id', id);
            field.setAttribute('class', 'field');
            battleField.appendChild(field);
            board.push(
                {
                    x: i,
                    y: j,
                    value: 'agua' 
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

    console.log(startFieldx, startFieldy);
    //let direction = Math.floor(Math.random() * 2);
    //let startFieldx = 4;
    //let startFieldy = 8;
    let direction = 0;

    fieldsChecked = check(startFieldx, startFieldy, direction, ship);

    if(!fieldsChecked){
        sort(ship); //se não cabe ele chama novamente
    }else{
        /*for(let i=0; i<ship.size; i++){
            board[fieldsChecked[i]].value = ship.name;
        }*/
    }

    
}

function check(startFieldx, startFieldy, direction, ship){
    let fieldsChecked = [];
    if(direction == 0){ //horizontal
        if(startFieldy + ship.size - 1 > 9){
            console.log('não cabe');
            return false; // não cabe
        }
        // cabe
        for(let i = 0; i<ship.size; i++){
            console.log(board[startFieldx+''+(startFieldy+i)]);
            /*if(board[startFieldx+''+(startFieldy+i)].value =! 'agua'){
                console.log('vazio');
                fieldsChecked.push(startFieldx+''+(startFieldy+i));
            }else{
                console.log('ocupado');
                return false;
            }*/
            /*let result = board.find( field => field.x === startFieldx && field.y === startFieldy+i);
            console.log(result);
            if(result.value != 'agua'){
                console.log('ja está ocupado');
                return false; // já está ocupado e tentará novamente
            }*/
        }
        return fieldsChecked; // não está ocupado
        
    }else{ //vertical
        if(startFieldx + ship.size - 1 > 9){
            return false; // não cabe
        }
        // cabe
        for(let i = 0; i<ship.size; i++){
            let result = board.find( field => field.x === startFieldx+i && field.y === startFieldy);
            if(result.value != 0){
                console.log('ja está ocupado');
                sort(ship); // já está ocupado e tentará novamente
            }
            fieldsChecked.push(result.x+''+result.y);
        }
        return fieldsChecked;
        console.log('cabe v');
    }
}

createFields();


setShips();

console.log(board);