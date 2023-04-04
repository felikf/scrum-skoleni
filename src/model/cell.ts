import { Ship } from "./ship";

export class Cell {

    ship: Ship;

    firedAtCell: boolean

    hiddenShip = false



    constructor(ship: Ship, hiddenShip = false) {
        this.ship = ship
        this.hiddenShip = hiddenShip
    }

    toString(): string {
        if (this.ship && this.firedAtCell) {
            return 'X'
        } else if (this.ship && !this.firedAtCell && this.hiddenShip) {
            return '.'
        } else if (this.ship && !this.firedAtCell) {
            return 'o'
        } else if (this.firedAtCell) {
            return '_'
        }

        return '.'
    }

    fire(): boolean {
        this.firedAtCell = true;
        return !!this.ship;
    }
}
