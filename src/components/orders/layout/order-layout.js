import React from 'react';
import { Container, Header, Content, Nav, Sidebar, Dropdown, Navbar } from 'rsuite';
import { logoutUser } from "../../../dataStore/actions/userLogoutAction";
import { useDispatch } from "react-redux";
import { Sidenav, Badge } from 'rsuite';
import ShieldIcon from '@rsuite/icons/Shield';
import { Box } from 'theme-ui';
import Geal from '../../../assets/logo.png';
import ArowBackIcon from '@rsuite/icons/ArowBack';
import DashboardIcon from '@rsuite/icons/Dashboard';
import PeopleBranchIcon from '@rsuite/icons/PeopleBranch';
import PeoplesIcon from '@rsuite/icons/Peoples';
import LocationIcon from '@rsuite/icons/Location';
import ExploreIcon from '@rsuite/icons/Explore';
import CheckOutlineIcon from '@rsuite/icons/CheckOutline';
import AlipayIcon from '@rsuite/icons/Alipay';
import OffIcon from '@rsuite/icons/Off';
import PageNextIcon from '@rsuite/icons/PageNext';
import UserBadgeIcon from '@rsuite/icons/UserBadge';
import NoticeIcon from '@rsuite/icons/Notice';
import PeoplesCostomizeIcon from '@rsuite/icons/PeoplesCostomize';
import { useRouter } from "next/router";


const NavToggle = ({ expand, onChange }) => {
    const router = useRouter();
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>
                <Nav>
                    <Dropdown
                        placement="topStart"
                        trigger="click"
                    >
                        <Dropdown.Item>Help</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                </Nav>

                <Nav pullRight>
                    <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                        {expand ? <ArowBackIcon style={{ color: "red", fontSize: "30px" }} /> : <PageNextIcon style={{ fontSize: "30px", color: "red" }} />}
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
};

const OrderLayout = ({ children }) => {
    const [username, setUsername] = React.useState(null);
    const [expand, setExpand] = React.useState(true);
    const router = useRouter();
    const dispatch = useDispatch();


    const handleLogout = () => {
        const sessionID = localStorage.sessionID
        if (sessionID) {
            logoutUser(dispatch, sessionID);
            localStorage.clear();
            router.push('/');
        } else {
            <Alert severity="error">You cannot logout user -
                You still have an active Session
            </Alert>
        }
    }

    React.useEffect(() => {
        try {
            JSON.parse(localStorage.currentUser);
        } catch (error) {
            localStorage.clear();
            window.location.replace('/');
        }
    }, []);

    React.useEffect(() => {
        const value = localStorage.currentUser;
        const user = value ? JSON.parse(value) : undefined;
        setUsername(user.username);
    }, [])

    return (
        <div className="show-fake-browser sidebar-page" style={{ color: "black" }}>
            <Container>
                <Sidebar
                    style={{ display: 'flex', height: '100vh', color: "black", flexDirection: 'column' }}
                    width={expand ? 260 : 56}
                    collapsible
                    appearance="inverse"
                >
                    <Sidenav.Header>
                        <center>
                            <Box sx={styles.headerStyles}>

                                <img
                                    className='image'
                                    src={Geal}
                                    height={47}
                                    alt="" />

                            </Box>
                        </center>
                    </Sidenav.Header>
                    <Sidenav
                        style={{ color: "black", fontFamily: "Montserrat,Helvetica,Arial,serif" }}
                        expanded={expand}
                        defaultOpenKeys={['3']}
                        appearance="default">
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item
                                    eventKey="1"
                                    active icon={<DashboardIcon />}
                                    onClick={() => router.push('/dashboard/completed', undefined, { shallow: true })}>
                                    Dashboard
                                </Nav.Item>
                                <Nav.Item
                                    eventKey="2"
                                    icon={<PeopleBranchIcon color="#3498FF" />}
                                    onClick={() => router.push('/dashboard/completed', undefined, { shallow: true })}>
                                    Completed
                                </Nav.Item>
                                <Nav.Item
                                    eventKey="3"
                                    icon={<PeopleBranchIcon color="#3498FF" />}
                                    onClick={() => router.push('/dashboard/create_order', undefined, { shallow: true })}>
                                    Create Order
                                </Nav.Item>
                                <Nav.Item
                                    eventKey="4"
                                    icon={<AlipayIcon color="#3498FF" />}
                                    onClick={() => router.push('/dashboard/all-orders', undefined, { shallow: true })}>
                                    All Orders
                                </Nav.Item>
                                <Nav.Item
                                    eventKey="5"
                                    icon={<AlipayIcon color="#3498FF" />}
                                    onClick={() => router.push('/dashboard/waiting-assign', undefined, { shallow: true })}>
                                    Available Orders
                                </Nav.Item>
                                <Nav.Item
                                    eventKey="8"
                                    icon={<PeoplesIcon color="#3498FF" />}
                                    onClick={() => router.push('/dashboard/in-progress', undefined, { shallow: true })}>
                                    Active Orders
                                </Nav.Item>
                                <Nav.Item
                                    eventKey="9"
                                    icon={<ExploreIcon color="#3498FF" />}
                                    onClick={() => router.push('/dashboard/approved', undefined, { shallow: true })}>
                                    Approved
                                </Nav.Item>
                                <Nav.Item
                                    eventKey="10"
                                    icon={<ExploreIcon color="#3498FF" />}
                                    onClick={() => router.push('/dashboard/rejected', undefined, { shallow: true })}>
                                    Rejected
                                </Nav.Item>
                                <Nav.Item
                                    eventKey="11"
                                    icon={<LocationIcon color="#3498FF" />}
                                    onClick={() => router.push('/dashboard/pending', undefined, { shallow: true })}>
                                    Pending
                                </Nav.Item>
                                <Nav.Item
                                    eventKey="12"
                                    icon={<CheckOutlineIcon color="#3498FF" />}
                                    onClick={() => router.push('/dashboard/cancelled', undefined, { shallow: true })}>
                                    Cancelled
                                </Nav.Item>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                    <NavToggle
                        expand={expand}
                        onChange={() => setExpand(!expand)} />
                </Sidebar>

                <Container>
                    <Header>
                        <Navbar
                            style={{ color: "black", fontSize: "16px", fontFamily: "Montserrat,Helvetica,Arial,serif" }}>
                            <Navbar.Brand href="#">
                                Dashboard
                            </Navbar.Brand>
                            <Nav>
                                <Nav.Item onClick={() => router.push('/dashboard/completed', undefined, { shallow: true })}>My Order</Nav.Item>
                                <Nav.Item onClick={() => router.push('/dashboard/create_order', undefined, { shallow: true })}>Create Order</Nav.Item>
                                <Nav.Item onClick={() => router.push('/settings/view', undefined, { shallow: true })}>Profile</Nav.Item>
                                <Nav.Item onClick={() => router.push('/dashboard/wallet', undefined, { shallow: true })}>Wallet</Nav.Item>
                            </Nav>
                            <Nav pullRight>
                                <Nav.Item
                                    icon={<Badge color="green" content={10}><NoticeIcon style={{ fontSize: "2em" }} /></Badge>} />
                                <Nav.Item
                                    icon={<Badge color="green" content={`$0.00`}><ShieldIcon style={{ fontSize: "2em" }} /></Badge>}
                                    onClick={() => router.push('/dashboard/wallet', undefined, { shallow: true })}
                                />
                                <Nav.Item
                                    icon={<PeoplesCostomizeIcon style={{ fontSize: "2em" }} />}
                                    onClick={() => router.push('/settings/view', undefined, { shallow: true })}
                                />
                                <Nav.Item>
                                    <center>
                                        <div style={{ textDecoration: "none" }}>{username}</div>
                                    </center>
                                </Nav.Item>
                                <Nav.Item
                                    onClick={handleLogout}
                                    icon={<OffIcon color="red" style={{ fontSize: "2em" }} />} />
                            </Nav>
                        </Navbar>
                    </Header>
                    <Content>{children}</Content>
                </Container>
            </Container>
        </div>
    );
};

export default OrderLayout;

const styles = {
    headerStyles: {
        display: "flex",
        gap: 1,
        paddingBottom: '10px',
        fontSize: 36,
        height: 56,
        background: 'linear-gradient(to right, #f44336, #3CB371)',
        color: ' #fff',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    iconStyles: {
        width: 56,
        height: 56,
        padding: 18,
        lineHeight: '56px',
        textAlign: 'center'
    },
    logo: {
        marginTop: "5px",
        '.image': {
            borderTopLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            height: '30px',
            width: '30px'
        }
    }
}
