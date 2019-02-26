import React from 'react';
import Spinner from 'react-md-spinner';
import Fade from 'react-reveal/Fade';
import Headers from '../Headers';

export default function () {


    return (
            <div className='spinner'>
        <Headers title={'Loading...'} />

        <Fade>
                <div className="list" style={{ borderRadius: '0px 20px 20px 20px', width: '418px' }}>

                    <h2>Please be patient while we fetch all your items fresh for the store</h2>
                    <Spinner size={100} />
                </div>
            </Fade>
            </div>

    )
}