import React, { useState, useEffect } from 'react';
import { Tag, Button, Drawer, Form, ButtonToolbar, Divider } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline'
import { Box } from 'theme-ui';
import { AiOutlineEye } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NoData from 'assets/no-open.svg';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, formatDeadline } from '../../../../utils/dates';
import { makePayment } from 'dataStore/actions/walletAction';
import { getOrders } from 'dataStore/actions/ordersAction';
import Loading from 'components/wallet/components/loading';


const AllOrders = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [openWithHeader, setOpenWithHeader] = useState(false);

    const orderSelector = useSelector(state => state.orderState);
    const {
        isLoading: ordersLoading,
        orders: {
            orders: all_orders,
            pagination
        },
        errorMessage,
    } = orderSelector;

    const walletSelector = useSelector(state => state.walletState);
    const { isLoading: walletLoading } = walletSelector;

    const handleReserveOrder = (data) => {
        const { id: userID } = JSON.parse(localStorage.currentUser);
        const bodyData = {
            order_number: data.order_number,
            order_amount: data.amount,
            user_id: userID
        }
        makePayment(dispatch, bodyData).then(response => {
            const links = response.data.links[1].href;
            if (response.status === 200) {
                router.push(links)
            } else if (response.status !== 200) {
                dispatch({
                    type: 'MAKE_PAYMENT_ERROR',
                    errorMessage: 'There was an error while making payment',
                });
            }
        })
    }

    useEffect(() => {
        const { id: userId } = JSON.parse(localStorage.currentUser);
        getOrders(dispatch, userId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);


    return (
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            {walletLoading && (
                <Loading />
            )}
            {!walletLoading && (
                <>
                    <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "20px" }}>
                        <h3>All Orders:</h3>
                    </div>
                    <Divider />
                    <table style={styles.table}>
                        <tr>
                            <th style={styles.table.th}>#</th>
                            <th style={styles.table.th}>Order ID</th>
                            <th style={styles.table.th}>Deadline</th>
                            <th style={styles.table.th}>Type</th>
                            <th style={styles.table.th}>Amount</th>
                            <th style={styles.table.th}>Promo Code</th>
                            <th style={styles.table.th}>Pages</th>
                            <th style={styles.table.th}>Status</th>
                            <th style={styles.table.th}>Actions</th>
                        </tr>
                        {all_orders?.map((data, index) => (
                            <tr>
                                <td style={styles.table.td}>{index}</td>
                                <td style={styles.table.td}>
                                    <Link href={`/dashboard/order/${data.id}`}>
                                        <a>{data.order_number}</a>
                                    </Link>
                                </td>
                                <td style={styles.table.td}>{formatDeadline(data.deadline)}</td>
                                <td style={styles.table.td}>{data && data.type.name}</td>
                                <td style={styles.table.td}>{(data.amount.toFixed(2))}</td>
                                <td style={styles.table.td}>
                                    <center><Tag color="orange">{data.promocode === "" ? "none" : promocode}</Tag>
                                    </center>
                                </td>
                                <td style={styles.table.td}>
                                    {data && data.page.name}
                                </td>
                                <td style={styles.table.td}>
                                    <Tag color="cyan">Pending</Tag>
                                </td>
                                <td style={styles.table.td}>
                                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                        <Box onClick={() => router.push(`/dashboard/order/${data.id}`)} sx={{ cursor: "pointer", justifyContent: "center", height: "30px", width: "30px", background: "#5CB85C", borderRadius: '5px' }}>
                                            <center><AiOutlineEye style={{ fontSize: '20px', color: "white", marginTop: "5px" }} /></center>
                                        </Box>
                                        <Box onClick={() => router.push(`/dashboard/order/${data.id}`)} sx={{ cursor: "pointer", justifyContent: "center", height: "30px", width: "30px", background: "#337AB7", borderRadius: '5px' }}>
                                            <center><FiEdit style={{ fontSize: '20px', color: "white", marginTop: "5px" }} /></center>
                                        </Box>
                                        <Box>
                                            <Button size="sm" onClick={() => handleReserveOrder(data)} color="green" appearance="primary">Reserve Order</Button>
                                        </Box>
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </table>
                    {!all_orders && (
                        <div>
                            <Panel>
                                <div style={{ marginTop: "100px" }}>
                                    <center>
                                        <img src={NoData} alt="" />
                                        <h6>You have no Orders</h6>
                                        <Button onClick={() => router.push('/dashboard/create_order')} color="green" appearance="primary">Create Order</Button>
                                    </center>
                                </div>
                            </Panel>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllOrders;

const styles = {
    table: {
        fontFamily: 'Quicksand, sans-serif',
        borderCollapse: 'collapse',
        width: '100%',
        td: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
        },
        th: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
            background: '#fdaa8f',
        }
    },
}