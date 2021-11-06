import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {Panel, Divider, Button, Input, Modal, Drawer, Grid, Row, Col} from 'rsuite';
import {getOrder, updateOrder} from 'dataStore/actions/ordersAction';
import { formatDate, formatDeadline } from '../../../../utils/dates';
import {makePayment} from "../../../dataStore/actions/walletAction";
import { BoxLoading } from 'react-loadingg';
import {Label, Box, Select} from "theme-ui";
import {getLevels} from "../../../dataStore/actions/levelsAction";
import {getPages} from "../../../dataStore/actions/pagesAction";
import {getSources} from "../../../dataStore/actions/sourcesAction";
import {getStyles} from "../../../dataStore/actions/stylesAction";
import {getSubjects} from "../../../dataStore/actions/subjectsAction";
import {getTypes} from "../../../dataStore/actions/typesAction";
import {getUrgencies} from "../../../dataStore/actions/urgenciesAction";
import {getServices} from "../../../dataStore/actions/servicesAction";
import {getLanguages} from "../../../dataStore/actions/languagesAction";
import {getSpacing} from "../../../dataStore/actions/spacingsAction";

const OrderDetails = () => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState("");
    const [openWithHeader, setOpenWithHeader] = React.useState(false);
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
    const [updateOrderDetails, setUpdateOrderDetails] = useState({
        user_id: '',
        service_id: 1,
        type_id: 1,
        style_id: 1,
        level_id: 1,
        pages_id: 1,
        urgency_id: 1,
        subject_id: 1,
        sources_id: 1,
        spacing_id: 1,
        language_id: 1,
        phone: "",
        topic: "",
        instructions: "",
        pagesummary: '',
        plagreport: '',
        initialdraft: '',
        qualitycheck: '',
        topwriter: '',
        promocode: ''
    });

    const walletSelector = useSelector(state => state.walletState);
    const { isLoading } = walletSelector;

    const levelSelector = useSelector(state => state.levelState);
    const pageSelector = useSelector(state => state.pageState);
    const serviceSelector = useSelector(state => state.serviceState);
    const sourcesSelector = useSelector(state => state.sourceState);
    const spacingSelector = useSelector(state => state.spacingState);
    const styleSelector = useSelector(state => state.styleState);
    const subjectSelector = useSelector(state => state.subjectState);
    const typeSelector = useSelector(state => state.typeState);
    const urgencySelector = useSelector(state => state.urgencyState);
    const languageSelector = useSelector(state => state.languageState);

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        setUpdateOrderDetails((order) => {
            return {
                ...updateOrderDetails,   // Spread Operator
                [name]: value
            }
        })
    }
    const handleInstructionsChange = (value) => {
        setinstructions(value);
    }
    const parseServiceSelected = (event) => {
        const valueToParse = event.target.value;
        const service_id_index = Object.values(JSON.parse(valueToParse));
        const service_id = service_id_index[0];
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setUpdateOrderDetails({
            ...updateOrderDetails,
            [event.target.name]: service_id
        })
    };
    const parseTypeSelected = (event) => {
        const valueToParse = event.target.value;
        const type_id_index = Object.values(JSON.parse(valueToParse));
        const type_id = type_id_index[0];
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setUpdateOrderDetails({
            ...updateOrderDetails,
            [event.target.name]: type_id
        })
    };
    const parseUrgencySelected = (event) => {
        const valueToParse = event.target.value;
        const urgency_id_index = Object.values(JSON.parse(valueToParse));
        const urgency_id = urgency_id_index[0];
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setUpdateOrderDetails({
            ...updateOrderDetails,
            [event.target.name]: urgency_id
        })
    };
    const parsePageSelected = (event) => {
        const valueToParse = event.target.value;
        const page_id_index = Object.values(JSON.parse(valueToParse));
        const page_id = page_id_index[0];
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setUpdateOrderDetails({
            ...updateOrderDetails,
            [event.target.name]: page_id
        })
    };
    const parseLevelSelected = (event) => {
        const valueToParse = event.target.value;
        const level_id_index = Object.values(JSON.parse(valueToParse));
        const level_id = level_id_index[0];
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setUpdateOrderDetails({
            ...updateOrderDetails,
            [event.target.name]: level_id
        })
    };
    const parseSpacingSelected = (event) => {
        const valueToParse = event.target.value;
        const spacing_id_index = Object.values(JSON.parse(valueToParse));
        const spacing_id = spacing_id_index[0];
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setUpdateOrderDetails({
            ...updateOrderDetails,
            [event.target.name]: spacing_id
        })
    };
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
    const handleUpdateOrderSubmit = (event) => {
        event.persist();
        event.preventDefault();
        const { id: userID } = JSON.parse(localStorage.currentUser);
        const bodyData = {
            user_id: parseInt(userID),
            service_id: parseInt(service && service.id) || parseInt(updateOrderDetails.service_id),
            type_id: parseInt(type && type.id) || parseInt(updateOrderDetails.type_id),
            style_id: parseInt(style && style.id) || parseInt(updateOrderDetails.style_id),
            level_id: parseInt(level && level.id) || parseInt(updateOrderDetails.level_id),
            pages_id: parseInt(page && page.id)  ||  parseInt(updateOrderDetails.pages_id),
            urgency_id: parseInt(urgency && urgency.id) || parseInt(updateOrderDetails.urgency_id),
            subject_id: parseInt(subject && subject.id) || parseInt(updateOrderDetails.subject_id),
            sources_id: parseInt(source && source.id) || parseInt(updateOrderDetails.sources_id),
            spacing_id: parseInt(spacing && spacing.id) || parseInt(updateOrderDetails.spacing_id),
            language_id: parseInt(language && language.id) || parseInt(updateOrderDetails.language_id),
            phone: phone || updateOrderDetails.phone ,
            topic: topic || updateOrderDetails.topic,
            instructions:  instructions || updateOrderDetails.instructions,
            pagesummary: false,
            plagreport: true,
            initialdraft: false,
            qualitycheck: false,
            topwriter: true,
            promocode: '',
        }
        console.log(bodyData);
        if (bodyData) {
            updateOrder(dispatch, orderID, bodyData).then(
                response => {
                    if (response.status === 200){
                        setOpenWithHeader(false);
                    }
                }
            )
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
    React.useEffect(() => {
        getOrder(dispatch, orderID);
    }, [dispatch, orderID]);

    React.useEffect(() => {
        getLevels(dispatch);
        getPages(dispatch);
        getSources(dispatch);
        getStyles(dispatch);
        getSubjects(dispatch);
        getTypes(dispatch);
        getUrgencies(dispatch);
        getServices(dispatch);
        getLanguages(dispatch);
        getSpacing(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    return (
        <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "20px" }}>
                <h4>Order Details</h4>
                <div style={{display: "flex", gap: '1em'}}>
                <Button onClick={() => setOpenWithHeader(true)} color="blue" appearance="primary">Update</Button>
                    <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
                        <Drawer.Header>
                            <Drawer.Title>Update Order</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Box as="form" onSubmit={handleUpdateOrderSubmit}>
                            <Grid fluid>
                                <Row>
                                    <Col xs={12}>
                                        <div>
                                            <Label htmlFor="sound">Service</Label>
                                            <Select value={service && service.name} onChange={parseServiceSelected} name="service_id" mb={3}>
                                                {serviceSelector.services.map(service => {
                                                    return (
                                                        <option key={service.id} value={JSON.stringify(service)}>{service.name}</option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Type of Paper</Label>
                                            <Select value={type && type.name} onChange={parseTypeSelected} name="type_id" mb={3}>
                                                {typeSelector.types.map(type => {
                                                    return (
                                                        <option key={type.id} value={JSON.stringify(type)}>{type.name}</option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Subject</Label>
                                            <Select value={subject && subject.name} onChange={handleChange} name="subject_id" mb={3}>
                                                {subjectSelector.subjects.map(subject => {
                                                    return (
                                                        <option key={subject.id} value={JSON.stringify(subject)}>{subject.name}</option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Urgency</Label>
                                            <Select value={urgency && urgency.name} onChange={parseUrgencySelected} name="urgency_id" mb={3}>
                                                {urgencySelector.urgencies.map(urgency => {
                                                    return (
                                                        <option key={urgency.id} value={JSON.stringify(urgency)}>{urgency.name}</option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Style</Label>
                                            <Select value={style && style.name} onChange={handleChange} name="style_id" mb={3}>
                                                {styleSelector.styles.map(style => {
                                                    return (
                                                        <option key={style.id} value={style.name}>{style.name}</option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div>
                                            <Label htmlFor="sound">Sources</Label>
                                            <Select onChange={handleChange} name="sources_id" mb={3}>
                                                {sourcesSelector.sources.map(source => {
                                                    return (
                                                        <option key={source.id} value={source.id}>{source.name}</option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Spacing</Label>
                                            <Select onChange={parseSpacingSelected} name="spacing_id" mb={3}>
                                                {spacingSelector.spacings.map(spacing => {
                                                    return (
                                                        <option key={spacing.id} value={JSON.stringify(spacing)}>{spacing.name}</option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Language</Label>
                                            <Select onChange={handleChange} name="language_id" mb={3}>
                                                {languageSelector.languages.map(language => {
                                                    return (
                                                        <option key={language.id} value={language.id}>{language.name}</option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Pages</Label>
                                            <Select onChange={parsePageSelected} name="pages_id" id="pages_id" mb={3}>
                                                {pageSelector.pages.map(page => {
                                                    return (
                                                        <option key={page.id} value={JSON.stringify(page)}>{[page.name]}</option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Level</Label>
                                            <Select onChange={parseLevelSelected} name="level_id" mb={3}>
                                                {levelSelector.levels.map(level => {
                                                    return (
                                                        <option key={level.id} value={JSON.stringify(level)}>{level.name}</option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                    </Col>
                                </Row>
                            </Grid>
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input onChange={handleChange} value={phone} name="phone" type='text' mb={3} />
                            </div>
                            <Label htmlFor="topic">Topic*</Label>
                            <Input onChange={handleChange} value={topic} name="topic"  type='text' mb={3} />
                            <Label htmlFor="instructions">Instructions*</ Label>
                            <Input style={{border:"1px solid #C9BBB8 "}} as="textarea" value={instructions}
                                   rows={8} onChange={handleInstructionsChange}  placeholder="Fill in instructions" /><br/>
                            <Button type="submit" color="cyan" appearance="primary">Edit Order</Button>
                            </Box>
                        </Drawer.Body>
                    </Drawer>
                <Button color="yellow" appearance="primary">Cancel</Button>
                <Button color="green" onClick={handleOpen} appearance="primary">Reserve Payment</Button>
                    <Modal open={open} onClose={handleClose}>
                        {isLoading && (
                            <BoxLoading />
                        )}
                        <Modal.Header>
                            <Modal.Title><h5>Reserve Payment</h5></Modal.Title>
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
            <div style={{background: "#fdaa8f", height:'40px', padding: "10px"}}><h5>Order #{orderId}</h5></div>
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
                <tr>
                    <td style={styles.table.td}><b>Instructions</b></td>
                    <td style={styles.table.td} colSpan="3"><b>Instructions</b><pre>{instructions}</pre></td>
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