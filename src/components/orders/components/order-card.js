/** @jsx jsx */
import React, {useEffect} from "react";
import Head from 'next/head';
import {useRouter} from "next/router";
import { useDispatch, useSelector} from "react-redux";
import {jsx, Box, Button,Image} from 'theme-ui';
import {getOrders} from "../../../dataStore/actions/ordersAction";
import NoData from '../../../assets/no-open.svg';
import { MdAddCircle } from 'react-icons/md';
import { Panel } from 'rsuite';
import { BoxLoading } from 'react-loadingg';
import Completed from "../sections/completed";
import CreateOrder from "../sections/create-order";

const OrderCard = ({section}) => {
   
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    const router = useRouter();
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
        getOrders(dispatch, userId )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    

    const filteredItems = orderData?.filter(
        item => item.type.name && item.type.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    return (
        <Box>
            <Head>
                <title>{section.toUpperCase().replace(/_/g, " ")}</title>
                <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'/>
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
            </Head>
                    {orderData ?
                        <>
                            {
                                isLoading && (
                                    <BoxLoading/>
                                )
                            }
                    
                            {section === 'completed' && (
                               <Completed data={filteredItems} pagination={pagination}/>
                                )}
                        </>
                        : (
                            section === 'create_order' ? '' : (
                                <Panel shaded>
                                    <Box sx={{display: "flex", flexDirection: 'column'}}>
                                        <center>
                                            <Image src={NoData} alt="no-data"/><br/>
                                            <h3>You have no Active Order</h3><br/>
                                            <Button onClick={() => router.push('/dashboard/create_order')}
                                                    sx={{background: 'linear-gradient(to right, #17c671, #0059B2)'}}><MdAddCircle/> Place
                                                Order</Button>
                                        </center>
                                    </Box>
                                </Panel>
                            )
                        )
                        }
                    {section === 'create_order' && (
                       <CreateOrder/>
                    )}
        </Box>
    );
};
export default OrderCard;