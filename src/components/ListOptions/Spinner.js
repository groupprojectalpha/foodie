import React from 'react';
import Spinner from 'react-md-spinner';
import Fade from 'react-reveal/Fade';

export default function() {


    return (
        <Fade>
            <div className="list" style={{borderRadius:'20px', maxWidth:'418px'}}>

                <h2>Please be patient while we fetch all your items fresh for the store</h2>
                <Spinner size={100} />
            </div>
        </Fade>

    )
}