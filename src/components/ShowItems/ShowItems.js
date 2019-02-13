import React from 'react';

export default function ShowItems(props){
    
       let itemCards = props.itemCards.map((el,i)=>{
           return <li key={i} >{el.item}</li>
       })
    return(
        <>
        <h1>Item Cards</h1>
        { itemCards }
        
        </>
    )
}