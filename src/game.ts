import { Board } from "./model/board";
import { Cell } from "./model/cell";

export function finished(board: Board): boolean {
    const flattenedArray: Cell[] = board.flatMap((subArray) => subArray)
    return flattenedArray.every(cell => !cell.ship  || !!cell.firedAtCell )
}
