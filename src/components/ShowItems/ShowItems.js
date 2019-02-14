import React from 'react';

export default function ShowItems(props){
    
       let itemCards = props.itemCards.map((el,i)=>{
           return <li key={i} >{el.item}</li>
       })
    return(
        <>
        this is ShowItems
        <h1>Item Cards</h1>
        { itemCards }
        <button>More Items</button>
        
        </>
    )
}