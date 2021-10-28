/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import OrderCard from "./order-card";

const AllOrders = ({section}) => {
    return (
        <div sx={styles.completed}>
            <OrderCard
                section={section}
            />
        </div>
    );
};

export default AllOrders;

const styles = {
    completed: {
        pt: ['10px', null, '10px'],
        pb: ['0px', null, '10px'],
        px: ['0px', null, '10px']
    }
}