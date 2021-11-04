/** @jsx jsx */
import React, { useState } from 'react';
import Head from 'next/head';
import {
    Button, Panel, Row, Col, Grid, ButtonToolbar,
    Table, Divider, Drawer, Form, Message, Modal, Placeholder, Tag,
} from 'rsuite';
import { jsx, Box, } from 'theme-ui';
import Payment from '../../../assets/payment.png';
import { makePayment } from '../../../dataStore/actions/walletAction';
import { useDispatch, useSelector } from "react-redux";
import Loading from './loading';
import { useRouter } from 'next/router';
import Link from "next/link";
import {formatDate, formatDeadline} from "../../../../utils/dates";
import {AiOutlineEye} from "react-icons/ai";
import {FiEdit} from "react-icons/fi";

const ActionCell = ({ rowData, dataKey, ...props }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();
    return (
        <Table.Cell {...props} className="link-group">
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                <Box onClick={() => router.push(`/dashboard/order/${rowData.id}`)} sx={{ justifyContent: "center", height: "30px", width: "30px", background: "#5CB85C", borderRadius: '5px' }}>
                    <center><AiOutlineEye style={{ fontSize: '20px', color: "white", marginTop: "5px" }} /></center>
                </Box>
                <Box onClick={handleOpen} sx={{ justifyContent: "center", height: "30px", width: "30px", background: "#d9534f", borderRadius: '5px' }}>
                    <center><AiTwotoneDelete style={{ fontSize: '20px', color: "white", marginTop: "5px" }} /></center>
                </Box>
                <Box onClick={handleOpen} sx={{ justifyContent: "center", height: "30px", width: "30px", background: "#337AB7", borderRadius: '5px' }}>
                    <center><FiEdit style={{ fontSize: '20px', color: "white", marginTop: "5px" }} /></center>
                </Box>
                <Modal open={open} onClose={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Delete Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Are you sure you want to delete this order</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose} color="red" appearance="primary">
                            Ok
                        </Button>
                        <Button onClick={handleClose} color="cyan" appearance="primary">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Box>
        </Table.Cell>
    );
};
const WalletCard = ({ section }) => {
    const [openWithHeader, setOpenWithHeader] = useState(false);
    const [payment, setPayment] = useState({
        order_amount: "",
        user_id: "",
    });

    const dispatch = useDispatch();
    const router = useRouter();

    const walletSelector = useSelector(state => state.walletState);
    const { isLoading: walletLoading, errorMessage: walletError } = walletSelector;

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setPayment({
            ...payment,
            [name]: value,
        })
    };

    const makePaypalPayment = (credentials) => makePayment(dispatch, credentials);

    const handleMakePaymentSubmit = (event) => {
        event.preventDefault();
        const { id: userID } = JSON.parse(localStorage.currentUser);
        const bodyData = {
            user_id: parseInt(userID),
            order_amount: parseInt(payment.order_amount, 10)
        }
        if (payment.order_amount !== "") {
            makePaypalPayment(bodyData).then(response => {
                const links = response.data.links[1].href;
                if (response.status === 200) router.push(links)
            })
        } else {
            dispatch({
                type: 'MAKE_PAYMENT_ERROR',
                errorMessage: 'Make sure all the fields all filled',
            });
        }
    };

    return (
        <Box>
            <Head>
                <title>Settings</title>
                <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet' />
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            {walletLoading && (
                <Loading />
            )}
            {!walletLoading && (
                <Box sx={{ mt: "10px", mx: "10px" }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: '20px' }}>
                        <h3>My Balance: <span style={{ color: "blue" }}>$0.00</span></h3>
                    </Box>
                    <Divider />
                    {walletError && (
                        <Message type="error">{walletError}</Message>
                    )}
                    <Panel shaded>
                        <Grid fluid>
                            <Row className="show-grid">
                                <Col xs={24} sm={24} md={12} style={{ borderRight: "1px solid whitesmoke" }}>
                                    <Panel style={{ background: "whitesmoke", borderRadius: "20px", marginBottom: "20px" }}>
                                        <h5>Trasanctions</h5><br />
                                        <table style={styles.table}>
                                            <tr>
                                                <th style={styles.table.th}>ID</th>
                                                <th style={styles.table.th}>Order Number</th>
                                                <th style={styles.table.th}>Deadline</th>
                                            </tr>
                                                <tr>
                                                    <td style={styles.table.td}>ID</td>
                                                    <td style={styles.table.td}>Order Number</td>
                                                    <td style={styles.table.td}>Deadline</td>
                                                </tr>
                                        </table>
                                    </Panel>
                                </Col>
                                <Col xs={24} sm={24} md={12} >
                                    <form onSubmit={handleMakePaymentSubmit} style={{ background: "whitesmoke", borderRadius: '20px', padding: "20px" }}>
                                        <center>
                                            <h3>Add funds to your account</h3><br />
                                            <h5>Amount (USD): (Min amount: $0.01)</h5><br />
                                            <input style={{ borderRadius: "5px", fontSize: "24px", border: "1px solid #444141", height: '40px', width: "80%" }} name="order_amount" onChange={handleChange} /><br /><br />
                                            <h5>Payment Methods</h5>
                                            <img src={Payment} width="100" alt="" /><br /><br />
                                            <p>
                                                By clicking proceed button, means I understand and agree to the Terms of Service , including the Privacy
                                                Policy and Refund Policy
                                            </p>
                                            <button style={{ background: "#17c671", color: "white", width: "80%", padding: "10px", borderRadius: "5px" }} type="submit">Proceed</button>
                                        </center>
                                    </form>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                </Box>
            )}
        </Box>
    );
};

export default WalletCard;

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
