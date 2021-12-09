import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {Avatar, Button, Col, Tag, Divider, Grid, Input, Modal, Nav, Message, Panel, Rate, Row, Uploader} from 'rsuite';
import {fileUpload, getOrder, getOrderfiles} from 'dataStore/actions/ordersAction';
import {formatDate, formatDeadline} from '../../../../utils/dates';
import DetailIcon from '@rsuite/icons/Detail';
import AttachmentIcon from '@rsuite/icons/Attachment';
import {createRatings} from 'dataStore/actions/reviewAction';
import {createMessage, filterMessages} from 'dataStore/actions/messagesAction';


const OrderCompletedDetails = ({ section }) => {
    const [open, setOpen] = React.useState(true);
    const [uploadOpen, setUploadOpen] = useState(false);
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
    const [message, setMessage] = useState({
        sender_id: "",
        message: "",
        receiver_id: "",
        order_number: ""
    })
    const [active, setActive] = React.useState('1');
    const [ratingSuccess, setRatingSuccess] = useState("");
    const router = useRouter();
    const { completedOrderID } = router.query;
    const walletSelector = useSelector(state => state.walletState);
    const ratingSelector = useSelector(state => state.ratingState);
    const messageSelector = useSelector(state => state.messageState);
    const { isLoading } = walletSelector;
    const { ratings, rating } = ratingSelector;
    const { messages } = messageSelector;
    console.log(messages)
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

    const dispatch = useDispatch();
    const dispatchx = useDispatch();
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

    const handleCreateMessageChange = (value, event) => {
        setMessage({
            ...message,
            message: event.target.value
        })
    }

    const handleCreateMessageSubmit = () => {
        const { id: userID } = JSON.parse(localStorage.currentUser);
        const bodyData = {
            sender_id: userID,
            message: message.message,
            receiver_id: 7,
            order_number: order_number
        }
        console.log(bodyData)
        if(bodyData.message !== ""){
            createMessage(dispatchx, bodyData)
                .then(response => {
                    console.log(response)
                });
        }
    }

    const handleReleaseFundsSubmit = () => {
        const bodyData = {
            order_number: order_number,
            value: hoverValue,
            description: userRatings.description,
        }
        console.log(bodyData);
        if (bodyData.order_number !== "" && bodyData.value !== "" && bodyData.description !== "") {
            createRatings(dispatch, bodyData).then(response => {
                setRatingSuccess("Thank you for reviewing your order.Your order has been approved")
                setReleaseFundsOpen(false);
            })
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
    useEffect(() => {
        getOrder(dispatch, completedOrderID);
        getOrderfiles(dispatch, completedOrderID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, completedOrderID, uploadFiles.uploaded_files]);

    useEffect(() => {
        filterMessages(dispatch, order_number);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, order_number, message.message])

    return (
        <div style={{ marginTop: "20px" }}>
            <div>
                <h4>Order Details</h4>
                { ratingSuccess  && (
                    <Message type="success" closable>{ratingSuccess}</Message>
                )}
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
                            <Col xs={24} sm={24} md={24}>
                                <div style={{ padding: "10px" }}>
                                    <Uploader
                                        listType="picture-text"
                                        autoUpload={true}
                                        multiple
                                        onUpload={(file) => handleFileUpload(file)}
                                    >
                                        <div style={{ width: "100%", background: "#EAEEF3", lineHeight: '100px' }}>Click or Drag files to this area to upload</div>
                                    </Uploader>
                                </div>
                                <Panel>
                                <h6>Uploaded files</h6>
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
                                </Panel>
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
                <div>
                    <Panel>
                    <h5>Order Messages</h5>
                <div id="messages" style={{ padding:"10px" ,borderRadius:"5px", border:"2px solid #98b9b6", minHeight:"50px", maxHeight:"250px", overflowY: "scroll" }}>
                    {messages?.reverse().map((message) => (
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            {message.receiver_id === 7 ?
                                <div style={{marginBottom: "15px"}}>
                                    <Tag style={{
                                        width: "300px",
                                        color: "black",
                                        borderRadius: "15px",
                                        background: "whitesmoke",
                                        padding: "10px"
                                    }}>
                                        {message.message}<br/>
                                        <p style={{float:"right"}}>{formatDate(message.created_at)}</p>
                                    </Tag>
                                </div>
                                : (<div/>)
                            }
                            {message.receiver_id !== 7 && (
                                <Tag style={{
                                    width:"300px",
                                    margin:"10px",
                                    color:"white",
                                    borderRadius:"15px",
                                    background:"#6da8a2",
                                    padding:"10px"}}>
                                    { message.message }<br/>
                                    <p style={{float:"right"}}>{formatDate(message.created_at)}</p>
                                </Tag>
                            )}
                        </div>
                    ))}
                </div>
                    </Panel>
                    <Panel>
                    <Input
                        onChange={handleCreateMessageChange}
                        value={message.message}
                        style={{ border:"2px solid #6da8a2", padding:"20px"}}
                        placeholder="Enter message"/>
                    <br />
                    <Button
                        onClick={handleCreateMessageSubmit}
                        color="blue"
                        appearance="primary">
                        Send
                    </Button>
                    </Panel>
                </div>
            )}
            {downloadOpen && (
                <Panel>
                    <div style={{ display: "flex", float:"right", gap:"2em", marginTop: "30px", marginBottom:"10px" }}>
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
                                <textarea
                                    name="description"
                                    onChange={handleReleaseFundsChange}
                                    style={{ border: '1px solid #becad6', width: "100%", padding:"10px", borderRadius: "5px", }}
                                    rows={4}
                                    placeholder="Textarea" /><br />
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
                    <table style={styles.table}>
                        <tr style={{ borderRadius: "10px" }}>
                            <th style={styles.table.th}>File Name</th>
                            <th style={styles.table.th}>File Type</th>
                            <th style={styles.table.th}>Time Uploaded</th>
                            <th style={styles.table.th}>Download</th>
                        </tr>
                        <tr>
                            <td style={styles.table.td}>Order Number</td>
                            <td style={styles.table.td}>Service</td>
                            <td style={styles.table.td}>hh</td>
                            <td style={styles.table.td}>Type of Paper</td>
                        </tr>
                    </table>
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