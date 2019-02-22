import React from 'react'
import './ItemCard.css'
import TrashIcon from './TrashIcon'


export default function ItemCard(props){
  const {id , name , type , brand , itemcode , rank , image} = props.item
  const classString = props.classString ? "item-card " + props.classString : "item-card"
  const noPic = 'http://www.vermeer.com.au/wp-content/uploads/2016/12/attachment-no-image-available.png'
 
  return (
    
    <div className={classString}>
    <div className='item-card new-card'>
    <div className='thumbnail-container'>
   
    <img src={image==="undefined" ? noPic : image}  className="thumbnail" />

    </div>
    <p id='prod-name'>{name}</p>
    <p id='prod-price'>{props.Price && props.Price}</p>
    {props.remove &&  <TrashIcon remove={props.remove}/>}
    </div>
    </div>
    
    
  )
}