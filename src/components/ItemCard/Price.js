import React from "react"

export default function (props) {
  const {id , price , quantity} = props.item
  let newQuantity = quantity
  return (
    <div className="price-main">
      <p>${price / 100} x {quantity}</p>
      {props.updateQuantity && <button onClick={() => props.updateQuantity(id, ++newQuantity)}> +1 </button>}
      {props.updateQuantity && <button onClick={() => props.updateQuantity(id, --newQuantity)}> -1 </button>}
      <div>Total: {quantity * price / 100}</div>
    </div>
  )
}