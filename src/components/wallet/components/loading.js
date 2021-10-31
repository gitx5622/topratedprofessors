import React from 'react';
import { LoopCircleLoading } from 'react-loadingg';

const Loading = () => {
    return (
        <div style={{width: '50vw', height:'50vh'}}>
            <center><h3>Initiating payment</h3></center>
            <LoopCircleLoading />           
        </div>
    )
}

export default Loading;
