/** @jsx jsx */
import React, {useState, useEffect, useMemo, useReducer} from "react";
import Head from 'next/head';
import {useRouter} from "next/router";
import { useDispatch, useSelector} from "react-redux";
import {jsx, Box, Button,Image} from 'theme-ui';
import {getOrders} from "../../../dataStore/actions/ordersAction";
import {useDropzone} from 'react-dropzone';
import NoData from '../../../assets/no-open.svg';
import { MdAddCircle } from 'react-icons/md';
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
import {createOrders} from "../../../dataStore/actions/ordersAction";
import { BoxLoading } from 'react-loadingg';
import checkDetailsReducer, {initialCheckDetailsState} from "../../../dataStore/reducers/checkDetailsReducer";
import Completed from "../sections/completed";
import CreateOrder from "../sections/create-order";

const OrderCard = ({section}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [closeAlert, setCloseAlert] = useState(false);
    const [closeAlertErrorMessage, setCloseAlertErrorMessage] = useState(false);
    const [selected, setSelected] = React.useState("");
    const [myservice, setmyservice] = React.useState(8);
    const [mytype, setmytype] = React.useState(1);
    const [myurgency, setmyurgency] = React.useState(1);
    const [mypages, setmypages] = React.useState(1);
    const [mylevel, setmylevel] = React.useState(1);
    const [myspacing, setmyspacing] = React.useState(1);
    console.log(selected);
    const [order, setOrder] = React.useState({
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
        pagesummary:'',
        plagreport:'',
        initialdraft:'',
        qualitycheck:'',
        topwriter:'',
        promocode:''
    });
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const [checkDetailsData, dispatchCheckDetails] = useReducer(
        checkDetailsReducer,
        initialCheckDetailsState
    );
    useEffect(() => {
        const { id: userId } = JSON.parse(localStorage.currentUser);
        getOrders(dispatch, userId )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    function StyledDropzone() {
        const {
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject
        } = useDropzone('image/*');

        const style = useMemo(() => ({
            ...styles.baseStyle,
            ...(isDragActive ? styles.activeStyle : {}),
            ...(isDragAccept ? styles.acceptStyle : {}),
            ...(isDragReject ? styles.rejectStyle : {})
        }), [
            isDragActive,
            isDragReject,
            isDragAccept
        ]);

        return (
            <div className="container">
                <div {...getRootProps({style})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </div>
        );
    }
    const parseServiceSelected = (event) => {
        const valueToParse = event.target.value;
        const service_id_index = Object.values(JSON.parse(valueToParse));
        const service_id = service_id_index[0];
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setmyservice(itemSelected.factor);
        setOrder({
            ...order,
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
        setOrder({
            ...order,
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
        setOrder({
            ...order,
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
        setOrder({
            ...order,
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
        setOrder({
            ...order,
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
        setOrder({
            ...order,
            [event.target.name]: spacing_id
        })
    };
    const handleCloseAlert = () => {
        setCloseAlert(false);
    }
    const handleCloseErrorMessageAlert = () => {
        setCloseAlertErrorMessage(false);
    }
    const addOrder = (credentials) => createOrders(dispatch, credentials);
    const handleCreateOrderSubmit = (e) => {
        e.preventDefault();
        const {id: userID} = JSON.parse(localStorage.currentUser);
        const bodyData =  {
            user_id:        parseInt(userID),
            service_id:     parseInt(order.service_id, 10),
            type_id:        parseInt(order.type_id,10),
            style_id:       parseInt(order.style_id,10),
            level_id:       parseInt(order.level_id,10),
            pages_id:       parseInt(order.pages_id,10),
            urgency_id:     parseInt(order.urgency_id,10),
            subject_id:     parseInt(order.subject_id,10),
            sources_id:     parseInt(order.sources_id,10),
            spacing_id:     parseInt(order.spacing_id,10),
            language_id:    parseInt(order.language_id,10),
            phone:          order.phone,
            topic:          order.topic,
            instructions:   order.instructions,
            pagesummary:    false,
            plagreport:     true,
            initialdraft:   false,
            qualitycheck:   false,
            topwriter:      true,
            promocode:'',
        }
        if (order.phone !== '' && order.topic !== '' && order.instructions !== '') {
            addOrder(bodyData);
            router.push("/dashboard/completed")
        } else {
            dispatchCheckDetails({
                type: 'ERROR',
                errorMessage: 'Make sure all the fields all filled',
            });
            setCloseAlert(true);
            if(errorMessage.errorMessage){
                setCloseAlertErrorMessage(true)
            }else{
                setCloseAlertErrorMessage(false)
            }
        }
    };
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
    const orderSelector = useSelector(state => state.orderState);
    const {
        errorMessage,
        isLoading,
        orders: {
            orders: orderData,
            pagination
        }
    } = orderSelector;

    const filteredItems = orderData?.filter(
        item => item.type.name && item.type.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    const handleChange = event => {
        event.preventDefault();
        setOrder({
            ...order,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
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
        addOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    return (
        <Box>
            <Head>
                <title>{section.toUpperCase().replace(/_/g, " ")}</title>
                <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'/>
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
            </Head>
                    {orderData ?
                        <>
                            {
                                isLoading && (
                                    <BoxLoading/>
                                )
                            }
                            {section === 'completed' && (
                               <Completed data={filteredItems} pagination={pagination}/>
                                )}
                        </>
                        : (
                            section === 'create_order' ? '' : (
                                <Box>
                                    <Box sx={{display: "flex", flexDirection: 'column'}}>
                                        <center>
                                            <Image src={NoData} alt="no-data"/><br/>
                                            <h3>You have no Active Data</h3><br/>
                                            <Button onClick={() => router.push('/dashboard/create_order')}
                                                    sx={{background: 'linear-gradient(to right, #17c671, #0059B2)'}}><MdAddCircle/> Place
                                                Order</Button>
                                        </center>
                                    </Box>
                                </Box>
                            )
                        )
                        }
                    {section === 'create_order' && (
                       <CreateOrder/>
                    )}
        </Box>
    );
};
export default OrderCard;