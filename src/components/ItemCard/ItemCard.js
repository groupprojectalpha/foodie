import React from 'react'
import './ItemCard.css'
import TrashIcon from './TrashIcon'


export default function ItemCard(props){
  // console.log('class string for item card', props.classString)
  const {id , name , type , brand , itemcode , rank , image , price} = props.item
  const classString = props.classString ? "item-card " + props.classString : "item-card"
  const noPic = 'http://www.vermeer.com.au/wp-content/uploads/2016/12/attachment-no-image-available.png'
 
  return (
    
    <div className={classString}>
    <div className='item-card new-card'>
    <div className='thumbnail-container'>
   
    <img src={image==="undefined" ? noPic : image}  className="thumbnail" />

    </div>
    <p id='prod-name'>{name}</p>
    {props.Price ? props.Price : <p id="price-paragraph" >${props.item.price}</p>}
    {props.remove &&  <TrashIcon remove={props.remove}/>}
    </div>
    </div>
    
    
  )
}