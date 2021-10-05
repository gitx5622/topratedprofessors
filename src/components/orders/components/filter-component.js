/** @jsx jsx */
import React from 'react';
import {jsx, Box, Input, Button} from 'theme-ui';
import {AiOutlineClose} from 'react-icons/ai';
import {CSVLink} from "react-csv";

const FilterComponent = ({onFilter, onClear, filterText, data, section}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: '2.5em'}}>
            <Box sx={{display: 'flex'}}>
            <Input sx={styles.input} value={filterText} onChange={onFilter}   placeholder='Search by Order Number'/>
            <Box sx={{height: '35px', width: '50px', background: '#2979FF', borderTopRightRadius: '5px', borderBottomRightRadius: '5px',}}>
                <center>
                    <AiOutlineClose  style={{marginTop: '8px', color: 'white', fontSize: '20px'}} onClick={onClear}/>
                </center>
            </Box>
            </Box>
            <Box sx={{display: 'flex'}}>
            <Input sx={styles.input} value={filterText} onChange={onFilter}   placeholder='Search by Name type'/>
            <Box sx={{height: '35px',width: '50px', background: '#2979FF', borderTopRightRadius: '5px', borderBottomRightRadius: '5px',}}>
                <center>
                    <AiOutlineClose  style={{marginTop: '8px', color: 'white', fontSize: '20px'}} onClick={onClear}/>
                </center>
            </Box>
            </Box>
            <Box sx={{display: 'flex'}}>
                <CSVLink data={data}><Button sx={styles.exportButton}>Export</Button></CSVLink>
            </Box>
        </Box>
    );
};

export default FilterComponent;

const styles = {
    input : {
        height: '35px',
        '::placeholder': {
            color: 'white'
        }
    },
    exportButton: {
        background: 'linear-gradient(to right, #17c671, #0059B2)',
        padding: '8px',
        borderRadius: '10px',
    }
}