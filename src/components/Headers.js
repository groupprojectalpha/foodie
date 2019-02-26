import React from 'react'
import Fade from 'react-reveal/Fade';

export default function (props) {
    return (
        <Fade>
        <div style={{ marginTop: '10px' }} className='tab'>
            <h2>{props.title}</h2>
        </div>
        </Fade>
    )
}