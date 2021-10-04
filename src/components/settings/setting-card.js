/** @jsx jsx */
import Head from 'next/head';
import {jsx, Box, Button, Image} from 'theme-ui';
import LogoDark from 'assets/logo.png';
import Logo from "../home/logo";
import { BiCheckShield } from 'react-icons/bi';
import { RiSettings2Line } from 'react-icons/ri';
import { AiOutlineCheckCircle, AiOutlineStop } from 'react-icons/ai';
import { MdAddCircle } from 'react-icons/md';
import { FcTimeline, FcCancel } from 'react-icons/fc';
import { BsCheckAll, BsStopwatch } from 'react-icons/bs';
import NoTransactions from '../../assets/no-transactions.svg';

const SettingCard = ({section}) => {
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
                    <Button sx={styles.button}><MdAddCircle/> Add Funds</Button>
                </Box>
                <Box sx={styles.nav}>
                    <Button className='wallet-button'>Deposit</Button>
                    <Button className='wallet-button'>Transanctions</Button>
                    <Button className='wallet-button'>Withdraw</Button>
                </Box>
                <Box sx={styles.wallet}>
                    <Box sx={{p:'15px', backgroundColor: '#273142',color: 'white', borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}}><h3>Transactions</h3></Box><hr/>
                    <Box sx={{display: 'flex', flexDirection: 'column', pb: '30px'}}>
                        <center>
                            <Image sx={{width: '300px'}} src={NoTransactions} alt=""/><br/>
                            <h3 style={{color: '#273142'}}>You haven't made any transactions<br/>
                                When you add funds, pay for an order, etc., all details will appear here.</h3>
                        </center>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SettingCard;

const styles = {
    orderCard: {
        margin: 0,
        padding: 0,
        display: "flex",
    },
    nav: {
        display: 'flex',
        marginTop: '20px',
        gap: '10px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        '.wallet-button': {
            cursor: 'pointer',
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            borderBottomRightRadius: "unset",
            borderBottomLeftRadius: "unset",
            padding: '10px',
            background: 'linear-gradient(to right, #17c671, #0059B2)',
            color: 'white',
        }
    },
    wallet: {
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        minHeight: '350px',
        mx: '10px',
        my:'10px',
    },
    button: {
        borderRadius: "10px",
        background: 'linear-gradient(to right, #17c671, #0059B2)',
        padding: '5px',
        color: 'white',
        cursor: 'pointer',
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
        listStyle: 'none',
        fontSize: ["20px", null, '26px'],
        li : {
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
            p: ['4px', null, '4px'],
            borderRadius: '5px',
            a: {
                fontFamily: 'Quicksand, sans-serif',
                textDecoration: 'none',
                color: 'black',
            }
        }
    },

}