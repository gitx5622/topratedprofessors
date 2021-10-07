/** @jsx jsx */
import Head from 'next/head';
import {jsx, Box, Button} from 'theme-ui';
import LogoDark from 'assets/logo.png';
import Logo from "../home/logo";
import { BiCheckShield } from 'react-icons/bi';
import { RiSettings2Line } from 'react-icons/ri';
import { AiOutlineCheckCircle, AiOutlineStop } from 'react-icons/ai';
import { MdAddCircle } from 'react-icons/md';
import { FcTimeline, FcCancel } from 'react-icons/fc';
import { BsCheckAll, BsStopwatch } from 'react-icons/bs';
import DataTable from 'react-data-table-component';

const data = [
    {
        id: 1,
        name: 'Beetlejuice',
        calories: 150,
        type: 'Ice cream',
        fat: 3.5,
        carbs: 15,
        iron: 34,
        year: '1988',
    },
    {
        id: 2,
        name: 'Ghostbusters',
        calories: 230,
        type: 'Weed',
        fat: 24,
        carbs: 67,
        iron: 34,
        year: '1984',
    },
    {
        id: 3,
        name: 'Beetlejuice',
        calories: 408,
        type: 'Caffein',
        fat: 16,
        carbs: 51,
        iron: 34,
        year: '1988',
    },
    {
        id: 4,
        name: 'Ghostbusters',
        calories: 375,
        type: 'Jobs',
        fat: 50,
        carbs: 37,
        iron: 34,
        year: '1984',
    },
]
const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
        grow: 2,
    },
    {
        name: 'Type',
        selector: row => row.type,
        sortable: true,
    },
    {
        name: 'Calories (g)',
        selector: row => row.calories,
        sortable: true,
        right: true,
        conditionalCellStyles: [
            {
                when: row => row.calories < 300,
                style: {
                    backgroundColor: 'rgba(63, 195, 128, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
            {
                when: row => row.calories >= 300 && row.calories < 400,
                style: {
                    backgroundColor: 'rgba(248, 148, 6, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
            {
                when: row => row.calories >= 400,
                style: {
                    backgroundColor: 'rgba(242, 38, 19, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'not-allowed',
                    },
                },
            },
        ],
    },
    {
        name: 'Fat (g)',
        selector: row => row.fat,
        sortable: true,
        right: true,
        conditionalCellStyles: [
            {
                when: row => row.fat <= 5,
                style: {
                    backgroundColor: 'rgba(63, 195, 128, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
            {
                when: row => row.fat > 5 && row.fat < 10,
                style: {
                    backgroundColor: 'rgba(248, 148, 6, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
            {
                when: row => row.fat > 10,
                style: {
                    backgroundColor: 'rgba(242, 38, 19, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'not-allowed',
                    },
                },
            },
        ],
    },
    {
        name: 'Carbs (g)',
        selector: row => row.carbs,
        sortable: true,
        right: true,
    },
    {
        name: 'Iron (%)',
        selector: row => row.iron,
        sortable: true,
        right: true,
    },
];


const SettingCard = ({section}) => {
    const handleFirstPageButtonClick = () => {
        onChangePage(1);
    };

    // RDT uses page index starting at 1, MUI starts at 0
    // i.e. page prop will be off by one here
    const handleBackButtonClick = () => {
        onChangePage(page);
    };

    const handleNextButtonClick = () => {
        onChangePage(page + 2);
    };

    const handleLastPageButtonClick = () => {
        onChangePage(getNumberOfPages(count, rowsPerPage));
    };
    return (
        <Box sx={styles.orderCard}>
            <Head>
                <title>Settings</title>
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
            <Box sx={{marginLeft: '23%', fontFamily: 'Quicksand, sans-serif', marginTop:"70px", width: '100%', '@media screen and (max-width:768px)': {
                    marginLeft: 0,
                },}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mx:'20px'}}>
                    <h1>My profile</h1>
                    <button sx={styles.button}><MdAddCircle/> Edit profile</button>
                </Box>
                <Box sx={styles.profile}>
                    <Box sx={styles.profile.details}>
                        <Box sx={styles.profile.image}>96</Box>
                        <Box>
                            <h3>434696</h3>
                            <h4>10:53 AM</h4>
                            <h3>Member since: Nov 6, 2020</h3>
                        </Box>
                    </Box>
                    <Box sx={styles.profile.orders}>
                        <Box sx={styles.profile.orders.first}><h3>0 Orders</h3></Box>
                        <Box sx={styles.profile.orders.first}><h3>0% Accepted</h3></Box>
                        <Box sx={styles.profile.orders.next}><h3>0% Payrate</h3></Box>
                    </Box>
                </Box>
                <Box sx={styles.lastOrder}>
                    <Box sx={styles.lastOrder.header}>
                        Last Order
                    </Box>
                    <Box>
                        <DataTable columns={columns} data={data} pagination  customStyles={styles.customStyles}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SettingCard;

const styles = {
    customStyles : {
        rows: {
            style: {
                minHeight: '60px', // override the row height
            },
        },
        headCells: {
            style: {
                background: '#E3F2FD',
                fontSize: '20px',
                color: 'black',
                fontWeight: 700,
            },
        },
        cells: {
            style: {
                padding: '10px', // override the cell padding for data cells
                fontSize: '18px',
                color: 'black',
                fontWeight: 500,
            },
        },
    },
    lastOrder:{
        minHeight:'200px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        margin:"20px",
        header: {
            padding: '10px',
            minHeight: '20px',
            background: '#273142',
            color: 'white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
        },
    },
    profile: {
        display: 'flex',
        gap: '1em',
        padding: '20px',
        image: {
            height: '70px',
            width: '70px',
            borderRadius: '50px',
            backgroundColor: 'red',
            textAlign: 'center',
            pt: '20px',
            color: 'white',
        },
        details: {
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            height: '100px',
            padding: '10px',
            mt: '20px',
            width: '50%',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '5px',
        },
        orders:{
            display: 'flex',
            justifyContent: 'space-around',
            height: '100px',
            mt: '20px',
            width: '50%',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '5px',
            first : {
                padding: '30px',
                borderRight: '1px solid rgba(0, 0, 0, 0.2)',
            },
            next: {
                padding: '30px',
            }
        },
    },
    orderCard: {
        margin: 0,
        padding: 0,
        display: "flex",
    },
    button: {
        borderRadius: "10px",
        background: 'linear-gradient(to right, #17c671, #0059B2)',
        padding: '5px',
        color: 'white',
        cursor: 'pointer',
    },
    sidebar: {
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

}