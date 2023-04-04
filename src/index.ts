import { Ship } from './model/ship'
import { Player } from "./model/player";
import { Board } from "./model/board";
import { Cell } from "./model/cell";
import { aiStrategy, getRandomNumber } from "./aiStrategy";
import { Coordinates } from "./model/coordinates";
import { finished } from "./game";

const readline = require('readline');


let board: Board;
let aiBoard: Board;

const numRows = 10;
const numCols = 10;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showTitle() {
    console.log(`
__________         __    __  .__           _________.__    .__        
\\______   \\_____ _/  |__/  |_|  |   ____  /   _____/|  |__ |__|_____  
 |    |  _/\\__  \\\\   __\\   __\\  | _/ __ \\ \\_____  \\ |  |  \\|  \\____ \\ 
 |    |   \\ / __ \\|  |  |  | |  |_\\  ___/ /        \\|   Y  \\  |  |_> >
 |______  /(____  /__|  |__| |____/\\___  >_______  /|___|  /__|   __/ 
        \\/      \\/                     \\/        \\/      \\/   |__|    
    `)

    console.log()

    console.log(`
                                     |__
                                     |\\/
                                     ---
                                     / | [
                              !      | |||
                            _/|     _/|-++'
                        +  +--|    |--|--|_ |-
                     { /|__|  |/\\__|  |--- |||__/
                    +---------------___[}-_===_.'____               /\\
                ____\`-' ||___-{]_| _[}-  |     |_[___\\==--          \\/   _
 __..._____--==/___]_|__|_____________________________[___\\==--___,-----' .7
|                                                                   BB-61/
 \\_______________________________________________________________________|   
    
    `)

    console.log()
    console.log()
    console.log()


    console.log('Battleship (also known as Battleships or Sea Battle[1]) is a strategy type guessing game for two players. It is played on ruled grids (paper or board) on which each player\'s fleet of warships are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player\'s ships, and the objective of the game is to destroy the opposing player\'s fleet.');

    console.log()
    console.log()
    console.log()
}

function createBoard(player: Player, isEnemy: boolean): Board {
    let result: Board = [];
    for (let y: number = 0; y < numRows; y++) {
        result[y] = [];
        for (let x: number = 0; x < numCols; x++) {

            if (x === player.shipPlacement.x && (y === player.shipPlacement.y || y === player.shipPlacement.y + player.ship.size - 1)) {
                let cell = new Cell(player.ship, isEnemy);
                result[y][x] = cell;
                player.ship.addCell(cell);
            } else {
                result[y][x] = new Cell(null);
            }
        }
    }

    return result;
}

function printBoards(board1: Board, board2: Board): void {

    for (let y: number = 0; y < board1.length; y++) {
        let row = board1[y];
        let print = '';

        for (const cell of row) {
            print += cell.toString() + ' '
        }

        print += '     ';
        row = board2[y];

        for (const cell of row) {
            print += cell.toString() + ' '
        }
        console.log(print)
    }
}

function getCoordinates(message: string): Promise<Coordinates> {
    return new Promise(resolve => {
        rl.question(message, input => {
            // Parse the input and validate the format
            const [rowStr, colStr] = input.trim().split(' ');
            const y = parseInt(rowStr);
            const x = parseInt(colStr);
            if (isNaN(y) || isNaN(x) || y < 0 || y >= numRows || x < 0 || x >= numCols) {
                console.log('Invalid input.');
                return null;
            }

            return resolve({ x, y })
        });
    });
}

function playerFire(): Promise<Cell> {
    console.log('________PLAYER______   ________AI__________')
    console.log('________MOVE__________')

    return new Promise(resolve => {
        rl.question('Enter row and column to playerFire on (e.g. "3 5"): ', input => {
            // Parse the input and validate the format
            const [rowStr, colStr] = input.trim().split(' ');
            const row = parseInt(rowStr);
            const col = parseInt(colStr);
            if (isNaN(row) || isNaN(col) || row < 0 || row >= numRows || col < 0 || col >= numCols) {
                console.log('Invalid input.');
                rl.close();
                return;
            }

            let cell = aiBoard[row][col];

            cell.fire();

            return resolve(cell);
        });
    })
}

function enemyFire(board: Board): Promise<Cell> {
    return new Promise<Cell>(resolve => {
        setTimeout(() => resolve(aiStrategy(board)), 500)
    })
}

async function startGame() {
    showTitle();

    const shipPlacement: Coordinates = await getCoordinates('Get Ship coordinates: ');


    // TODO get user ship placement

    const ship = new Ship(2, 'cruiser');
    const player: Player = new Player(ship, shipPlacement)

    board = createBoard(player, false)

    // TODO automate enemy placement
    const aiShip = new Ship(2, 'cruiser');
    const aiShipPlacement = { x: getRandomNumber(numRows), y: getRandomNumber(numCols) };
    const aiPlayer: Player = new Player(aiShip, aiShipPlacement)
    aiBoard = createBoard(aiPlayer, true)

    console.log('________PLAYER______   ________AI__________')
    console.log('')
    printBoards(board, aiBoard);
    //

    let playerFinished = false;
    let aiFinished = false;
    do {
        playerFinished = finished(board);
        aiFinished = finished(aiBoard);

        if (playerFinished || aiFinished) {
            break
        }

        console.log(`Player finished: ${playerFinished}`)
        console.log(`AI finished: ${aiFinished}`)

        await playerFire();
        await enemyFire(board);
        printBoards(board, aiBoard);
    } while ((!playerFinished && !aiFinished))

    //

    if (aiFinished) {
        console.log(`
        
        
        
        
   _________
  |o^o^o^o^o|
  {   _!_   }
   \\   !   /
    \`.   .'
      )=(
     ( + )
      ) (
  .--'   \`--.
  \`---------'


_____.___.               __      __              
\\__  |   | ____  __ __  /  \\    /  \\____   ____  
 /   |   |/  _ \\|  |  \\ \\   \\/\\/   /  _ \\ /    \\ 
 \\____   (  <_> )  |  /  \\        (  <_> )   |  \\
 / ______|\\____/|____/    \\__/\\  / \\____/|___|  /
 \\/                            \\/             \\/ 


        `)
    } else {
        console.log('You loose')

    }

    rl.close();
}

startGame()

