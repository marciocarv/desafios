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
    for(let i = 0; i<10; i++){
        for(let j = 0; j<10; j++){
            //let id = 'field'.concat(',', i.toString(), ',',j.toString());
            let id = 'field'.concat(parseInt(i+''+j));
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
    let direction = Math.floor(Math.random() * 2);

    fieldsChecked = check(startFieldx, startFieldy, direction, ship);

    if(!fieldsChecked){
        sort(ship); //se não cabe ele chama novamente
    }else{
        for(let i=0; i<ship.size; i++){
            board[fieldsChecked[i]].value = ship.name;
            console.log(fieldsChecked);
            document.querySelector('#'+'field'.concat(fieldsChecked[i])).classList.add(ship.name);
            //console.log(document.querySelector('#'+'field'.concat(fieldsChecked[i])));
        }
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
            if(board[parseInt(startFieldx+''+(startFieldy+i))].value === 'agua'){
                fieldsChecked.push(parseInt(startFieldx+''+(startFieldy+i)));
                console.log('vazio');
            }else{
                console.log('ocupado');
                return false;
            }
        }
        return fieldsChecked; // não está ocupado
        
    }else{ //vertical
        if(startFieldx + ship.size - 1 > 9){
            console.log('não cabe');
            return false; // não cabe
        }
        // cabe
        for(let i = 0; i<ship.size; i++){
            if(board[parseInt((startFieldx+i)+''+startFieldy)].value === 'agua'){
                fieldsChecked.push(parseInt(startFieldx+i+''+startFieldy));
                console.log('vazio');
            }else{
                console.log('ocupado');
                return false;
            }
        }
        return fieldsChecked; // não está ocupado
    }
}

createFields();


setShips();

console.log(board);