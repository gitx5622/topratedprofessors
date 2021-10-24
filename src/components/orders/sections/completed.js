import React, {useState} from 'react';
import {
    Table, Pagination, Panel, Button, Drawer, Form, ButtonToolbar, Divider
} from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline'
import { Box } from 'theme-ui';
import { AiOutlineEye, AiTwotoneDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';


const ActionCell = ({ rowData, dataKey, ...props }) => {
    function handleAction() {
        alert(`id:${rowData[dataKey]}`);
    }
    return (
        <Table.Cell {...props} className="link-group">
            <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ justifyContent: "center", height: "30px", width: "30px", background: "#5CB85C", borderRadius: '5px' }}>
                    <center><AiOutlineEye style={{ fontSize: '20px', color: "white", marginTop: "5px" }} /></center>
                </Box>
                <Box sx={{ justifyContent: "center", height: "30px", width: "30px", background: "#d9534f", borderRadius: '5px' }}>
                    <center><AiTwotoneDelete style={{ fontSize: '20px', color: "white", marginTop: "5px" }} /></center>
                </Box>
                <Box sx={{ justifyContent: "center", height: "30px", width: "30px", background: "#337AB7", borderRadius: '5px' }}>
                    <center><FiEdit style={{ fontSize: '20px', color: "white", marginTop: "5px" }} /></center>
                </Box>
            </Box>
        </Table.Cell>
    );
};

const Completed = ({data, pagination}) => {
    const [openWithHeader, setOpenWithHeader] = useState(false);
    return (
        <div style={{marginLeft: "10px", marginRight: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "20px" }}>
                <h3>My Orders:</h3>
                <Button
                    color="cyan"
                    appearance="primary"
                    onClick={() => setOpenWithHeader(true)}><AddOutlineIcon color="white" style={{ fontSize: '2em' }} />
                </Button>
                <Drawer
                    size='xs'
                    open={openWithHeader}
                    onClose={() => setOpenWithHeader(false)}>
                    <Drawer.Header>setStartDate
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
            <Divider/>
            <Panel shaded>
                <Table bordered={true} cellBordered={true} height={500} data={data} style={{ color: "black", fontFamily: "Quicksand, sans-serif" }}>
                    <Table.Column width={50} align="center" resizable>
                        <Table.HeaderCell style={{ background: "#34c3ff" }}><h6>Id</h6></Table.HeaderCell>
                        <Table.Cell dataKey="id" style={{ color: "#1675E0" }} />
                    </Table.Column>
                    <Table.Column width={100} resizable>
                        <Table.HeaderCell style={{ background: "#34c3ff", color: "black" }}><h6>Order Number</h6></Table.HeaderCell>
                        <Table.Cell dataKey="order_number" />
                    </Table.Column>

                    <Table.Column width={100}>
                        <Table.HeaderCell style={{ background: "#34c3ff", color: "black" }}><h6>Deadline</h6></Table.HeaderCell>
                        <Table.Cell dataKey="deadline" />
                    </Table.Column>

                    <Table.Column width={200}>
                        <Table.HeaderCell style={{ background: "#34c3ff", color: "black" }}><h6>Email</h6></Table.HeaderCell>
                        <Table.Cell dataKey="type.name" style={{ color: "#1675E0" }} />
                    </Table.Column>
                    <Table.Column width={200} flexGrow={1}>
                        <Table.HeaderCell style={{ background: "#34c3ff", color: "black" }}><h6>Phone</h6></Table.HeaderCell>
                        <Table.Cell dataKey="phone" />
                    </Table.Column>
                    <Table.Column width={200} flexGrow={1}>
                        <Table.HeaderCell style={{ background: "#34c3ff", color: "black" }}><h6>Country</h6></Table.HeaderCell>
                        <Table.Cell dataKey="country" />
                    </Table.Column>
                    <Table.Column width={200} flexGrow={1}>
                        <Table.HeaderCell style={{ background: "#34c3ff", color: "black" }}><h6>Created At</h6></Table.HeaderCell>
                        <Table.Cell dataKey="created_at" />
                    </Table.Column>
                    <Table.Column width={200} flexGrow={1}>
                        <Table.HeaderCell style={{ background: "#34c3ff", color: "black" }}><h6>Actions</h6></Table.HeaderCell>
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
            </Panel>
        </div>
    );
};

export default Completed;