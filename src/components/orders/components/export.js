import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from 'theme-ui';

const Export = ({data}) => {
    return (
        <div>
            <CSVLink data={data}><Button sx={styles.exportButton}>Export</Button></CSVLink>
        </div>
    );
};

export default Export;

const styles = {
    exportButton: {
        background: 'linear-gradient(to right, #17c671, #0059B2)'
    }
}