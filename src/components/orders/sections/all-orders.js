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

    const orderSelector = useSelector(state => state.orderState);
    const {
        orders: {
            orders: all_orders,
        },
    } = orderSelector;

    const walletSelector = useSelector(state => state.walletState);
    const { isLoading: walletLoading } = walletSelector;

  
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