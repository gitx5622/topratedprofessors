/** @jsx jsx */
import {jsx, Flex, Button } from 'theme-ui';
import { useRouter } from 'next/router';
import { keyframes } from '@emotion/core';
import Link from 'next/link';
import MobileDrawer from '../../header/mobile-drawer';
import menuItems from './orderHeaderData';
import { AiOutlineLogout } from 'react-icons/ai';
import { Alert, Close } from 'theme-ui'
import {logoutUser} from "../../../dataStore/actions/userLogoutAction";
import {useDispatch} from "react-redux";
import Head from 'next/head';
import React from "react";

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
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
            </Head>
            <Flex as="nav" sx={styles.nav}>
                {menuItems.map((menuItem, i) => (
                    <Link href={menuItem.path}>
                       <a> {menuItem.image} {menuItem.label}</a>
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
        a: {
            fontSize: 2,
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 'body',
            textDecoration: 'none',
            color: 'black',
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
        '@media screen and (max-width:768px)': {
            width: '100%',
            left: 0,
        },
        '.donate__btn': {
            fontFamily: 'Quicksand, sans-serif',
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
                fontFamily: 'Quicksand, sans-serif',
                backgroundColor: 'primary',
                color: "black",
                '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                },
            },
            a: {
                fontFamily: 'Quicksand, sans-serif',
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
            fontFamily: 'Quicksand, sans-serif',
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
