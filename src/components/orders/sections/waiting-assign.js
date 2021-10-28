import React, { useState, useEffect } from 'react';
import {
    Table, Pagination, Tag, Button, Drawer, Form, ButtonToolbar, Divider
} from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline'
import { Box } from 'theme-ui';
import { AiOutlineEye } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, formatDeadline } from '../../../../utils/dates';
import { makePayment } from 'dataStore/actions/walletAction';
import { getWaitingAssignOrders } from 'dataStore/actions/ordersAction';




const OrderNumberCell = ({ rowData, dataKey, ...props }) => {
    return (
        <Table.Cell {...props} className="link-group">
            <center>
                <Link href={`/dashboard/order/${rowData.id}`}>
                    <a>{rowData.order_number}</a>
                </Link>
            </center>
        </Table.Cell>
    );
};
const PromoCell = ({ rowData, dataKey, ...props }) => {
    return (
        <Table.Cell {...props} className="link-group">
            <center><Tag color="orange">{rowData.promocode === "" ? "none" : promocode}</Tag></center>
        </Table.Cell>
    );
};
const DeadlineCell = ({ rowData, dataKey, ...props }) => {
    return (
        <Table.Cell {...props} className="link-group">
            {formatDeadline(rowData.deadline)}
        </Table.Cell>
    );
};
const AmountCell = ({ rowData, dataKey, ...props }) => {
    return (
        <Table.Cell {...props} className="link-group">
            <center>${(rowData.amount).toFixed(2)}</center>
        </Table.Cell>
    );
};
const CreateAtCell = ({ rowData, dataKey, ...props }) => {
    return (
        <Table.Cell {...props} className="link-group">
            {formatDate(rowData.created_at)}
        </Table.Cell>
    );
};
const WaitingAssign = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [openWithHeader, setOpenWithHeader] = useState(false);

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
        getWaitingAssignOrders(dispatch, userId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const ActionCell = ({ rowData, dataKey, ...props }) => {
        const handleReserveOrder = () => {
            const { id: userID } = JSON.parse(localStorage.currentUser);
            const bodyData = {
                order_number: rowData.order_number,
                order_amount: rowData.amount,
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
        return (
            <center>
                <Table.Cell {...props} className="link-group">
                    <Box sx={{ display: "flex", gap: 1, }}>
                        <Box onClick={() => router.push(`/dashboard/order/${rowData.id}`)} sx={{ cursor: "pointer", justifyContent: "center", height: "30px", width: "30px", background: "#5CB85C", borderRadius: '5px' }}>
                            <center><AiOutlineEye style={{ fontSize: '20px', color: "white", marginTop: "5px" }} /></center>
                        </Box>
                        <Box onClick={() => router.push(`/dashboard/order/${rowData.id}`)} sx={{ cursor: "pointer", justifyContent: "center", height: "30px", width: "30px", background: "#337AB7", borderRadius: '5px' }}>
                            <center><FiEdit style={{ fontSize: '20px', color: "white", marginTop: "5px" }} /></center>
                        </Box>
                        <Box>
                            <Button sx={{ marginBottom: "2px" }} onClick={handleReserveOrder} color="green" appearance="primary">Reserve Order</Button>
                        </Box>
                    </Box>
                </Table.Cell>
            </center>
        );
    };
    return (
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "20px" }}>
                <h3>Available Orders:</h3>
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
            <Table bordered={true} cellBordered={true} height={550} data={orderData} style={{ color: "black", fontWeight: 500, fontFamily: "Quicksand, sans-serif" }}>
                <Table.Column width={50} align="center">
                    <Table.HeaderCell style={{ background: "#fdaa8f" }}><h6>Id</h6></Table.HeaderCell>
                    <Table.Cell dataKey="id" style={{ color: "black" }} />
                </Table.Column>
                <Table.Column width={120}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Order Number</h6></Table.HeaderCell>
                    <OrderNumberCell dataKey="order_number" style={{ color: "#1675E0" }} />
                </Table.Column>

                <Table.Column width={170}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Deadline</h6></Table.HeaderCell>
                    <DeadlineCell dataKey="deadline" />
                </Table.Column>

                <Table.Column width={100}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Amount</h6></Table.HeaderCell>
                    <AmountCell dataKey="amount" style={{ color: "#1675E0" }} />
                </Table.Column>
                <Table.Column width={120}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Phone</h6></Table.HeaderCell>
                    <Table.Cell dataKey="phone" />
                </Table.Column>
                <Table.Column width={100}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Promocode</h6></Table.HeaderCell>
                    <PromoCell dataKey="promocode" />
                </Table.Column>
                <Table.Column width={170} resizable>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Created At</h6></Table.HeaderCell>
                    <CreateAtCell dataKey="created_at" />
                </Table.Column>
                <Table.Column width={240}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Actions</h6></Table.HeaderCell>
                    <ActionCell dataKey="id" />
                </Table.Column>
            </Table>
            {/* <div style={{ padding: 20 }}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="xs"
                    layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                    total={pagination > 0 ? pagination.count : ""}
                    limitOptions={[10, 20]}
                    limit={pagination.per}
                    activePage={pagination.page}
                // onChangePage={setPage}
                // onChangeLimit={handleChangeLimit}
                />
            </div> */}
        </div>
    );
};

export default WaitingAssign;