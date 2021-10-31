import React, { useState, useEffect } from 'react';
import { Tag, Button, Panel, Drawer, Form, ButtonToolbar, Divider } from 'rsuite';
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
import { getActiveOrders } from 'dataStore/actions/ordersAction';


const InProgress = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [openWithHeader, setOpenWithHeader] = useState(false);

    const orderSelector = useSelector(state => state.orderState);
    const {
        isLoading,
        active_orders: {
            orders: active_orders,
            pagination
        }
    } = orderSelector;

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
        getActiveOrders(dispatch, userId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "20px" }}>
                <h3>Active Orders:</h3>
                <Button
                    style={{ background: "#17c671" }}
                    appearance="primary"
                    onClick={() => setOpenWithHeader(true)}><AddOutlineIcon color="white" style={{ fontSize: '2em' }} />
                </Button>
                <Drawer
                    size='xs'
                    open={openWithHeader}
                    onClose={() => setOpenWithHeader(false)}>
                    <Drawer.Header>
                        <Drawer.Title>Add User</Drawer.Title>
                        <Drawer.Actions>
                            <Button onClick={() => setOpenWithHeader(false)} appearance="primary">
                                Close
                            </Button>
                        </Drawer.Actions>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Form fluid>
                            <Form.Group controlId="name-1">
                                <Form.ControlLabel>First Name</Form.ControlLabel>
                                <Form.Control name="name" />
                                <Form.HelpText>Required</Form.HelpText>
                            </Form.Group>
                            <Form.Group controlId="name-2">
                                <Form.ControlLabel>Last Name</Form.ControlLabel>
                                <Form.Control name="name" />
                                <Form.HelpText>Required</Form.HelpText>
                            </Form.Group>
                            <Form.Group controlId="email-1">
                                <Form.ControlLabel>Email</Form.ControlLabel>
                                <Form.Control name="email" type="email" />
                                <Form.HelpText>Required</Form.HelpText>
                            </Form.Group>
                            <Form.Group controlId="phone-1">
                                <Form.ControlLabel>Phone</Form.ControlLabel>
                                <Form.Control name="name" />
                            </Form.Group>
                            <Form.Group controlId="gender-1">
                                <Form.ControlLabel>Gender</Form.ControlLabel>
                                <Form.Control name="name" />
                            </Form.Group>
                            <Form.Group controlId="country-1">
                                <Form.ControlLabel>Gender</Form.ControlLabel>
                                <Form.Control name="name" />
                            </Form.Group>
                            <Form.Group>
                                <ButtonToolbar>
                                    <Button appearance="primary">Submit</Button>
                                    <Button appearance="default">Cancel</Button>
                                </ButtonToolbar>
                            </Form.Group>
                        </Form>
                    </Drawer.Body>
                </Drawer>
            </div>
            <Divider />
            <table style={styles.table}>
                <tr>
                    <th style={styles.table.th}>ID</th>
                    <th style={styles.table.th}>Order Number</th>
                    <th style={styles.table.th}>Deadline</th>
                    <th style={styles.table.th}>Amount</th>
                    <th style={styles.table.th}>Phone</th>
                    <th style={styles.table.th}>Promo Code</th>
                    <th style={styles.table.th}>Created At</th>
                    <th style={styles.table.th}>Actions</th>
                </tr>
                {active_orders?.map((data) => (
                    <tr>
                        <td style={styles.table.td}>{data.id}</td>
                        <td style={styles.table.td}>
                            <Link href={`/dashboard/order/${data.id}`}>
                                <a>{data.order_number}</a>
                            </Link>
                        </td>
                        <td style={styles.table.td}>{formatDeadline(data.deadline)}</td>
                        <td style={styles.table.td}>{data.amount}</td>
                        <td style={styles.table.td}>{data.phone}</td>
                        <td style={styles.table.td}>
                            <center><Tag color="orange">{data.promocode === "" ? "none" : promocode}</Tag>
                            </center>
                        </td>
                        <td style={styles.table.td}>
                            {formatDate(data.created_at)}
                        </td>
                        <td style={styles.table.td}>
                            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                <Box onClick={() => router.push(`/dashboard/order/${data.id}`)} sx={{ cursor: "pointer", justifyContent: "center", height: "30px", width: "30px", background: "#5CB85C", borderRadius: '5px' }}>
                                    <center><AiOutlineEye style={{ fontSize: '20px', color: "white", marginTop: "5px" }} /></center>
                                </Box>
                                <Box onClick={() => router.push(`/dashboard/order/${rowData.id}`)} sx={{ cursor: "pointer", justifyContent: "center", height: "30px", width: "30px", background: "#337AB7", borderRadius: '5px' }}>
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
            {!active_orders && (
                <div>
                    <Panel>
                        <div style={{ marginTop: "100px" }}>
                            <center>
                                <img src={NoData} alt="" />
                                <h6>No Orders in progress/Active Orders</h6>
                            </center>
                        </div>
                    </Panel>
                </div>
            )}
        </div>
    );
};

export default InProgress;

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