import { Ship } from "./ship";
import { ShipPlacement } from "./ship-placement";

export class Player {
    ship: Ship

    shipPlacement: ShipPlacement

    constructor(ship: Ship, shipPlacement: ShipPlacement) {
        this.ship = ship;
        this.shipPlacement = shipPlacement;
    }
}
