let hits = 0;
let bombs = 0;
let attempts = 70;
let battleField = document.querySelector('#battleField');
let board = [];

const ships = [
    {
        name: 'carrier',
        quantity: 1,
        size: 5
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
            let startFieldx = Math.floor(Math.random() * 10);
            let startFieldy = Math.floor(Math.random() * 10);
            let direction = Math.floor(Math.random() * 2);

            board.map((field, index)=>{
                if(field.x == startFieldx && field.y == startFieldy){
                    checkFit(startFieldx, startFieldy, direction, ship.size);
                    checkEmpty(startFieldx, startFieldy, direction, ship.size);

                    field.value = ship.name.concat(i);
                }
            });
        }
    });
}

function checkFit(startFieldx, startFieldy, direction, size){
    if(direction == 0){ //horizontal
        if(startFieldy + size - 1 > 9){
            return false;
        }

        return true;
    }else{ //vertical
        if(startFieldx + size - 1 > 9){
            return false;
        }

        return true;
    }
}

function checkEmpty(startFieldx, startFieldy, direction, size){
    if(direction == 0){ //horizontal
        for(let i = 0; i<size; i++){
            let result = board.find( field => field.x === startFieldx && field.y === startFieldy+i);
            if(result.value != 0){
                return false; // já está ocupado
            }
        }
        return true; // não está ocupado

    }else{ // vertical
        for(let i = 0; i<size; i++){
            let result = board.find( field => field.x === startFieldx+i && field.y === startFieldy);
            if(result.value != 0){
                return false; // já está ocupado
            }
        }
        return true; // não está ocupado
    }
}

console.timeLog

createFields();

if(checkEmpty(0,2,1,3)){
    console.log('não está ocupado');
}else{
    console.log('está ocupado');
}

//console.table(board);

//setShips();