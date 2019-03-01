import calcTotal from '../lib/calcTotal';
import fixDecimal from '../lib/fixDecimal';



const arr=[{price:10, quantity:1}, {price:8, quantity: 1}]
const arrTwo=[{price:10, quantity:2}, {price:8, quantity: 2}]
const arrThree=[{price:'nan', quantity:2}, {price:'nan', quantity: 2}]
const num =4.983754
const numTwo =''



describe('testing the calculator', ()=>{
    test('should loop over shoppinglist array and total the price values',()=>{
        expect(calcTotal(arr)).toBe(1800)
    })
    test('should update price with correct QTY.', ()=>{
       expect(calcTotal(arrTwo)).toBe(3600)
    })
    test('x should be a number', ()=>{
        expect(calcTotal(arrThree)).toBe(NaN)
    })
})

describe('fixDecimal should not allow more than two decimals in the cent place', ()=>{
    test('return value should round to single integer', ()=>{
        expect(fixDecimal(num)).toBe(5)
    })
    test('should return 0 for anything that is not a number', ()=>{
        expect(fixDecimal(numTwo)).toBe(0)
    })
})
