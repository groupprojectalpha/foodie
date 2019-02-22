export default function(arr){
  let total = 0;
  for(let i = 0 ; i < arr.length ; i++){
    const x = arr[i].price * arr[i].quantity * 100
    if(typeof x === "number" || !isNaN(x)){total += x}
  }
  return total
}