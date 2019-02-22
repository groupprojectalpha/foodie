import React from "react"

export default function (props) {
  const {id , price , quantity} = props.item
  let newQuantity = quantity
  return (
    <div className="price-main">
      <p>${price} x {quantity}</p>
      {props.updateQuantity && <button onClick={() => props.updateQuantity(id, ++newQuantity)}> +1 </button>}
      {props.updateQuantity && <button onClick={() => props.updateQuantity(id, --newQuantity)}> -1 </button>}
      <div>Total: {quantity * price}</div>
    </div>
  )
}