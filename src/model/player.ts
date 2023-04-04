import { Ship } from "./ship";
import { Coordinates } from "./coordinates";

export class Player {
    ship: Ship

    shipPlacement: Coordinates

    constructor(ship: Ship, shipPlacement: Coordinates) {
        this.ship = ship;
        this.shipPlacement = shipPlacement;
    }
}
