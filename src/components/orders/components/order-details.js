import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { List, Grid, Modal, Row, Col, Tag, Panel, ButtonToolbar, Button, Form } from 'rsuite';
import { getOrder } from 'dataStore/actions/ordersAction';
import { formatDate, formatDeadline } from '../../../../utils/dates';

const OrderDetails = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();
    const { orderID } = router.query;
    const dispatch = useDispatch();
    const orderSelector = useSelector(state => state.orderState);
    const {
        order : {
            id:orderId ,
            topic,
            phone,
            instructions,
            deadline,
            service,
            user,
            type,
            style,
            source,
            subject,
            language,
            page,
            level,
            spacing,
            urgency,
            amount,
            created_at,
        }} = orderSelector;


    React.useEffect(() => {
        getOrder(dispatch, orderID);
    }, [dispatch, orderID]);

    console.log(orderID);

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
                            <List.Item style={{ background: "#fdaa8f" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h4>{topic}</h4>
                                    <Tag size="lg"style={{background:"#17c671", color: "white"}}>${amount && amount.toFixed(2)}</Tag>
                                </div>
                            </List.Item>
                        </List>
                        <Grid fluid>
                            <Row>
                                <Col xs={24} sm={12} md={12} style={{ borderRight: "1px solid whitesmoke", }}>
                                    <List>
                                        <List.Item>
                                            ID
                                        </List.Item>
                                        <List.Item>
                                            Topic
                                        </List.Item>
                                        <List.Item>
                                            Deadline
                                        </List.Item>
                                        <List.Item>
                                            Language
                                        </List.Item>
                                        <List.Item>
                                            Level
                                        </List.Item>
                                        <List.Item>
                                            Subject
                                        </List.Item>
                                        <List.Item>
                                            Type of paper
                                        </List.Item>
                                        <List.Item>
                                            Service
                                        </List.Item>
                                        <List.Item>
                                           Style
                                        </List.Item>
                                        <List.Item>
                                            Urgency
                                        </List.Item>
                                        <List.Item>
                                            Amount
                                        </List.Item>
                                        <List.Item>
                                            Pages
                                        </List.Item>
                                        <List.Item>
                                            Spacing
                                        </List.Item>
                                        <List.Item>
                                            Sources
                                        </List.Item>
                                        <List.Item>
                                            Phone
                                        </List.Item>
                                        <List.Item>
                                            Created At
                                        </List.Item>
                                    </List>
                                </Col>
                                <Col xs={24} sm={12} md={12} style={{ borderRight: "1px solid whitesmoke", }}>
                                    <List>
                                        <List.Item style={{ color: "#1675e0" }}>
                                            {orderId}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                            {topic}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                            {formatDeadline(deadline)}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                            { language && language.name}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        { level && level.name}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        { subject && subject.name}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        { type && type.name}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        { service && service.name}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        { style && style.name}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        { urgency && urgency.name}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        { amount && amount.toFixed(2)}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        { page && page.name}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        { spacing && spacing.name}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        { source && source.name}
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        { phone }
                                        </List.Item>
                                        <List.Item style={{ color: "#1675e0" }}>
                                        {formatDate(created_at)}
                                        </List.Item>
                                    </List>
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                    <Col xs={12}>
                        <Panel shaded style={{background:"#fdaa8f"}}>
                        <h5>Edit Details</h5>
                        </Panel>
                        <Panel shaded style={{background: "#f2faff"}}>
                            <Form fluid>
                                <Form.Group controlId="name-1">
                                    <Form.ControlLabel>Topic</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group controlId="name-2">
                                    <Form.ControlLabel>Language</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group controlId="email-1">
                                    <Form.ControlLabel>Level</Form.ControlLabel>
                                    <Form.Control name="email" type="email" />
                                </Form.Group>
                                <Form.Group controlId="phone-1">
                                    <Form.ControlLabel>Subject</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group controlId="country-1">
                                    <Form.ControlLabel>Type of Paper</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group controlId="country-1">
                                    <Form.ControlLabel>Service</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group controlId="country-1">
                                    <Form.ControlLabel>Style</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group>
                                <Form.Group controlId="country-1">
                                    <Form.ControlLabel>Urgency</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
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