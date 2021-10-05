import React from 'react';
import {jsx, Box, Input} from 'theme-ui';
import {AiOutlineClose} from 'react-icons/ai';

const FilterComponent = ({onFilter, onClear, filterText}) => {
    return (
        <Box sx={{display: 'flex'}}>
            <Input value={filterText} onChange={onFilter}   placeholder='Search by Name type'/>
            <Box sx={{width: '50px', background: '#2979FF', borderTopRightRadius: '5px', borderBottomRightRadius: '5px',}}>
                <center>
                    <AiOutlineClose  style={{marginTop: '8px', color: 'white', fontSize: '20px'}} onClick={onClear}/>
                </center>
            </Box>
        </Box>
    );
};

export default FilterComponent;