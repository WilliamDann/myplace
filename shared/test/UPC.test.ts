import assert from 'assert'
import parseUPC, { isValidUPC } from '../UPC'

describe('UPC', () => {
    describe('#isValidUPC', () => {
        it ('should return true for a valid UPC code', () => {
            assert(isValidUPC("036000291452") == true)
        })

        it ('should return false for an invalid check digit', () => {
            assert(isValidUPC("036000291459") == false)
        })

        it ('should return false for invalid length', () => {
            assert(isValidUPC("036291459") == false)
        })
    });

    describe('#parseUPC', () => {
        it ('should fail for an invalud UPC', () => {
            assert(parseUPC("036000291459") == null)
        })

        it ('should read correct params for valid UPC', () => {
            let data = parseUPC("036000291452");

            assert(data != null)
            assert(data.system == "0")
            assert(data.manufacturer == "36000")
            assert(data.product == "29145")
            assert(data.check == "2")
        });
    });
})