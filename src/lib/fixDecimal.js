export default function(num){
  console.log("fixDecimal Invoked on " , num)
  if(isNaN(num) || typeof num !== 'number'){
    console.log(num , " failed test during fixDecimal. Check the datatype of your argument.")
    return 0
  }
  let processed = Math.round(num)
  console.log("Returning " , processed)
  return processed
}