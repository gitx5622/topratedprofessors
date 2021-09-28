import React, {useState} from 'react';
import Pagination from "react-js-pagination";

const Paginate = ({total, pageSize}) => {
    const [activePage, setActivePage] = useState(1)
     const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
    }

    return (
        <div sx={styles}>
            <Pagination
                innerClass='pagination'
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default Paginate;

const styles = {
    'pagination': {
        listStyle: 'none',
    }
}