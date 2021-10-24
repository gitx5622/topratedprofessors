import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { List, Grid, Modal, Row, Col, Tag, Panel, ButtonToolbar, Button, Form } from 'rsuite';
// import { getUser } from '../../state/actions/usersAction';




const OrderDetails = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const router = useRouter();
    // const { userID } = router.query;
    // const dispatch = useDispatch();
    // const userSelector = useSelector(state => state.usersState);
    // const { user } = userSelector;

    // React.useEffect(() => {
    //     getUser(dispatch, userID);
    // }, [dispatch, userID]);

    return (
        <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "20px" }}>
                <h5>Order Details:</h5>
                <Button onClick={handleOpen} color="red" appearance="primary">Delete Order</Button>
            </div>
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
            <br />
            <Grid fluid>
                <Row className="show-grid">
                    <Col xs={12}>
                        <List bordered>
                            <List.Item style={{ background: "#34c3ff" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h4>Heading</h4>
                                    <Tag size="lg" color="violet">avatar</Tag>
                                </div>
                            </List.Item>
                        </List>
                        <Grid fluid>
                            <Row>
                                <Col xs={24} sm={12} md={12} style={{ borderRight: "1px solid whitesmoke", }}>
                                    <List>
                                        <List.Item>
                                            First Name
                                        </List.Item>
                                        <List.Item>
                                            Last Name
                                        </List.Item>
                                        <List.Item>
                                            Gender
                                        </List.Item>
                                        <List.Item>
                                            Email
                                        </List.Item>
                                        <List.Item>
                                            Country
                                        </List.Item>
                                        <List.Item>
                                            Phone Number
                                        </List.Item>
                                        <List.Item>
                                            Role
                                        </List.Item>
                                        <List.Item>
                                            Status
                                        </List.Item>
                                        <List.Item>
                                            Created At
                                        </List.Item>
                                    </List>
                                </Col>
                                <Col xs={24} sm={12} md={12} style={{ borderRight: "1px solid whitesmoke", }}>
                                    <List>
                                        <List.Item style={{ color: "#1675e0" }}>
                                            first name
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                            last
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                           gender
                                        </List.Item>
                                    </List>
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                    <Col xs={12}>
                        <Panel header="Edit Details" shaded>
                            <Form fluid>
                                <Form.Group controlId="name-1">
                                    <Form.ControlLabel>First Name</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group controlId="name-2">
                                    <Form.ControlLabel>Last Name</Form.ControlLabel>
                                    <Form.Control name="name"  />
                                </Form.Group>
                                <Form.Group controlId="email-1">
                                    <Form.ControlLabel>Email</Form.ControlLabel>
                                    <Form.Control name="email" type="email"  />
                                </Form.Group>
                                <Form.Group controlId="phone-1">
                                    <Form.ControlLabel>Phone Number</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group controlId="country-1">
                                    <Form.ControlLabel>Country</Form.ControlLabel>
                                    <Form.Control name="name"  />
                                </Form.Group>
                                <Form.Group>
                                    <ButtonToolbar>
                                        <Button appearance="primary">Edit</Button>
                                    </ButtonToolbar>
                                </Form.Group>
                            </Form>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default OrderDetails;