import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Panel, Divider, Uploader, Button, Input, Modal, Nav, Rate, Grid, Row, Col, Avatar } from 'rsuite';
import { fileUpload, getOrder, getOrderfiles } from 'dataStore/actions/ordersAction';
import { formatDate, formatDeadline } from '../../../../utils/dates';
import { BoxLoading } from 'react-loadingg';
import DetailIcon from '@rsuite/icons/Detail';
import AttachmentIcon from '@rsuite/icons/Attachment';
import { createRatings } from 'dataStore/actions/reviewAction';


const OrderCompletedDetails = ({ section }) => {
    const [open, setOpen] = React.useState(false);
    const [uploadOpen, setUploadOpen] = useState(true);
    const [messageOpen, setMessageOpen] = useState(false);
    const [downloadOpen, setDownloadOpen] = useState(false);
    const [releaseFundsOpen, setReleaseFundsOpen] = useState(false);
    const [requestRevisionOpen, setRequestRevisionOpen] = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false);
    const [hoverValue, setHoverValue] = React.useState(3);
    const [uploadFiles, setUploadFiles] = useState({
        order_id: "",
        user_id: "",
        uploaded_files: [
            {
                content_type: "",
                data: ""
            },
        ]
    });
    const [userRatings, setUserRatings] = useState({
        order_number: "",
        value: "",
        description: ""
    })
    const [active, setActive] = React.useState('2');


    const router = useRouter();
    const { completedOrderID } = router.query;
    const dispatch = useDispatch();
    const orderSelector = useSelector(state => state.orderState);
    const {
        order_files,
        order: {
            id: orderId, order_number, topic, phone,
            instructions, deadline, service, user, type,
            style, source, subject, language, page, level,
            spacing, urgency, amount, created_at,
        }
    } = orderSelector;

    const walletSelector = useSelector(state => state.walletState);
    const ratingSelector = useSelector(state => state.ratingState);
    const { isLoading } = walletSelector;
    const { ratings, rating } = ratingSelector;
    console.log(rating)

    const handleOpen = () => setReleaseFundsOpen(true);
    const handleClose = () => setReleaseFundsOpen(false);
    const handleRevisonOpen = () => setRequestRevisionOpen(true);
    const handleRevisionClose = () => setRequestRevisionOpen(false);
    const handleRejectOpen = () => setRejectOpen(true);
    const handleRejectClose = () => setRejectOpen(false);

    const handleReleaseFundsChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setUserRatings({
            ...userRatings,
            [name]: value
        })
    }

    const handleReleaseFundsSubmit = () => {
        const bodyData = {
            order_number: order_number,
            value: hoverValue,
            description: userRatings.description,
        }
        console.log(bodyData);
        if (bodyData.order_number !== "" && bodyData.value !== "" && bodyData.description !== "") {
            createRatings(dispatch, bodyData).then(response => console.log(response))
        } else {
            dispatch({
                type: 'CREATE_USER_RATINGS_ERROR',
                errorMessage: 'Make sure all the fields all filled',
            });
        }
    }


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file.blobFile);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (file) => {
        const extension = file.name.slice(file.name.lastIndexOf('.') + 1)
        const fileBase64 = await convertToBase64(file);
        const Base64 = fileBase64.slice(fileBase64.indexOf(',') + 1).trim();
        console.log(Base64)
        if (extension && fileBase64 && orderId) {
            const { id: userID } = JSON.parse(localStorage.currentUser);
            setUploadFiles({
                ...uploadFiles,
                order_id: orderId,
                user_id: userID,
                uploaded_files: [
                    {
                        content_type: extension,
                        data: Base64
                    },
                ]
            })
            fileUpload(dispatch, uploadFiles)
                .then(response => {
                    console.log(response)
                });
        }
    };
    React.useEffect(() => {
        getOrder(dispatch, completedOrderID);
        getOrderfiles(dispatch, completedOrderID)
    }, [dispatch, completedOrderID, uploadFiles]);

    return (
        <div style={{ marginTop: "20px" }}>
            <div>
                <h4>Order Details</h4>
            </div>
            <Divider />
            <Nav activeKey={active} style={{ marginLeft: "20px", marginTop: "-20px", fontSize: "20px" }}>
                <Nav.Item
                    onClick={() => { setOpen(true); setUploadOpen(false); setMessageOpen(false); setDownloadOpen(false); setActive("1") }}
                    eventKey="1"
                    icon={<AttachmentIcon />}>
                    Order Details
                </Nav.Item>
                <Nav.Item
                    onClick={() => { setUploadOpen(true); setOpen(false); setMessageOpen(false); setDownloadOpen(false); setActive("2") }}
                    eventKey="2" icon={<DetailIcon />}>
                    Attach Files
                </Nav.Item>
                <Nav.Item
                    onClick={() => { setMessageOpen(true); setOpen(false); setUploadOpen(false); setDownloadOpen(false); setActive("3"); }}
                    eventKey='3'
                    icon={<DetailIcon />}>
                    Messages
                </Nav.Item>
                <Nav.Item
                    onClick={() => { setDownloadOpen(true); setOpen(false); setUploadOpen(false); setMessageOpen(false); setActive("4") }}
                    eventKey='4'
                    icon={<DetailIcon />}>
                    Download and Review
                </Nav.Item>
            </Nav>
            {uploadOpen && (
                <div>
                    <Grid fluid>
                        <Row>
                            <Col xs={24} sm={24} md={12}>
                                <div style={{ padding: "10px" }}>
                                    <Uploader
                                        listType="picture-text"
                                        autoUpload={true}
                                        multiple
                                        onUpload={(file) => handleFileUpload(file)}
                                    >
                                        <div style={{ width: "100%", background: "#EAEEF3", lineHeight: '220px' }}>Click or Drag files to this area to upload</div>
                                    </Uploader><br />
                                    <center><p style={{ fontSize: "20px" }}>Already uploaded files</p></center><br />
                                    <Button style={{ width: "100%" }} color="green" appearance="primary">View Order Details</Button>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <h3>Uploaded files</h3>
                                <Divider />
                                <table style={styles.table}>
                                    <tr style={{ background: "#fdaa8f" }}>
                                        <th style={{ padding: "10px", textAlign: "left" }}>File Name</th>
                                        <th>Uploaded At</th>
                                    </tr>
                                    {order_files && order_files.map((order_file) => (
                                        <tr style={{ borderRadius: "10px" }}>
                                            <td style={styles.table.td}>
                                                <strong>
                                                    <Avatar
                                                        style={{ background: "#17c671" }}
                                                        circle
                                                        size="sm">TRP
                                                    </Avatar>
                                                    {"     "}
                                                    {order_file.attached}
                                                </strong>
                                            </td>
                                            <td style={styles.table.tdx}><Button color="red" appearance="primary">Delete</Button></td>
                                        </tr>
                                    ))}
                                </table>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            )}
            {open && (
                <Grid fluid>
                    <Row>
                        <Col xs={24} sm={24} md={16}>
                            <Panel style={{ marginTop: "-10px" }}>
                                <div style={{ background: "#fdaa8f", height: '40px', padding: "10px" }}><h5>Order #{order_number}</h5></div>
                                <table style={styles.table}>
                                    <tbody>
                                        <tr style={{ borderRadius: "10px" }}>
                                            <td style={styles.table.td}><strong>Order Number</strong></td>
                                            <td style={styles.table.tdx}>{order_number}</td>
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
                                            <td style={styles.table.td}><b>Phone</b></td>
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
                                    </tbody>
                                </table>
                            </Panel>
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <div style={{ background: "#fdaa8f", height: '40px', marginTop: "10px", padding: "10px" }}><h5>Order Instructions</h5></div>
                            <pre style={{ color: "black", fontWeight: 600 }}>{instructions && instructions
                                .replace(/<style([\s\S]*?)<\/style>/gi, '')
                                .replace(/<script([\s\S]*?)<\/script>/gi, '')
                                .replace(/<\/div>/ig, '\n')
                                .replace(/<\/h1>/ig, '-->')
                                .replace(/<\/h2>/ig, '-->')
                                .replace(/<\/h3>/ig, '-->')
                                .replace(/<\/h4>/ig, '-->')
                                .replace(/<\/h5>/ig, '-->')
                                .replace(/<\/h6>/ig, '-->')
                                .replace(/<li>/ig, '  *  ')
                                .replace(/<\/p>/ig, '')
                                .replace(/<br\s*[\/]?>/gi, "\n")
                            }</pre>
                        </Col>
                    </Row>
                </Grid>
            )}
            {messageOpen && (
                <div style={{ margin: "20px" }}>
                    <input name="message" type="text" style={{ border: '1px solid #becad6' }} placeholder="Textarea" /><br />
                    <Button color="blue" appearance="primary">Send</Button>
                </div>
            )}
            {downloadOpen && (
                <Panel>
                    <table style={styles.table}>
                        <tr style={{ borderRadius: "10px" }}>
                            <th style={styles.table.th}>File Name</th>
                            <th style={styles.table.th}>File Type</th>
                            <th style={styles.table.th}>Time Uploaded</th>
                            <th style={styles.table.th}>Download</th>
                        </tr>
                        <tr>
                            <td style={styles.table.td}><strong>Order Number</strong></td>
                            <td style={styles.table.td}><b>Service</b></td>
                            <td style={styles.table.td}>hh</td>
                            <td style={styles.table.td}><b>Type of Paper</b></td>
                        </tr>
                    </table>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                        <Button onClick={handleRevisonOpen} color="blue" appearance="primary">Request Revision</Button>
                        <Modal open={requestRevisionOpen} onClose={handleRevisionClose}>
                            <Modal.Header>
                                <Modal.Title><h5>Request Revision For Order #120862</h5></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h6>Revision Instructions</h6>
                                <Input style={{ border: '1px solid #becad6' }} as="textarea" rows={4} placeholder="Textarea" /><br />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleRevisionClose} appearance="primary">
                                    Request Revision
                                </Button>
                                <Button onClick={handleRevisionClose} appearance="subtle">
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Button onClick={handleOpen} color="green" appearance="primary">Release Funds</Button>
                        <Modal open={releaseFundsOpen} onClose={handleClose}>
                            <Modal.Header>
                                <Modal.Title><h5>Review the Order</h5></Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <Rate defaultValue={3} onChangeActive={setHoverValue} />{' '}
                                    <span style={textStyle}>{texts[hoverValue]}</span>
                                    <h6>Description</h6>
                                    <input name="description" onChange={handleReleaseFundsChange} style={{ border: '1px solid #becad6' }} rows={4} placeholder="Textarea" /><br />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleReleaseFundsSubmit} appearance="primary">
                                        Send
                                    </Button>
                                    <Button onClick={handleClose} appearance="subtle">
                                        Cancel
                                    </Button>
                                </Modal.Footer>
                        </Modal>
                        <Button onClick={handleRejectOpen} color="red" appearance="primary">Reject Order</Button>
                        <Modal open={rejectOpen} onClose={handleRejectClose}>
                            <Modal.Header>
                                <Modal.Title><h5>Reject Order #120862</h5></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Reminder: Kindly note that rejecting the order means
                                    that you cannot use the paper delivered to you. If
                                    there is anything you need changed, we recommend that you ask for revision.
                                </p><br />
                                <h5>Reason:</h5>
                                <select>
                                    <option>1</option>
                                </select><br />
                                <h6>Description</h6>
                                <Input style={{ border: '1px solid #becad6' }} as="textarea" rows={4} placeholder="Textarea" /><br />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleRejectClose} appearance="primary">
                                    Send
                                </Button>
                                <Button onClick={handleRejectClose} appearance="subtle">
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Panel>
            )}
        </div>
    );
};

export default OrderCompletedDetails;
const styles = {
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        td: {
            fontFamily: 'Quicksand, sans-serif',
            border: '1px solid #dddddd',
            textAlign: 'left',
            fontSize: "18px",
            padding: '8px',
        },
        th: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
            background: '#fdaa8f',
        },
        tdx: {
            fontFamily: 'Quicksand, sans-serif',
            border: '1px solid #dddddd',
            textAlign: 'left',
            fontSize: "18px",
            padding: '8px',
            color: "#333333"
        },
    },
}
const textStyle = {
    verticalAlign: 'top',
    lineHeight: '42px',
    display: 'inline-block'
};
const texts = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent'
};