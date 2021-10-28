/** @jsx jsx */
import React, { useEffect } from "react";
import Head from 'next/head';
import { useDispatch, useSelector } from "react-redux";
import { jsx, Box } from 'theme-ui';
import { getOrders } from "../../../dataStore/actions/ordersAction";
import { BoxLoading } from 'react-loadingg';
import Completed from "../sections/completed";
import CreateOrder from "../sections/create-order";

const OrderCard = ({ section }) => {
    const dispatch = useDispatch();

    const orderSelector = useSelector(state => state.orderState);
    const {
        isLoading,
        orders: {
            orders: orderData,
            pagination
        }
    } = orderSelector;

    useEffect(() => {
        const { id: userId } = JSON.parse(localStorage.currentUser);
        getOrders(dispatch, userId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);


    return (
        <Box>
            <Head>
                <title>{section.toUpperCase().replace(/_/g, " ")}</title>
                <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet' />
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            {
                isLoading && (
                    <BoxLoading />
                )
            }
            {
                section === 'completed' && (
                    <Completed data={orderData} pagination={pagination} />
                )
            }
            {section === 'create_order' && (
                <CreateOrder />
            )}
        </Box>
    );
};
export default OrderCard;