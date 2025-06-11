// represents UPC codes
export interface UPC
{
    system          : string;
    manufacturer    : string;
    product         : string;
    check           : string;
}

// check if upc is valid
export function isValidUPC(upc): boolean
{
    if (!/^\d{12}$/.test(upc)) {
        return false;
    }

    const digits = upc.split('').map(Number);
    const checkDigit = digits[11];

    let sumOdd = 0;
    let sumEven = 0;

    for (let i = 0; i < 11; i++) {
        if (i % 2 === 0) {
            sumOdd += digits[i];
        } else {
            sumEven += digits[i];
        }
    }

    const total = (sumOdd * 3) + sumEven;
    const calculatedCheck = (10 - (total % 10)) % 10;

    return checkDigit === calculatedCheck;
}

// parse a UPC code into it's parts
export default function parseUPC(code: string): UPC|null
{
    if (code.length != 12) {
        return null;
    }
    if (!isValidUPC(code))
        return null;
    
    return {
        system: code[0],
        manufacturer: code.slice(1, 6),
        product: code.slice(6, 11),
        check: code[11]
    }
}