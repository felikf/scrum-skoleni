type Board = Cell[][];

class Ship {
    size: number
    constructor(size: number, type: string) {
        this.size = size
    }
}

class ShipPlacement {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class Fire {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class Player {
    ship: Ship

    shipPlacement: ShipPlacement

    constructor(ship: Ship, shipPlacement: ShipPlacement) {
        this.ship = ship;
        this.shipPlacement = shipPlacement;
    }
}

class Cell {

    ship: Ship;

    firedAtCell: boolean


    constructor(ship: Ship) {
        this.ship = ship
    }

    toString(): string {
        if (this.ship && this.firedAtCell) {
            return 'X'
        } else if (this.ship && !this.firedAtCell) {
            return 'o'
        } else if (this.firedAtCell) {
            return '_'
        }

        return '.'
    }
}

function showTitle() {
    console.log('Battleship (also known as Battleships or Sea Battle[1]) is a strategy type guessing game for two players. It is played on ruled grids (paper or board) on which each player\'s fleet of warships are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player\'s ships, and the objective of the game is to destroy the opposing player\'s fleet.');
}

function createBoard(player: Player): Board {
    let result: Board = [];
    for (let y: number = 0; y < 10; y++) {
        result[y] = [];
        for (let x: number = 0; x < 10; x++) {

            if (x === player.shipPlacement.x && ( y === player.shipPlacement.y ||  y === player.shipPlacement.y + player.ship.size - 1 )) {
                result[y][x] = new Cell(player.ship);
            } else {
                result[y][x] = new Cell(null);
            }
        }
    }

    return result;
}

function printBoard(result: Board): void {

    for (let y: number = 0; y < result.length; y++) {
        let row = result[y];
        let print = '';

        for (let x: number = 0; x < row.length; x++) {
             print += row[x].toString() + ' '
        }
        console.log(print)
    }

    // console.table(board)
}

let board: Board;
let aiBoard: Board;

function startGame() {
    showTitle();


    // TODO get user ship placement

    const ship = new Ship(2, 'cruiser');
    const shipPlacement = new ShipPlacement(2, 2);
    const player: Player = new Player(ship, shipPlacement)

    board = createBoard(player)
    printBoard(board);

    // TODO automate enemy placement
    const aiShip = new Ship(2, 'cruiser');
    const aiShipPlacement = new ShipPlacement(4, 4);
    const aiPlayer: Player = new Player(aiShip, aiShipPlacement)
    aiBoard = createBoard(aiPlayer)

    console.log('____________________')

    printBoard(aiBoard);

    // User shoot
    // fire(player, board, 0, 0)

    //
    // play();

}

startGame()

