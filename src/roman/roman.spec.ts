import { add } from "./roman";

describe('', function () {
    it('Sum I + I ', function () {
        expect(add("I", "I")).toEqual("II")
        expect(add("I", "II")).toEqual("III")
        expect(add("II", "I")).toEqual("III")
        expect(add("I", "III")).toEqual("IV")
        expect(add("II", "II")).toEqual("IV")
        expect(add("III", "I")).toEqual("IV")
        expect(add("II", "III")).toEqual("V")
        expect(add("III", "II")).toEqual("V")
        expect(add("I", "IV")).toEqual("V")
        expect(add("IV", "I")).toEqual("V")
        expect(add("I", "V")).toEqual("VI")
        expect(add("II", "IV")).toEqual("VI")
        expect(add("III", "III")).toEqual("VI")
    });
});

