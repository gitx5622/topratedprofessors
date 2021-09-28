/** @jsx jsx */
import { jsx, Flex, Button } from 'theme-ui';
import { useRouter } from 'next/router';
import { keyframes } from '@emotion/react';
import { Link } from 'react-scroll';
import MobileDrawer from '../../header/mobile-drawer';
import menuItems from './orderHeaderData';
import { AiOutlineLogout } from 'react-icons/ai';
import { Alert } from 'theme-ui'
import {logoutUser} from "../../../dataStore/actions/userLogoutAction";
import {useDispatch} from "react-redux";

const OrderHeader  = ({ className }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleLogout = () => {
        const sessionID = localStorage.sessionID
        if (sessionID) {
            logoutUser(dispatch, sessionID);
            localStorage.clear();
            router.push('/user/login');
        }else {
            <Alert>
                You cannot logout user - You still have an active Session
                <Close ml="auto" mr={-2} />
            </Alert>
        }
    }
    return (
        <header sx={styles.header} className={className}>
            <Flex as="nav" sx={styles.nav}>
                {menuItems.map((menuItem, i) => (
                    <Link
                        activeClass="active"
                        to={menuItem.path}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        key={i}
                    >
                        {menuItem.image} {menuItem.label}
                    </Link>
                ))}
            </Flex>
            <Button className="donate__btn" onClick={() => handleLogout()}  variant="secondary" aria-label="Get Started"><AiOutlineLogout/>  Logout</Button>
            <MobileDrawer/>
        </header>
    );
}

export default OrderHeader;

const positionAnim = keyframes`
  from {
    position: fixed;
    opacity: 1;
  }

  to {
    position: absolute;
    opacity: 1;
    transition: all 0.4s ease;
  }
`;

const styles = {
    header: {
        display: 'flex',
        pl: '20px',
        pr: '20px',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'text',
        fontWeight: 'body',
        py: 1,
        width: '76%',
        position: 'absolute',
        top: 0,
        marginLeft: '-8px',
        left: '24%',
        borderRadius: '10px',
        backgroundColor: 'primary',
        transition: 'all 0.4s ease',
        animation: `${positionAnim} 0.4s ease`,
        '@media screen and (max-width:768px)': {
            width: '100%',
            left: 0,
        },
        '.donate__btn': {
            backgroundColor: 'secondary',
            color: 'white',
            flexShrink: 0,
            mr: [15, 20, null, null, 0],
            ml: ['auto', null, null, null, 0],
            '@media screen and (max-width:768px)': {
            },
            '&:hover': {
                backgroundColor: 'white',
                color: 'black',
            },
        },
        '&.sticky': {
            position: 'fixed',
            backgroundColor: 'secondary',
            color: '#000000',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.06)',
            py: 1,
            'nev > a': {
                color: 'text',
            },
            '.donate__btn': {
                backgroundColor: 'primary',
                color: "black",
                '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                },
            },
            a: {
                '&:sticky': {
                    color: 'white',
                },
            }
        },
    },
    nav: {
        mx: 'auto',
        display: 'none',
        '@media screen and (min-width: 1024px)': {
            display: 'block',
        },
        a: {
            fontSize: 2,
            fontWeight: 'body',
            px: 5,
            cursor: 'pointer',
            lineHeight: '1.2',
            transition: 'all 0.15s',
            '&:hover': {
                color: 'white',
            },
            '&.active': {
                color: 'white',
            },
        },
    },
};
