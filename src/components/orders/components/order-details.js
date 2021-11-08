import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {Panel, Divider, Button, Input, Modal, Drawer, Grid, Row, Col} from 'rsuite';
import {getOrder, updateOrder} from 'dataStore/actions/ordersAction';
import { formatDate, formatDeadline } from '../../../../utils/dates';
import {makePayment} from "../../../dataStore/actions/walletAction";
import { BoxLoading } from 'react-loadingg';
import {Label, Box} from "theme-ui";
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
    const [myservice, setmyservice] = React.useState(8);
    const [mytype, setmytype] = React.useState(1.2);
    const [myurgency, setmyurgency] = React.useState(2.5);
    const [mypages, setmypages] = React.useState(1);
    const [mylevel, setmylevel] = React.useState(1);
    const [myspacing, setmyspacing] = React.useState(1);
    const [instructionsx, setinstructions] = React.useState("");
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

    const handleChange = (vauex, event) => {
        let value = event.target.value;
        let name = event.target.name;

        setUpdateOrderDetails((order) => {
            return {
                ...updateOrderDetails,   // Spread Operator
                [name]: value
            }
        })
    }
    const handleInputChange = (event) => {
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
        setmyservice(itemSelected.factor);
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
        setmytype(itemSelected.factor);
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
        setmyurgency(itemSelected.factor);
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
        setmypages(itemSelected.factor);
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
        setmylevel(itemSelected.factor);
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
        setmyspacing(itemSelected.factor);
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
            service_id: parseInt(updateOrderDetails.service_id),
            type_id:  parseInt(updateOrderDetails.type_id),
            style_id:  parseInt(updateOrderDetails.style_id),
            level_id: parseInt(updateOrderDetails.level_id),
            pages_id: parseInt(updateOrderDetails.pages_id),
            urgency_id: parseInt(updateOrderDetails.urgency_id),
            subject_id: parseInt(updateOrderDetails.subject_id),
            sources_id: parseInt(updateOrderDetails.sources_id),
            spacing_id: parseInt(updateOrderDetails.spacing_id),
            language_id: parseInt(updateOrderDetails.language_id),
            phone: updateOrderDetails.phone ,
            topic: updateOrderDetails.topic,
            instructions:  instructions,
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

    const service_name = service ? service.name : "";
    const subject_name = subject ? subject.name : "";
    const style_name = style ? style.name : "";
    const type_name = type ? type.name : "";
    const urgency_name = urgency ? urgency.name : "";
    const language_name = language ? language.name : "";
    const spacing_name = spacing ? spacing.name : "";
    const page_name = page ? page.name : "";
    const level_name = level ? level.name : "";
    const source_name = source ? source.name : "";

    return (
        <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px", marginRight: "20px" }}>
                <h4>Order Details</h4>
                <div style={{display: "flex", gap: '1em'}}>
                <Button onClick={() => setOpenWithHeader(true)} color="blue" appearance="primary">Update</Button>
                    <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
                        <Drawer.Header>
                            <Drawer.Title>Update Order</Drawer.Title>
                            <h3>
                                Price:
                                <span style={{ color: "blue" }}>
                                            ${(myservice * mytype * myurgency * mypages * mylevel * myspacing).toFixed(2)}
                                            </span>
                            </h3>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Box as="form" onSubmit={handleUpdateOrderSubmit}>
                            <Grid fluid>
                                <Row>
                                    <Col xs={12}>
                                        <div>
                                            <Label htmlFor="sound">Service</Label>
                                            <select
                                                style={{width: '100%', height:"40px", border: '1px solid #becad6',background:"white", borderRadius:"5px"}}
                                                onChange={parseServiceSelected}
                                                name="service_id">
                                                {serviceSelector.services.map(servicex => {
                                                    return (
                                                        <option
                                                            key={servicex.id}
                                                            selected={servicex.name === service_name}
                                                            value={JSON.stringify(servicex)}>{servicex.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Type of Paper</Label>
                                            <select
                                                style={{width: '100%', height:"40px", border: '1px solid #becad6',background:"white", borderRadius:"5px"}}
                                                onChange={parseTypeSelected}
                                                name="type_id"
                                            >
                                                {typeSelector.types.map(typex => {
                                                    return (
                                                        <option
                                                            key={typex.id}
                                                            selected={typex.name === type_name}
                                                            value={JSON.stringify(typex)}>{typex.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Subject</Label>
                                            <select
                                                value={subject && subject.name}
                                                style={{width: '100%', height:"40px", border: '1px solid #becad6',background:"white", borderRadius:"5px"}}
                                                onChange={handleInputChange}
                                                name="subject_id">
                                                {subjectSelector.subjects.map(subjectx => {
                                                    return (
                                                        <option
                                                            key={subjectx.id}
                                                            selected={subjectx.name === subject_name}
                                                            value={JSON.stringify(subjectx)}>{subjectx.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Urgency</Label>
                                            <select
                                                style={{width: '100%', height:"40px", border: '1px solid #becad6',background:"white", borderRadius:"5px"}}
                                                onChange={parseUrgencySelected}
                                                name="urgency_id">
                                                {urgencySelector.urgencies.map(urgencyx => {
                                                    return (
                                                        <option
                                                            key={urgencyx.id}
                                                            selected={urgencyx.name === urgency_name}
                                                            value={JSON.stringify(urgencyx)}>{urgencyx.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Style</Label>
                                            <select
                                                style={{width: '100%', height:"40px", border: '1px solid #becad6',background:"white", borderRadius:"5px"}}
                                                onChange={handleInputChange}
                                                name="style_id">
                                                {styleSelector.styles.map(stylex => {
                                                    return (
                                                        <option
                                                            key={stylex.id}
                                                            selected={stylex.name === style_name}
                                                            value={stylex.name}>{stylex.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div>
                                            <Label htmlFor="sound">Sources</Label>
                                            <select
                                                onChange={handleInputChange}
                                                style={{width: '100%', height:"40px", border: '1px solid #becad6',background:"white", borderRadius:"5px"}}
                                                name="sources_id">
                                                {sourcesSelector.sources.map(sourcex => {
                                                    return (
                                                        <option
                                                            key={sourcex.id}
                                                            selected={sourcex.name === source_name}
                                                            value={sourcex.id}>{sourcex.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Spacing</Label>
                                            <select
                                                onChange={parseSpacingSelected}
                                                style={{width: '100%', height:"40px", border: '1px solid #becad6',background:"white", borderRadius:"5px"}}
                                                name="spacing_id">
                                                {spacingSelector.spacings.map(spacingx => {
                                                    return (
                                                        <option
                                                            key={spacingx.id}
                                                            selected={spacingx.name === spacing_name}
                                                            value={JSON.stringify(spacingx)}>{spacingx.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Language</Label>
                                            <select
                                                onChange={handleInputChange}
                                                style={{width: '100%', height:"40px", border: '1px solid #becad6',background:"white", borderRadius:"5px"}}
                                                name="language_id">
                                                {languageSelector.languages.map(languagex => {
                                                    return (
                                                        <option
                                                            key={languagex.id}
                                                            selected={languagex.name === language_name}
                                                            value={languagex.id}>{languagex.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Pages</Label>
                                            <select
                                                onChange={parsePageSelected}
                                                style={{width: '100%', height:"40px", border: '1px solid #becad6',background:"white", borderRadius:"5px"}}
                                                name="pages_id"
                                                id="pages_id">
                                                {pageSelector.pages.map(pagex => {
                                                    return (
                                                        <option
                                                            key={pagex.id}
                                                            selected={pagex.name === page_name}
                                                            value={JSON.stringify(pagex)}>{[pagex.name]}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="sound">Level</Label>
                                            <select
                                                style={{width: '100%', height:"40px", border: '1px solid #becad6',background:"white", borderRadius:"5px"}}
                                                onChange={parseLevelSelected}
                                                name="level_id" >
                                                {levelSelector.levels.map(levelx => {
                                                    return (
                                                        <option
                                                            key={levelx.id}
                                                            selected={levelx.name === level_name}
                                                            value={JSON.stringify(levelx)}>{levelx.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                            </Grid>
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input onChange={handleChange} placeholder={phone} name="phone" type='text' mb={3} />
                            </div>
                            <Label htmlFor="topic">Topic*</Label>
                            <Input onChange={handleChange} placeholder={topic} name="topic"  type='text' mb={3} />
                            <Label htmlFor="instructions">Instructions*</ Label>
                            <Input style={{border:"1px solid #C9BBB8 "}} as="textarea" placeholder={instructions}
                                   rows={8} onChange={handleInstructionsChange}/><br/>
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