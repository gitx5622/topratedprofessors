/** @jsx jsx */
import React, {useState, useEffect, useMemo, useReducer} from "react";
import Head from 'next/head';
import {useRouter} from "next/router";
import { useDispatch, useSelector} from "react-redux";
import {jsx, Box, Button, Label, Input, Textarea, Select, Grid, Image, Close, Alert} from 'theme-ui';
import {getOrders} from "../../../dataStore/actions/ordersAction";
import {useDropzone} from 'react-dropzone';
import dayjs from "dayjs";
import LogoDark from 'assets/logo.png';
import NoData from '../../../assets/no-open.svg';
import Logo from "../../home/logo";
import { BiCheckShield } from 'react-icons/bi';
import { RiSettings2Line } from 'react-icons/ri';
import { AiOutlineCheckCircle, AiOutlineStop } from 'react-icons/ai';
import { MdAddCircle } from 'react-icons/md';
import { FcTimeline, FcCancel } from 'react-icons/fc';
import { BsCheckAll, BsStopwatch } from 'react-icons/bs';
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
import DataTable from "react-data-table-component";
import {columns} from "./columns.data";
import FilterComponent from "./filter-component";

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
    const [contentEditor, setContentEditor] = React.useState();
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
            instructions:   contentEditor,
            pagesummary:    false,
            plagreport:     true,
            initialdraft:   false,
            qualitycheck:   false,
            topwriter:      true,
            promocode:'',
        }
        if (order.phone !== '' && order.topic !== '' && order.instructions !== '') {
            addOrder(bodyData);
        } else {
            dispatchCheckDetails({
                type: 'ERROR',
                errorMessage: 'Make sure all the fields all filled',
            });
            setCloseAlert(true);
            if(errorMessage){
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

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                data={filteredItems || orderData}
                onClear={handleClear}
                filterText={filterText}
                section={section}
            />
        );
    }, [filterText, resetPaginationToggle]);

    const customStyles = {
        headCells: {
            style: {
                background: '#E3F2FD',
                fontSize: '16px',
            },
        },
        cells: {
            style: {
                padding: '10px', // override the cell padding for data cells
                fontSize: '14px',
            },
        },
    };
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
        <Box sx={styles.orderCard}>
            <Head>
                <title>{section.toUpperCase().replace(/_/g, " ")}</title>
                <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'/>
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
            </Head>
                    <Box sx={styles.sidebar}  >
                        <ul sx={styles.list}>
                            <li style={{background: 'linear-gradient(to right, #17c671, #0059B2)'}}><a href='/dashboard/completed'><Logo src={LogoDark}/></a></li>
                            <li className={`create_order ${section === 'create_order' ?  'active' : '' } `}><a href='/dashboard/create_order'><MdAddCircle/> Create Order</a></li>
                            <li className={`completed ${section === 'completed' ?  'active' : '' } `}><a href='/dashboard/completed'><AiOutlineCheckCircle/> Completed</a></li>
                            <li className={`all-orders ${section === 'all-orders' ?  'active' : '' } `}><a href='/dashboard/all-orders'><BsCheckAll/>  All Orders</a></li>
                            <li className={`in_progress ${section === 'in_progress' ?  'active' : '' } `}><a href='/dashboard/in_progress'><i className='bx bx-loader-circle bx-spin'/> In Progress</a></li>
                            <li className={`waiting-assign ${section === 'waiting-assign' ?  'active' : '' } `}><a href='/dashboard/waiting-assign'><BsStopwatch/> To be Assigned</a></li>
                            <li className={`rejected ${section === 'rejected' ?  'active' : '' } `}><a href='/dashboard/rejected'><AiOutlineStop/> Rejected</a></li>
                            <li className={`approved ${section === 'approved' ?  'active' : '' } `}><a href='/dashboard/approved'><BiCheckShield/> Approved</a></li>
                            <li className={`pending ${section === 'pending' ?  'active' : '' } `}><a href='/dashboard/pending'><FcTimeline/> Pending</a></li>
                            <li className={`cancelled ${section === 'cancelled' ?  'active' : '' } `}><a href='/dashboard/cancelled'><FcCancel/> Cancelled</a></li>
                            <li className={`settings ${section === 'settings' ?  'active' : '' } `}><a href='/dashboard/settings'><RiSettings2Line/> Settings</a></li>
                        </ul>
                    </Box>
                <Box sx={{marginLeft: '23%', width: '100%', '@media screen and (max-width:768px)': {
                        marginLeft: 0,
                    },}}>
                    {orderData ?
                        <>
                            {
                                isLoading && (
                                    <BoxLoading/>
                                )
                            }
                            {section === 'completed' && (
                                <Box sx={styles.completedPage}>
                                    <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>{section.toUpperCase().replace(/_/g, " ")}</Box>
                                    <Box>
                                        <DataTable
                                            columns={columns}
                                            data={filteredItems}
                                            pagination
                                            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                                            subHeader
                                            subHeaderComponent={subHeaderComponentMemo}
                                            selectableRows
                                            persistTableHead
                                            customStyles={customStyles}
                                        />
                                    </Box>
                                </Box>
                                // orderData.map(order => {
                                //     return (
                                //         <tr key={order.id}>
                                //             <td><a style={{color: '#1890FF', textDecoration: 'none'}}
                                //                    href={`/orders/order_details/${order.id}`}>{order.order_number}</a>
                                //             </td>
                                //             <td>{dayjs(order.deadline).format("dddd, MMMM D YYYY")}</td>
                                //             <td>{order.type.name}</td>
                                //             <td>
                                //                 <center>{order.page.no_of_page}</center>
                                //             </td>
                                //             <td>
                                //                 <center>{(order.amount).toFixed(2)}</center>
                                //             </td>
                                //             <td>
                                //                 <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                                //                 <IconContext.Provider value={{ color: "green", size:'1.5em', className: "global-class-name" }}>
                                //                         <GrView />
                                //                 </IconContext.Provider>
                                //                 <IconContext.Provider value={{ color: "blue", size:'1.5em', className: "global-class-name" }}>
                                //                     <FiEdit/>
                                //                 </IconContext.Provider>
                                //                 <IconContext.Provider value={{ color: "red", size:'1.5em', className: "global-class-name" }}>
                                //                     <AiOutlineDelete/>
                                //                 </IconContext.Provider>
                                //                 </Box>
                                //             </td>
                                //             <td><Button className='reserve-button'>Reserve Now</Button></td>
                                //         </tr>
                                //     )
                                // })
                                )}
                        </>
                        : (
                                <Box>
                                <Box sx={{display: "flex", flexDirection: 'column'}}>
                                    <center>
                                        <Image src={NoData} alt="no-data"/><br/>
                                        <h3>You have no Active Data</h3><br/>
                                        <Button
                                            sx={{background: 'linear-gradient(to right, #17c671, #0059B2)'}}><MdAddCircle/> Place
                                            Order</Button>
                                    </center>
                                </Box>
                                </Box>
                        )
                        }
                    {section === 'create_order' && (
                        <Box>
                            {closeAlertErrorMessage ?
                                <Alert sx={{background: "red"}}>
                                    {errorMessage}
                                    <Close ml="auto" mr={-2} onClick={handleCloseErrorMessageAlert}/>
                                </Alert>
                                    : ''
                            }
                            {checkDetailsData.errorMessage && (
                                closeAlert ?
                                    <Alert sx={{background: "red"}}>{checkDetailsData.errorMessage}<Close ml="auto" mr={-2} onClick={handleCloseAlert}/></Alert>
                                    : ''
                            )}
                            <Box as='form' onSubmit={handleCreateOrderSubmit}>
                                <Grid sx={styles.form.grid}>
                                    <Box>
                                        <Label htmlFor="service">Service</Label>
                                        <Select sx={styles.form.select} onChange={parseServiceSelected} name="service_id">
                                            {serviceSelector.services.map(service => { return (
                                                <option key={service.id} value={JSON.stringify(service)}>{service.name}</option>
                                            )})}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <Label htmlFor="type_id">Type of Paper</Label>
                                        <Select sx={styles.form.select} onChange={parseTypeSelected} name="type_id">
                                            {typeSelector.types.map(type => { return (
                                                <option key={type.id} value={JSON.stringify(type)}>{type.name}</option>
                                            )})}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <Label htmlFor="urgency_id">Urgency</Label>
                                        <Select sx={styles.form.select} onChange={parseUrgencySelected} name="urgency_id">
                                            {urgencySelector.urgencies.map(urgency => { return (
                                                <option key={urgency.id} value={JSON.stringify(urgency)}>{urgency.name}</option>
                                            )})}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <Label htmlFor="style_id">Style</Label>
                                        <Select sx={styles.form.select} onChange={handleChange} name="style_id" >
                                            {styleSelector.styles.map(style => { return (
                                                <option key={style.id} value={style.id}>{style.name}</option>
                                            )})}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <Label htmlFor="sources">Sources</Label>
                                        <Select sx={styles.form.select} onChange={handleChange} name="sources_id">
                                            {sourcesSelector.sources.map(sources => { return (
                                                <option key={sources.id} value={sources.id}>{sources.name}</option>
                                            )})}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <Label htmlFor="language_id">Language</Label>
                                        <Select sx={styles.form.select} onChange={handleChange} name="language_id">
                                            {languageSelector.languages.map(language => { return (
                                                <option key={language.id} value={language.id}>{language.name}</option>
                                            )})}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <Label htmlFor="page_id">Pages</Label>
                                        <Select sx={styles.form.select} onChange={parsePageSelected} name="page_id" id="page_id">
                                            {pageSelector.pages.map(page => { return (
                                                <option key={page.id} value={JSON.stringify(page)}>{page.name}</option>
                                            )})}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <Label htmlFor="level_id">Level</Label>
                                        <Select sx={styles.form.select} onChange={parseLevelSelected} name="level_id">
                                            {levelSelector.levels.map(level => { return (
                                                <option key={level.id} value={JSON.stringify(level)}>{level.name}</option>
                                            )})}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <Label htmlFor="service_id">Spacing</Label>
                                        <Select sx={styles.form.select} onChange={parseSpacingSelected} name="spacing_id">
                                            {spacingSelector.spacings.map(spacing => { return (
                                                <option sx={styles.form.select.option} key={spacing.id} value={JSON.stringify(spacing)}>{spacing.name}</option>
                                            )})}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <Label htmlFor="subject_id">Subject</Label>
                                        <Select sx={styles.form.select} name="subject_id">
                                            {subjectSelector.subjects.map(subject => { return (
                                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                                            )})}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <Label htmlFor="spacing">Phone</Label>
                                        <Input sx={styles.form.select} onChange={handleChange} placeholder="0712345678" name="phone" type="text"/>
                                    </Box>
                                </Grid>
                                <Grid sx={styles.form.topicGrid}>
                                    <Box>
                                        <Label htmlFor="topic ">Topic</Label>
                                        <Input sx={styles.form.select} onChange={handleChange} name="topic " placeholder='Topic' />
                                    </Box>
                                    <Box>
                                        <Label htmlFor="username">Upload Files</Label>
                                        <StyledDropzone/>
                                    </Box>
                                </Grid>
                                <Box mt={3} >
                                    <Label htmlFor="spacing">Instructions</Label>
                                    <Textarea sx={styles.form.textarea} autoFocus onChange={handleChange} name="comment" id="comment" rows={6}/>
                                </Box>
                                <Button sx={styles.buttonCreate} mt={2}>Create Order</Button>
                            </Box>
                        </Box>
                    )}
                </Box>
        </Box>
    );
};
export default OrderCard;

const styles = {
    buttonCreate: {
            borderRadius: "10px",
            background: 'linear-gradient(to right, #17c671, #0059B2)',
            padding: '5px',
            color: 'white',
            cursor: 'pointer',
    },
    defaultOrder: {
        width: '200px',
        height: '40px',
        '::placeholder': {
            color: 'white'
        }
    },
    completedPage:{
        minHeight:'200px',
        header: {
            padding: '10px',
            minHeight: '20px',
            background: '#273142',
            color: 'white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
        },
    },
    baseStyle:  {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#bdbdbd',
        color: 'black',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    },
    activeStyle : {
        borderColor: '#2196f3'
    },
    acceptStyle : {
        borderColor: '#00e676'
    },
    rejectStyle : {
        borderColor: '#ff1744'
    },
    orderCard: {
        margin: 0,
        padding: 0,
        display: "flex",
    },
    sidebar: {
        ml: '-8px',
        width: '23%',
        height: '100%',
        top: '0px',
        position: 'fixed',
        backgroundColor: '#EAEEF3',
        borderRight: '1px solid rgba(0, 0, 0, 0.2)',
        '@media screen and (max-width:768px)': {
            display: 'none',
        },
    },
    list : {
        '.completed': {
            '&.active': {
                color: '#ffffff',
                backgroundColor: 'white',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },
        '.all-orders': {
            '&.active': {
                color: '#ffffff',
                backgroundColor: 'white',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },
        '.waiting-assign': {
            '&.active': {
                color: '#ffffff',
                backgroundColor: 'white',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },
        '.rejected': {
            '&.active': {
                color: '#ffffff',
                backgroundColor: 'white',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },
        '.pending': {
            '&.active': {
                backgroundColor: 'white',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },
        '.approved': {
            '&.active': {
                color: '#ffffff',
                backgroundColor: 'white',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },
        '.create_order': {
            '&.active': {
                color: '#ffffff',
                backgroundColor: 'white',
                boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
            },
        },

        listStyle: 'none',
        fontSize: [15, null, 24],
        li : {
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
            p: ['5px', null, '5px'],
            borderRadius: '5px',
            a: {
                fontFamily: 'Quicksand, sans-serif',
                textDecoration: 'none',
                color: 'black',
            }
        }
    },
    table : {
        width: '100%',
        th: {
            fontFamily: 'Quicksand, sans-serif',
            position: 'sticky',
            top: '60px',
            backgroundColor: '#EAEEF3',
            py: ['10px', null, '10px'],
            px: ['5px', null, '7px']
        },
        td: {
            fontFamily: 'Quicksand, sans-serif',
            borderBottom: '1px solid #E5ECF4',
            marginBottom: '15px',
        },
        '.reserve-button':{
            backgroundColor: 'secondary',
            borderRadius: '10px',
            padding: '12px 10px',
        },
    },
    form:  {
        grid: {
            gridTemplateColumns: ['repeat(1,1fr)', 'repeat(2,1fr)',  'repeat(4,1fr)', 'repeat(4,1fr)'],
        },
        select: {
            fontFamily: 'Quicksand, sans-serif',
            borderColor: '#E5ECF4',
            height: '50px',
            option: {
                fontFamily: 'Quicksand, sans-serif',
                '&:focus': {
                    borderColor: '0 0 3pt 2pt #719ECE',
                },
            }
        },
        textarea: {
            borderColor: '#E5ECF4',
            boxShadow: '0 0 3pt 2pt #719ECE',
            '&:focus': {
                boxShadow: '0 0 3pt 2pt #719ECE',
            },
        },
        topicGrid: {
            gridTemplateColumns: ['repeat(1,1fr)',null,'repeat(1,1fr)'],
        }
    }
}