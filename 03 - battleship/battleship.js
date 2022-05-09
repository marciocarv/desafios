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
        size: 3
    },
    {
        name: 'patrolBoat',
        quantity: 5,
        size: 2
    },
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

            board.map((field)=>{
                if(field.x == startFieldx && field.y == startFieldy){
                    if(direction == 0){ //horizontal
                        
                    } else{ //vertical

                    }

                    field.value = ship.name.concat(i);
                }
            });
        }
    });
}

createFields();

setShips();

console.log(board);