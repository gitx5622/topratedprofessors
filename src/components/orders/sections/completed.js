import React, { useState } from 'react';
import {
    Table, Pagination, Tag, Modal, Button, Drawer, Form, ButtonToolbar, Divider
} from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline'
import { Box } from 'theme-ui';
import { AiOutlineEye, AiTwotoneDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { formatDate, formatDeadline } from '../../../../utils/dates';


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
const Completed = ({ data, pagination }) => {
    const router = useRouter();
    const [openWithHeader, setOpenWithHeader] = useState(false);
    return (
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "20px" }}>
                <h3>My Orders:</h3>
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
            <Table bordered={true} cellBordered={true} height={550} data={data} style={{ color: "black", fontWeight: 500, fontFamily: "Quicksand, sans-serif" }}>
                <Table.Column width={50} align="center">
                    <Table.HeaderCell style={{ background: "#fdaa8f" }}><h6>Id</h6></Table.HeaderCell>
                    <Table.Cell dataKey="id" style={{ color: "black" }} />
                </Table.Column>
                <Table.Column width={100} flexGrow={1}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Order Number</h6></Table.HeaderCell>
                    <OrderNumberCell dataKey="order_number" style={{ color: "#1675E0" }} />
                </Table.Column>

                <Table.Column width={100} flexGrow={1}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Deadline</h6></Table.HeaderCell>
                    <DeadlineCell dataKey="deadline" />
                </Table.Column>

                <Table.Column width={100}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Amount</h6></Table.HeaderCell>
                    <AmountCell dataKey="amount" style={{ color: "#1675E0" }} />
                </Table.Column>
                <Table.Column width={200} flexGrow={1}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Phone</h6></Table.HeaderCell>
                    <Table.Cell dataKey="phone" />
                </Table.Column>
                <Table.Column width={100}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Promocode</h6></Table.HeaderCell>
                    <PromoCell dataKey="promocode" />
                </Table.Column>
                <Table.Column width={200} resizable>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Created At</h6></Table.HeaderCell>
                    <CreateAtCell dataKey="created_at" />
                </Table.Column>
                <Table.Column width={200} flexGrow={1}>
                    <Table.HeaderCell style={{ background: "#fdaa8f", color: "black" }}><h6>Actions</h6></Table.HeaderCell>
                    <ActionCell dataKey="id" />
                </Table.Column>
            </Table>
            <div style={{ padding: 20 }}>
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
                    total={pagination.count}
                    limitOptions={[10, 20]}
                    limit={pagination.per}
                    activePage={pagination.page}
                // onChangePage={setPage}
                // onChangeLimit={handleChangeLimit}
                />
            </div>
        </div>
    );
};

export default Completed;