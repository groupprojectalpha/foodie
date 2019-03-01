import {reorder} from '../lib/dragFuncModule'
import fixDecimal from '../lib/fixDecimal'

const reorderArray = [ 1, 2, 3, 4, 5 ]

let state = {
    toggle: false
}

describe('testing the reorder function', () => {
    test('comparing the two arrays', () => {
        expect(reorder(reorderArray, 0, 1 )).toEqual(expect.arrayContaining([2,1,3,4,5]))
    }) 
}
)

describe('fix decimal', () => {
        test('if the decimal updates properly', ()=>{
            expect(fixDecimal(12.999)).toBe(13)
        })
        test('should return 0 if a booleon is passed', ()=>{
            expect(fixDecimal(true)).toBe(0)
        })
        test('should return 0 if a string it passed', ()=>{
            expect(fixDecimal('true')).toBe(0)
        })
        test('should return 0 if NaN is passed', () => {
            expect(fixDecimal(NaN)).toBe(0)
        })
    })
