import React from "react";
import Head from 'next/head';
import {  Box } from 'theme-ui';
import Completed from "../sections/completed";
import Approved from "../sections/approved";
import CreateOrder from "../sections/create-order";
import AllOrders from "../sections/all-orders";
import Rejected from "../sections/rejected";
import Cancelled from "../sections/cancelled";
import Pending from "../sections/pending";
import WaitingAssign from "../sections/waiting-assign";
import Revision from "../sections/revision";

const OrderCard = ({ section }) => {
    return (
        <Box>
            <Head>
                <title>{section.toUpperCase().replace(/_/g, " ")}</title>
                <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet' />
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            {
                section === 'completed' && (
                    <Completed />
                )
            }
            {
                section === 'approved' && (
                    <Approved />
                )
            }
            {
                section === 'all-orders' && (
                    <AllOrders />
                )
            }
            {
                section === 'rejected' && (
                    <Rejected />
                )
            }
            {
                section === 'cancelled' && (
                    <Cancelled/>
                )
            }
            {
                section === 'revision' && (
                    <Revision/>
                )
            }
            {
                section === 'pending' && (
                    <Pending/>
                )
            }
            {
                section === 'waiting-assign' && (
                    <WaitingAssign/>
                )
            }
            {section === 'create_order' && (
                <CreateOrder />
            )}
        </Box>
    );
};
export default OrderCard;