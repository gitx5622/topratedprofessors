/** @jsx jsx */
import React from 'react';
import {jsx, Box, Input} from 'theme-ui';
import {AiOutlineClose} from 'react-icons/ai';
import {CSVLink} from "react-csv";

const FilterComponent = ({onFilter, onClear, filterText, data, section}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap:1, width:'100%'}}>
            <Box sx={{display: 'flex'}}>
                <h3>{section.toUpperCase().replace(/_/g, " ")}</h3>
            </Box>
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
                <CSVLink data={data}><button sx={styles.exportButton}>Export</button></CSVLink>
            </Box>
        </Box>
    );
};

export default FilterComponent;

const styles = {
    input : {
        height: '35px',
        borderRight: '1px solid #2979FF',
        borderTopRightRadius: 'unset',
        borderBottomRightRadius: 'unset',
        '::placeholder': {
            color: 'white'
        }
    },
    exportButton: {
        background: 'linear-gradient(to right, #17c671, #0059B2)',
        padding: '10px',
        borderRadius: '10px',
        color: 'white',
    }
}