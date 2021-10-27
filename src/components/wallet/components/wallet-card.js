/** @jsx jsx */
import React, { useState } from 'react';
import Head from 'next/head';
import {
    Button, Panel, Row, Col, Grid, ButtonToolbar,
    Table, Divider, Drawer, Form, Checkbox, Message, Modal,
} from 'rsuite';
import { jsx, Box, } from 'theme-ui';
import Payment from '../../../assets/payment.png';
import { executePayment, makePayment } from '../../../dataStore/actions/walletAtion';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

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
        event.persist();
        event.preventDefault();
        const { id: userID } = JSON.parse(localStorage.currentUser);
        const bodyData = {
            user_id: parseInt(userID),
            order_amount: parseInt(payment.order_amount, 10)

        }
        if (payment.amount !== "") {
            makePaypalPayment(bodyData).then(response => {
                const links = response.data.links[1].href;
                if (response.status === 200)router.replace(links)
            })
        } else {
            dispatchCheckDetails({
                type: 'ERROR',
                errorMessage: 'Make sure all the fields all filled',
            });
            if (errorMessage.errorMessage) {
                <Message type="error">Error</Message>
            }
        }
    };
    return (
        <Box>
            <Head>
                <title>Settings</title>
                <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet' />
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <Box sx={{ mt: "10px", mx: "10px" }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: '20px' }}>
                    <h3>My Balance $0.00</h3>
                    <Box>
                        <Button
                            color="cyan"
                            appearance="primary"
                            onClick={() => setOpenWithHeader(true)}>
                            Add Funds
                        </Button>
                        {" "}
                        <Button
                            color="green"
                            appearance="primary"
                            onClick={() => setOpenWithHeader(true)}>
                            Withdraw Funds
                        </Button>
                    </Box>
                    <Drawer
                        size='xs'
                        open={openWithHeader}
                        onClose={() => setOpenWithHeader(false)}>
                        <Drawer.Header>
                            <Drawer.Title>Deposit</Drawer.Title>
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
                </Box>
                <Divider />
                <Panel shaded>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={12} style={{ borderRight: "1px solid whitesmoke" }}>
                                <h5>Trasanctions</h5><br />
                                <Table bordered={true} cellBordered={true} height={350} style={{ color: "black", fontWeight: 500, fontFamily: "Quicksand, sans-serif" }}>
                                    <Table.Column width={100} align="center">
                                        <Table.HeaderCell style={{ background: "#fdaa8f" }}><h6>Date</h6></Table.HeaderCell>
                                        <Table.Cell dataKey="id" style={{ color: "black" }} />
                                    </Table.Column>
                                    <Table.Column width={100}>
                                        <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Type</h6></Table.HeaderCell>
                                        <Table.Cell dataKey="phone" />
                                    </Table.Column>
                                    <Table.Column width={120}>
                                        <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Amount</h6></Table.HeaderCell>
                                        <Table.Cell dataKey="phone" />
                                    </Table.Column>
                                    <Table.Column width={200}>
                                        <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Balance</h6></Table.HeaderCell>
                                        <ActionCell dataKey="id" />
                                    </Table.Column>
                                </Table>
                            </Col>
                            <Col xs={12}>
                                <form onSubmit={handleMakePaymentSubmit} fluid style={{ background: "whitesmoke", borderRadius: '20px', padding: "20px" }}>
                                    <h3>Add funds to your account</h3><br />
                                    <h5>Amount (USD): (Min amount: $0.01)</h5>
                                    <input style={{ height: '30px' }} name="order_amount" onChange={handleChange} /><br /><br />
                                    <h5>Payment Methods</h5>
                                    <Checkbox defaultChecked><img src={Payment} width="100" /></Checkbox>
                                    <button style={{ background: "#17c671", padding: "10px", borderRadius: "5px" }} type="submit">Proceed</button>
                                    {/* <Form.Group controlId="amount">
                                        <h5>Amount (USD): (Min amount: $0.01)</h5>
                                        <Form.ControlLabel>Amount</Form.ControlLabel>
                                        <Form.Control name="amount" onChange={handleChange} mb={3} />
                                        <Form.HelpText>Required</Form.HelpText>
                                    </Form.Group>
                                    <Form.Group controlId="name-1">
                                        <h5>Payment Methods</h5>
                                        <Checkbox defaultChecked><img src={Payment} width="100" /></Checkbox>
                                    </Form.Group>
                                    <Checkbox>
                                        Yes, I understand and agree to the Terms of Service , including the Privacy
                                        Policy and Refund Policy
                                    </Checkbox>
                                    <Form.Group>
                                        <ButtonToolbar>
                                            <Button type="submit" appearance="primary">Proceed</Button>
                                        </ButtonToolbar>
                                    </Form.Group> */}
                                </form>
                            </Col>
                        </Row>
                    </Grid>
                </Panel>
            </Box>

        </Box>
    );
};

export default WalletCard;
