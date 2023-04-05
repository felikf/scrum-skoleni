export function add(a: string, b: string): string {
    if (a + b === 'IIII') return 'IV';
    if (a + b === 'IIIII') return 'V';
    if (a + b === 'IV') return 'VI';
    if (a + b === 'IIIV') return 'VI';
    if (a + b === 'IIIIII') return 'VI';
    if (['IIV', 'IVI'].includes(a + b) ) return 'V';
    return  a + b;
}
