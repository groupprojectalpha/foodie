import React from 'react'
import './ItemCard.css'

export default function ItemCard(props){
  const {id , name , type , brand , itemcode , rank , price , image , quantity} = props.item
  const classString = props.classString ? "item-card " + props.classString : "item-card"
  return (
    <div className={classString}>
    <img src={image} alt={name} className="thumbnail" />
    <p>{name}</p>
    {props.Price && props.Price}
    </div>
  )
}