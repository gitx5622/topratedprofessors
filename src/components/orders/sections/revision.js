import React, { useState, useEffect } from 'react';
import {Tag, Panel, Divider, Pagination, Button} from 'rsuite';
import Link from 'next/link';
import NoData from 'assets/no-open.svg';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, formatDeadline } from '../../../../utils/dates';
import { getPendingOrders } from 'dataStore/actions/ordersAction';
import {Box} from "theme-ui";

const Revision = () => {
    const [activePage, setActivePage] = useState(1);
    const [per, setPer] = useState(10);
    const dispatch = useDispatch();
    const orderSelector = useSelector(state => state.orderState);
    const {
        pending_orders: {
            orders: pending_orders,
            pagination,
        }
    } = orderSelector;

    useEffect(() => {
        const { id: userId } = JSON.parse(localStorage.currentUser);
        getPendingOrders(dispatch, userId, activePage, per)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, activePage, per]);
    return (
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "20px" }}>
                <h3>Revision Orders:</h3>
            </div>
            <Divider />
            <table style={styles.table}>
                <tr>
                    <th style={styles.table.th}>ID</th>
                    <th style={styles.table.th}>Order Number</th>
                    <th style={styles.table.th}>Deadline</th>
                    <th style={styles.table.th}>Subject</th>
                    <th style={styles.table.th}>Promo Code</th>
                    <th style={styles.table.th}>Created At</th>
                    <th style={styles.table.th}>Amount</th>
                </tr>
                {pending_orders?.map((data) => (
                    <tr>
                        <td style={styles.table.td}>{data.id}</td>
                        <td style={styles.table.td}>
                            <Link href={`/dashboard/order/${data.id}`}>
                                <a>{data.order_number}</a>
                            </Link>
                        </td>
                        <td style={styles.table.td}>{formatDeadline(data.deadline)}</td>
                        <td style={styles.table.td}>{data.subject && (data.subject.name)}</td>
                        <td style={styles.table.td}>
                            <center><Tag color="orange">{data.promocode === "" ? "none" : promocode}</Tag>
                            </center>
                        </td>
                        <td style={styles.table.td}>
                            {formatDate(data.created_at)}
                        </td>
                        <td style={styles.table.td}>{data.amount.toFixed(2)}</td>
                    </tr>
                ))}
            </table><br/>
            {pending_orders && (
                <Pagination size="md" total={pagination.count} limit={per} activePage={activePage} onChangePage={(page) => setActivePage(page)}/>
            )}
            {!pending_orders && (
                <div>
                    <Panel>
                        <div style={{ marginTop: "100px" }}>
                            <center>
                                <img src={NoData} alt="" />
                                <h6>No Pending Orders</h6>
                            </center>
                        </div>
                    </Panel>
                </div>
            )}
        </div>
    );
};

export default Revision;

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