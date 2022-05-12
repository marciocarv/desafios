let hits = 0;
let bombs = 0;
let attempts = 70;
let battleField = document.querySelector('#battleField');
let board = [];

const ships = [
    {
        name: 'carrier',
        quantity: 1,
        size: 3
    },
    /*{
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
                    value: 0 
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
    //let direction = Math.floor(Math.random() * 2);
    //let startFieldx = 4;
    //let startFieldy = 8;
    let direction = 0;

    fieldsChecked = check(startFieldx, startFieldy, direction, ship);

    for(let i=0; i<ship.size; i++){
        board[fieldsChecked[i]] = ship.name;
    }

    /*board.map((field, index)=>{
        if(field.x === startFieldx && field.y === startFieldy){
            for(let i=0; i<ship.size; i++){
                field.value = ship.name;
                console.log(field.value);
            }
        }
    });*/
}

function check(startFieldx, startFieldy, direction, ship){
    let fieldsChecked = [];
    if(direction == 0){ //horizontal
        if(startFieldy + ship.size - 1 > 9){
            console.log('não cabe');
            sort(ship); // não cabe e tentará novamente.
        }
        // cabe
        for(let i = 0; i<ship.size; i++){
            let result = board.find( field => field.x === startFieldx && field.y === startFieldy+i);
            console.log(result);
            if(result.value != 0){
                console.log('ja está ocupado');
                sort(ship); // já está ocupado e tentará novamente
            }
            fieldsChecked.push(result.x+''+result.y);
        }
        return fieldsChecked; // não está ocupado
        
    }else{ //vertical
        if(startFieldx + ship.size - 1 > 9){
            console.log('não cabe');
            sort(ship); // não cabe e tentará novamente.
        }
        // cabe
        for(let i = 0; i<ship.size; i++){
            let result = board.find( field => field.x === startFieldx+i && field.y === startFieldy);
            //console.log(result);
            if(result.value != 0){
                console.log('ja está ocupado');
                sort(ship); // já está ocupado e tentará novamente
            }
            fieldsChecked.push(result.x+''+result.y);
        }
        return fieldsChecked;
    }
}

createFields();


setShips();

console.log(board);