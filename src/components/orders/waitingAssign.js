/** @jsx jsx */
import React from 'react';
import { jsx, Text } from 'theme-ui';
import OrderCard from "./order-card";

const WaitingAssign = ({section}) => {
    return (
        <div sx={styles.completed}>
            <OrderCard
                section={section}
            />
        </div>
    );
};

export default WaitingAssign;

const styles = {
    completed: {
        pt: ['50px', null, '70px'],
        pb: ['0px', null, '10px'],
        px: ['0px', null, '10px']
    }
}