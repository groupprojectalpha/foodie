import React from 'react';

export default function ShowList(props){
    let list = props.lists.map((el,i)=>{
        return   <li key={i} >{el.name}</li>
       })
    return(
        <>
        this is ShowList
        <h1>lists</h1>
        {list}
        </>
    )
}