import React from 'react'
import './ItemCard.css'

export default function ItemCard(props){
  const {id , name , type , brand , itemcode , rank , price , image , quantity , updateQuantity} = props.item
  const classString = props.classString ? "item-card " + props.classString : "item-card"
  let newQuantity = quantity
  let displayQuantity;
  if(quantity){displayQuantity = " x " + quantity} else {displayQuantity = ''}
  return (
    <div className={classString}>
    <img src={image} alt={name} className="thumbnail" />
    <p>{name}</p>
    <p>${price/100}{displayQuantity}</p>
    {props.updateQuantity && <button onClick={() => props.updateQuantity(id , ++newQuantity)}> +1 </button>}
    {props.updateQuantity && <button onClick={() => props.updateQuantity(id , --newQuantity)}> -1 </button>}
    </div>
  )
}