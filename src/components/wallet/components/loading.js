import React from 'react';
import { LoopCircleLoading } from 'react-loadingg';

const Loading = () => {
    return (
        <div style={{marginTop: 150, width: '50vw', height:'50vh'}}>
            <center><h3 style={{marginLeft:"120px"}}>Initiating payment</h3></center>
            <LoopCircleLoading />           
        </div>
    )
}

export default Loading;
