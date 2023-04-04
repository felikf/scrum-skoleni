import { Cell } from "./model/cell";
import { Board } from "./model/board";

export function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max)
}

export function aiStrategy(board: Board): Cell {

    let cell: Cell;

    do {
        const y = getRandomNumber(board.length);
        const x = getRandomNumber(board[0].length);

        cell = board[x][y];

        console.log(`Enemy: ${x} ${y}`)
    } while (cell.firedAtCell);


    cell.fire();


    return cell
}
