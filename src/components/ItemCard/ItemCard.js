import React from 'react'
import './ItemCard.css'

export default function ItemCard(props){
  const {id , name , type , brand , itemcode , rank , price , image} = props.item
  return (
    <div className="item-card">
    <p>{name}</p>
    <p>{price}</p>
    <img src={image} alt={name} />
    </div>
  )
}