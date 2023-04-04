import { Cell } from "./cell";

export class Ship {
    size: number

    private cells: Cell[] = [];

    constructor(size: number, type: string) {
        this.size = size
    }

    addCell(cell: Cell): void {
        this.cells.push(cell)
    }
}
