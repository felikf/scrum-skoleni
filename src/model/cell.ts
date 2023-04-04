import { Ship } from "./ship";

export class Cell {

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
