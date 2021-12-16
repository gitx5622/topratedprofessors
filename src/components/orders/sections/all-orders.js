import React, { useState, useEffect } from 'react';
import {Tag, Button, Divider, Pagination, Panel} from 'rsuite';
import { BoxLoading } from 'react-loadingg';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NoData from 'assets/no-open.svg';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, formatDeadline } from '../../../utils/dates';
import { getOrders } from 'dataStore/actions/ordersAction';

const AllOrders = () => {
    const [activePage, setActivePage] = React.useState(1);
    const [per, setPer] = React.useState(10);
    const router = useRouter();
    const dispatch = useDispatch();

    const orderSelector = useSelector(state => state.orderState);
    const {
        isLoading,
        orders: {
            orders: all_orders,
            pagination,
        },
    } = orderSelector;

    useEffect(() => {
        const { id: userId } = JSON.parse(localStorage.currentUser);
        getOrders(dispatch, userId, activePage, per)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, activePage, per]);

    console.log(all_orders);
    return (
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            {isLoading && (
                <BoxLoading />
            )}
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
                            <th style={styles.table.th}>Promo Code</th>
                            <th style={styles.table.th}>Pages</th>
                            <th style={styles.table.th}>Amount</th>
                            <th style={styles.table.th}>Status</th>
                        </tr>
                        {all_orders?.map((data, index) => (
                            <tr key={index}>
                                <td style={styles.table.td}>{data.id}</td>
                                <td style={styles.table.td}>
                                    <Link href={`/dashboard/order/${data.id}`}>
                                        <a>{data.order_number}</a>
                                    </Link>
                                </td>
                                <td style={styles.table.td}>{formatDeadline(data.deadline)}</td>
                                <td style={styles.table.td}>{data && data.type.name}</td>
                                <td style={styles.table.td}>
                                    <center><Tag color="orange">{data.promocode === "" ? "none" : promocode}</Tag>
                                    </center>
                                </td>
                                <td style={styles.table.td}>
                                    {data && data.page.name}
                                </td>
                                <td style={styles.table.td}>$ {(data.amount.toFixed(2))}</td>
                                <td style={styles.table.td}>
                                    <Tag color={data.status === "approved" ? "green": data.status === "pending" ? "red" : "blue"}>{data.status}</Tag>
                                </td>
                            </tr>
                        ))}
                    </table><br/>
                    {all_orders && (
                        <Pagination size="md" total={pagination.count} limit={per} activePage={activePage} onChangePage={(page) => setActivePage(page)}/>
                    )}
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
        </div>
    );
};

export default AllOrders;

const styles = {
    table: {
        fontFamily: 'Quicksand, sans-serif',
        borderCollapse: 'collapse',
        width: '100%',
        fontSize:"16px",
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