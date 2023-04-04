import { finished } from "./game";
import { Cell } from "./model/cell";
import { Ship } from "./model/ship";

describe('', function () {
    it('should ', function () {
        let cell1 = new Cell(new Ship(1, ''));
        let cell3 = new Cell(new Ship(1, ''));
        let cell2 = new Cell(null);
        let cell4 = new Cell(null);

        cell1.fire()
        cell3.fire()

        const board = [
            [ cell1, cell2  ],
            [ cell3, cell4  ],
        ]


        expect(finished(board)).toBe(true)
    });
});
