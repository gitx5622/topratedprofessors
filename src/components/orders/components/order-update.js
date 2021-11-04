import React, {useState} from 'react';
import {Button, Col, Grid, Panel, Row} from "rsuite";
import {Box, Input, Label, Select, Textarea} from "theme-ui";
import {useSelector} from "react-redux";
import {updateOrder} from "../../../dataStore/actions/ordersAction";
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

const OrderUpdate = () => {
    const [selected, setSelected] = React.useState("");
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
        phone: '',
        topic: '',
        instructions: '',
        pagesummary: '',
        plagreport: '',
        initialdraft: '',
        qualitycheck: '',
        topwriter: '',
        promocode: ''
    });
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
    const handleUpdateOrderSubmit = (event) => {
        event.persist();
        event.preventDefault();
        const { id: userID } = JSON.parse(localStorage.currentUser);
        const bodyData = {
            user_id: parseInt(userID),
            service_id: updateOrderDetails.service_id,
            type_id: updateOrderDetails.type_id,
            style_id: updateOrderDetails.style_id,
            level_id: updateOrderDetails.level_id,
            pages_id: updateOrderDetails.pages_id,
            urgency_id: updateOrderDetails.urgency_id,
            subject_id: updateOrderDetails.subject_id,
            sources_id: updateOrderDetails.sources_id,
            spacing_id: updateOrderDetails.spacing_id,
            language_id: updateOrderDetails.language_id,
            phone: updateOrderDetails.phone || phone,
            topic: updateOrderDetails.topic || topic,
            instructions: updateOrderDetails.instructions || instructions,
            pagesummary: false,
            plagreport: true,
            initialdraft: false,
            qualitycheck: false,
            topwriter: true,
            promocode: '',
        }
        console.log(bodyData);
        if (bodyData) {
            updateOrder(dispatch, orderID, bodyData);
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
        <div>
            <Grid fluid>
                <Row className="show-grid">
                    <Col xs={12}>
                        <Panel shaded style={{ background: "#fdaa8f" }}>
                            <h5>Edit Details</h5>
                        </Panel>
                        <Panel shaded style={{ background: "#f2faff" }}>
                            <Box as="form" onSubmit={handleUpdateOrderSubmit}>
                                <Label htmlFor="sound">Service</Label>
                                <Select onChange={parseServiceSelected} name="service_id" mb={3}>
                                    {serviceSelector.services.map(service => {
                                        return (
                                            <option key={service.id} value={JSON.stringify(service)}>{service.name}</option>
                                        )
                                    })}
                                </Select>
                                <Label htmlFor="sound">Type of Paper</Label>
                                <Select onChange={parseTypeSelected} name="type_id" mb={3}>
                                    {typeSelector.types.map(type => {
                                        return (
                                            <option key={type.id} value={JSON.stringify(type)}>{type.name}</option>
                                        )
                                    })}
                                </Select>
                                <Label htmlFor="sound">Level</Label>
                                <Select onChange={parseLevelSelected} name="level_id" mb={3}>
                                    {levelSelector.levels.map(level => {
                                        return (
                                            <option key={level.id} value={JSON.stringify(level)}>{level.name}</option>
                                        )
                                    })}
                                </Select>
                                <Label htmlFor="sound">Subject</Label>
                                <Select onChange={handleChange} name="subject_id" mb={3}>
                                    {subjectSelector.subjects.map(subject => {
                                        return (
                                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                                        )
                                    })}
                                </Select>
                                <Label htmlFor="sound">Urgency</Label>
                                <Select onChange={parseUrgencySelected} name="urgency_id" mb={3}>
                                    {urgencySelector.urgencies.map(urgency => {
                                        return (
                                            <option key={urgency.id} value={JSON.stringify(urgency)}>{urgency.name}</option>
                                        )
                                    })}
                                </Select>
                                <Label htmlFor="sound">Style</Label>
                                <Select onChange={handleChange} name="style_id" mb={3}>
                                    {styleSelector.styles.map(style => {
                                        return (
                                            <option key={style.id} value={style.id}>{style.name}</option>
                                        )
                                    })}
                                </Select>
                                <Label htmlFor="sound">Sources</Label>
                                <Select onChange={handleChange} name="sources_id" mb={3}>
                                    {sourcesSelector.sources.map(source => {
                                        return (
                                            <option key={source.id} value={source.id}>{source.name}</option>
                                        )
                                    })}
                                </Select>
                                <Label htmlFor="sound">Spacing</Label>
                                <Select onChange={parseSpacingSelected} name="spacing_id" mb={3}>
                                    {spacingSelector.spacings.map(spacing => {
                                        return (
                                            <option key={spacing.id} value={JSON.stringify(spacing)}>{spacing.name}</option>
                                        )
                                    })}
                                </Select>
                                <Label htmlFor="sound">Language</Label>
                                <Select onChange={handleChange} name="language_id" mb={3}>
                                    {languageSelector.languages.map(language => {
                                        return (
                                            <option key={language.id} value={language.id}>{language.name}</option>
                                        )
                                    })}
                                </Select>
                                <Label htmlFor="sound">Pages</Label>
                                <Select onChange={parsePageSelected} name="pages_id" id="pages_id" mb={3}>
                                    {pageSelector.pages.map(page => {
                                        return (
                                            <option key={page.id} value={JSON.stringify(page)}>{[page.name]}</option>
                                        )
                                    })}
                                </Select>
                                <Label htmlFor="phone">Phone*</Label>
                                <Input onChange={handleChange} name="phone" placeholder={phone} type='text' mb={3} />
                                <Label htmlFor="topic">Topic*</Label>
                                <Input onChange={handleChange} name="topic" placeholder={topic} type='text' mb={3} />
                                <Label htmlFor="instructions">Instructions*</ Label>
                                <Textarea onChange={handleChange} name="instructions" placeholder={instructions} type='text' rows={3} mb={3} />
                                <Button type="submit" color="cyan" appearance="primary">Edit</Button>
                            </Box>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default OrderUpdate;