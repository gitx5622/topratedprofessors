/** @jsx jsx */
import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import { useDispatch, useSelector} from "react-redux";
import { jsx, Box, Grid, Button } from 'theme-ui';
import {getOrders} from "../../dataStore/actions/ordersAction";
import dayjs from "dayjs";

const OrderCard = ({section}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const orderSelector = useSelector(state => state.orderState);
    const {
        orders: {
            orders: orderData,
            pagination
        }
    } = orderSelector;

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const { id: userId } = JSON.parse(localStorage.currentUser);
        getOrders(dispatch, userId )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <Box>
            <Grid sx={styles.grid}>
                <Box sx={styles.sidebar}>
                    <ul sx={styles.list}>
                        <li className={`completed ${section === 'completed' ?  'active' : '' } `}><a href='/dashboard/completed'>Completed</a></li>
                        <li className={`all-orders ${section === 'all-orders' ?  'active' : '' } `}><a href='/dashboard/all-orders'>All Orders</a></li>
                        <li className={`waiting-assign ${section === 'waiting-assign' ?  'active' : '' } `}><a href='/dashboard/waiting-assign'>To be Assigned</a></li>
                        <li className={`rejected ${section === 'rejected' ?  'active' : '' } `}><a href='/dashboard/rejected'>Rejected</a></li>
                        <li className={`approved ${section === 'approved' ?  'active' : '' } `}><a href='/dashboard/approved'>Approved</a></li>
                        <li className={`pending ${section === 'pending' ?  'active' : '' } `}><a href='/dashboard/pending'>Pending</a></li>
                        <li className={`settings ${section === 'settings' ?  'active' : '' } `}><a href='/dashboard/settings'>Settings</a></li>
                    </ul>
                </Box>
                <Box style={{overflowX:'auto'}}>
                    <table sx={styles.table} >
                        <thead>
                        <tr sx={styles.table.tableHead}>
                            <th >Order No</th>
                            <th>Deadline</th>
                            <th>Type</th>
                            <th>Pages</th>
                            <th>Amount</th>
                            <th>Actions</th>
                            <th>Reserve Now</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderData && orderData.map(order => { return (
                            <tr key={order.id}>
                                <td><a href={`/orders/order_details/${order.id}`}>{order.order_number}</a></td>
                                <td>{dayjs(order.deadline).format("dddd, MMMM D YYYY")}</td>
                                <td>{order.type.name}</td>
                                <td>{order.page.no_of_page}</td>
                                <td>{(order.amount).toFixed(2)}</td>
                                <td><Button className="reserve-button">Reserve Now</Button></td>
                            </tr>
                        )})}
                        </tbody>
                    </table>
                </Box>
            </Grid>
        </Box>
    );
};

export default OrderCard;

const styles = {
    grid: {
        gridGap: [
            '40px 0',
            null,
            '45px 30px',
            null,
            '60px 50px',
            '70px 50px',
            null,
            '80px 90px',
        ],
        gridTemplateColumns: ['4fr', '4fr','4fr', '1fr 3fr'],
    },
    sidebar: {
        borderRight: '1px solid rgba(0, 0, 0, 0.2)',
    },
    list : {
        '.completed': {
            '&.active': {
                a: {
                    color: 'white'
                },
                color: '#ffffff',
                backgroundColor: 'secondary',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },
        '.all-orders': {
            '&.active': {
                a: {
                    color: 'white'
                },
                color: '#ffffff',
                backgroundColor: 'secondary',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },
        '.waiting-assign': {
            '&.active': {
                a: {
                    color: 'white'
                },
                color: '#ffffff',
                backgroundColor: 'secondary',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },
        '.rejected': {
            '&.active': {
                a: {
                    color: 'white'
                },
                color: '#ffffff',
                backgroundColor: 'secondary',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },
        '.pending': {
            '&.active': {
                a: {
                    color: 'white'
                },
                backgroundColor: 'secondary',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },
        '.approved': {
            '&.active': {
                a: {
                    color: 'white'
                },
                color: '#ffffff',
                backgroundColor: 'secondary',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },

        listStyle: 'none',
        fontSize: [25, null, 30],
        li : {
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
            p: ['5px', null, '5px'],
            borderRadius: '5px',
            a: {
                textDecoration: 'none',
                color: 'black',
            }
        }
    },
    table : {
        th: {
            backgroundColor: 'secondary',
            py: ['15px', null, '15px'],
            px: ['5px', null, '7px']
        }
    },
}