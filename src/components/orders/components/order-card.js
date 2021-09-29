/** @jsx jsx */
import React, {useState, useEffect, useMemo} from "react";
import {useRouter} from "next/router";
import { useDispatch, useSelector} from "react-redux";
import {jsx, Box, Button, Label, Input, Textarea, Select, Grid} from 'theme-ui';
import {getOrders} from "../../../dataStore/actions/ordersAction";
import {useDropzone} from 'react-dropzone';
import dayjs from "dayjs";
import LogoDark from 'assets/logo.png';
import Logo from "../../logo";
import Head from 'next/head';
import { GrView } from 'react-icons/gr';
import { BiCheckShield } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { RiSettings2Line } from 'react-icons/ri';
import { AiOutlineDelete, AiOutlineCheckCircle, AiOutlineStop } from 'react-icons/ai';
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


const OrderCard = ({section}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const orderSelector = useSelector(state => state.orderState);
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
        service_id:'',
        type_id:'',
        style_id:'',
        level_id: '',
        pages_id:'',
        urgency_id:'',
        subject_id:'',
        sources_id:'',
        spacing_id:'',
        language_id:'',
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

    const {
        orders: {
            orders: orderData,
            pagination
        }
    } = orderSelector;

    const router = useRouter();
    const dispatch = useDispatch();

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
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
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

    const addOrder = (credentials) => createOrders(dispatch, credentials);
    // const {id: userID} = JSON.parse(localStorage.currentUser);
    const handleCreateOrderSubmit = (e) => {
        e.preventDefault();
        addOrder({
            // user_id:        parseInt(userID),
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
        });
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

    const handleChange = event => {
        event.preventDefault();
        setOrder({
            ...order,
            [event.target.name]: event.target.value
        })
    };

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
                <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'/>
            </Head>
                    <Box sx={styles.sidebar}  >
                        <ul sx={styles.list}>
                            <li style={{backgroundColor: '#17c671'}}><a href='/dashboard/completed'><Logo src={LogoDark}/></a></li>
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
                    <table sx={styles.table} >
                        <thead sx={section === 'create_order' ? styles.createHeader : ''}>
                        <tr>
                            <th >Order No</th>
                            <th>Deadline</th>
                            <th>Type</th>
                            <th>Pages</th>
                            <th>Amount</th>
                            <th>Actions</th>
                            <th>Reserve Now</th>
                        </tr>
                        </thead>
                        <tbody>
                        {section === 'completed' && (
                            orderData.map(order => { return (
                                <tr key={order.id}>
                                    <td><a style={{color: '#1890FF', textDecoration: 'none'}} href={`/orders/order_details/${order.id}`}>{order.order_number}</a></td>
                                    <td>{dayjs(order.deadline).format("dddd, MMMM D YYYY")}</td>
                                    <td>{order.type.name}</td>
                                    <td><center>{order.page.no_of_page}</center></td>
                                    <td><center>{(order.amount).toFixed(2)}</center></td>
                                    <td><GrView style={{color: 'red'}}/> <FiEdit/> <AiOutlineDelete/></td>
                                    <td><Button className='reserve-button'>Reserve Now</Button></td>
                                </tr>
                            )})
                        )}
                        {section === 'all-orders' && (
                            orderData.map(order => { return (
                                <tr key={order.id}>
                                    <td><a style={{color: '#1890FF', textDecoration: 'none'}} href={`/orders/order_details/${order.id}`}>{order.order_number}</a></td>
                                    <td>{dayjs(order.deadline).format("dddd, MMMM D YYYY")}</td>
                                    <td>{order.type.name}</td>
                                    <td><center>{order.page.no_of_page}</center></td>
                                    <td><center>{(order.amount).toFixed(2)}</center></td>
                                    <td><GrView style={{color: 'red'}}/> <FiEdit/> <AiOutlineDelete/></td>
                                    <td><Button className='reserve-button'>Reserve Now</Button></td>
                                </tr>
                            )})
                        )}
                        </tbody>
                    </table>
                    {section === 'create_order' && (
                        <Box>
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
                                        <Select sx={styles.form.select} name="urgency_id">
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
                                        <Label htmlFor="username">Topic</Label>
                                        <Input sx={styles.form.select} name="topic " placeholder='Topic' />
                                    </Box>
                                    <Box>
                                        <Label htmlFor="username">Upload Files</Label>
                                        <StyledDropzone/>
                                    </Box>
                                </Grid>
                                <Box mt={3} >
                                    <Label htmlFor="spacing">Instructions</Label>
                                    <Textarea sx={styles.form.texterea} name="comment" id="comment" rows={6}/>
                                </Box>
                                <Button mt={2}>Create Order</Button>
                            </Box>
                        </Box>
                    )}
                </Box>
        </Box>
    );
};

export default OrderCard;

const styles = {
    createHeader: {
        display: 'none',
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
                fontFamily: 'body',
                textDecoration: 'none',
                color: 'black',
            }
        }
    },
    table : {
        width: '100%',
        th: {
            fontFamily: 'body',
            position: 'sticky',
            top: '60px',
            backgroundColor: '#EAEEF3',
            py: ['10px', null, '10px'],
            px: ['5px', null, '7px']
        },
        td: {
            fontFamily: 'body',
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
            borderColor: '#E5ECF4',
            height: '50px',
            option: {
                '&:focus': {
                    borderColor: '0 0 3pt 2pt #719ECE',
                },
            }
        },
        texterea: {
            borderColor: '#E5ECF4',
            '&:focus': {
                boxShadow: '0 0 3pt 2pt #719ECE',
            },
        },
        topicGrid: {
            gridTemplateColumns: ['repeat(1,1fr)',null,'repeat(1,1fr)'],
        }
    }
}