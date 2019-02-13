import React from 'react';

export default function ShowList(props){
    console.log('this is in lists', props)
    let list = props.lists.map((el,i)=>{
        return   <li key={i} >{el.name}</li>
       })
    return(
        <>
        <h1>lists</h1>
        {list}
        </>
    )
}