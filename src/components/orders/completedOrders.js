/** @jsx jsx */
import React, {useEffect} from 'react';
import {Alert, jsx, Close} from 'theme-ui';
import OrderCard from "./components/order-card";

const CompletedOrders = ({section}) => {
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.currentUser);
        if(!currentUser){
            router.push('/user/login');
        }else {
            <Alert>
                There was an error - You need to login first
                <Close ml="auto" mr={-2} />
            </Alert>
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div sx={styles.completed}>
            <OrderCard
                section={section}
            />
        </div>
    );
};

export default CompletedOrders;

const styles = {
    completed: {
        pt: ['50px', null, '70px'],
        pb: ['0px', null, '10px'],
        px: ['0px', null, '10px']
    }
}