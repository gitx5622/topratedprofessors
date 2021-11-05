import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {Panel, Divider, Button, Modal} from 'rsuite';
import { getOrder } from 'dataStore/actions/ordersAction';
import { formatDate, formatDeadline } from '../../../../utils/dates';
import {makePayment} from "../../../dataStore/actions/walletAction";

const OrderDetails = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const router = useRouter();
    const { orderID } = router.query;
    const dispatch = useDispatch();
    const orderSelector = useSelector(state => state.orderState);
    const {
        order: {
            id: orderId,
            order_number,
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
        } } = orderSelector;

    const handleReserveOrder = () => {
        const { id: userID } = JSON.parse(localStorage.currentUser);
        const bodyData = {
            order_number: order_number,
            order_amount: amount,
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

    React.useEffect(() => {
        getOrder(dispatch, orderID);
    }, [dispatch, orderID]);

    return (
        <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "20px" }}>
                <h4>Order #{orderId}</h4>
                <div style={{display: "flex", gap: '1em'}}>
                <Button color="blue" appearance="primary">Update</Button>
                <Button color="yellow" appearance="primary">Cancel</Button>
                <Button color="green" onClick={handleOpen} appearance="primary">Reserve Payment</Button>
                    <Modal open={open} onClose={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Reserve Payment</Modal.Title>
                            <Divider/>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>Choose one of the options to reserve the payment for the order.</h6>
                            <div style={{display: "flex", justifyContent: "space-between", marginTop:"40px", marginLeft:"20px", marginRight:"20px"}}>
                                <Button color="green" appearance="primary">Reserve from your Wallet</Button>
                                <Button color="cyan" appearance="primary" onClick={handleReserveOrder}>Reserve with Paypal</Button>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleClose} appearance="ghost">
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <Divider />
            <Panel style={{marginTop: "-20px"}}>
            <div style={{background: "#fdaa8f", height:'40px', padding: "10px"}}>Order Number</div>
            <table style={styles.table}>
                    <tr>
                        <td style={styles.table.td}><strong>Order ID</strong></td>
                        <td style={styles.table.tdx}>{orderId}</td>
                        <td style={styles.table.td}><strong>Client</strong></td>
                        <td style={styles.table.tdx}>{user && user.username}</td>
                    </tr>
                <tr>
                    <td style={styles.table.td}><b>Service</b></td>
                    <td style={styles.table.td}>{service && service.name}</td>
                    <td style={styles.table.td}><b>Type of Paper</b></td>
                    <td style={styles.table.td}>{type && type.name}</td>
                </tr>
                <tr>
                    <td style={styles.table.td}><b>Spacing</b></td>
                    <td style={styles.table.td}>{spacing && spacing.name}</td>
                    <td style={styles.table.td}><b>Urgency</b></td>
                    <td style={styles.table.td}>{urgency && urgency.name}</td>
                </tr>
                <tr>
                    <td style={styles.table.td}><b>Pages</b></td>
                    <td style={styles.table.td}>{page && page.name}</td>
                    <td style={styles.table.td}><b>Level</b></td>
                    <td style={styles.table.td}>{level && level.name}</td>
                </tr>
                <tr>
                    <td style={styles.table.td}><b>Subject</b></td>
                    <td style={styles.table.td}>{subject && subject.name}</td>
                    <td style={styles.table.td}><b>Style</b></td>
                    <td style={styles.table.td}>{style && style.name}</td>
                </tr>
                <tr>
                    <td style={styles.table.td}><b>Sources</b></td>
                    <td style={styles.table.td}>{source && source.name}</td>
                    <td style={styles.table.td}><b>Language</b></td>
                    <td style={styles.table.td}>{language && language.name}</td>
                </tr>
                <tr>
                    <td style={styles.table.td}><b>Phone Number</b></td>
                    <td style={styles.table.td} colSpan="3">{phone}</td>
                </tr>
                <tr>
                    <td style={styles.table.td}><b>Topic</b></td>
                    <td style={styles.table.td} colSpan="3">{topic}</td>
                </tr>
                <tr>
                    <td style={styles.table.td}><b>Deadline</b></td>
                    <td style={styles.table.td} colSpan="3">{formatDeadline(deadline)}</td>
                </tr>
                <tr>
                    <td style={styles.table.td}><b>Created At</b></td>
                    <td style={styles.table.td} colSpan="3">{formatDate(created_at)}</td>
                </tr>
                <tr>
                    <td style={styles.table.td}><b>Amount</b></td>
                    <td style={styles.table.td} colSpan="3">{amount}</td>
                </tr>
                <tr>
                    <td style={styles.table.td}><b>Instructions</b></td>
                    <td style={styles.table.td} colSpan="3">{instructions}</td>
                </tr>
            </table>
            </Panel>
        </div>
    );
};

export default OrderDetails;
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
        tdx: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
            color: "#333333"
        },
    },
}