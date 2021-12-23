/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui';
import { Button, Dropdown } from 'rsuite';
import { useRouter } from 'next/router';
import { keyframes } from '@emotion/core';
import Link from 'next/link';
import Logo from 'components/home/logo';
import LogoDark from 'assets/logo.png';
import MobileDrawer from './mobile-drawer';
import USflag from '../../assets/usa.png';

const Header = ({ className }) => {
  const router = useRouter();
  return (
    <header sx={styles.header} className={className}>
      <Link href="/">
        <a><Logo src={LogoDark} href='/'/></a>
      </Link>
      <Flex as="nav" sx={styles.nav}>
          <Link href="/header/about-us">
            <a>About Us</a>
          </Link>
          <Link href="/header/reviews">
            <a>Reviews</a>
          </Link>
          <Link href="/header/why-us">
            <a>Why Us</a>
          </Link>
          <Link href="/header/services">
            <a>Services</a>
          </Link>
          <Link href="/">
            <a>
              <img src={USflag} alt="usflag" width="30" /> +1-814-250-1019
            </a>
          </Link>
      </Flex>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Button className="login__btn" size="sm" onClick={() => router.push('/user/login')} variant="secondary" aria-label="Get Started">Login</Button>
        <Button className="register__btn" size="sm" onClick={() => router.push('/user/register')} variant="secondary" aria-label="Get Started">Get Started</Button>
      </Box>
      <MobileDrawer />
    </header>
  );
}

export default Header;

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
    fontFamily: 'body',
    display: 'flex',
    pl: '20px',
    pr: '20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'text',
    fontWeight: 'body',
    py: 2,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'primary',
    transition: 'all 0.4s ease',
    animation: `${positionAnim} 0.4s ease`,
    '.login__btn': {
      borderRadius: '50px',
      fontSize: ['14px', null, null, 2],
      paddingLeft:"20px",
      paddingRight:"20px",
      paddingTop: "10px",
      paddingBottom: "10px",
      letterSpacings: '-0.15px',
      fontFamily: 'body',
      cursor: 'pointer',
      transition: 'all 0.25s',
      fontWeight: 500,
      backgroundColor: 'secondary',
      color: 'white',
      '&:focus': {
        outline: 0,
      },
      '@media screen and (max-width:768px)': {
        ml: ['-80px', '-40px', '-30px', '-30px', '20px'],
        mr: ['-80px', '-40px', '-30px', '-30px', '50px']
      },
      '&:hover': {
        backgroundColor: 'white',
        color: 'black',
      },
    },
    '.register__btn': {
      borderRadius: '50px',
      paddingLeft:"20px",
      paddingRight:"20px",
      paddingTop: "10px",
      paddingBottom: "10px",
      fontSize: ['14px', null, null, 1],
      letterSpacings: '-0.15px',
      fontFamily: 'body',
      cursor: 'pointer',
      transition: 'all 0.25s',
      fontWeight: 500,
      backgroundColor: 'secondary',
      color: 'white',
      '@media screen and (max-width: 768px)': {
        display: 'none',
      },
      '&:focus': {
        outline: 0,
      },
      '@media screen and (max-width:768px)': {
        ml: ['-80px', '-40px', '-30px', '-30px', '20px'],
        mr: ['-80px', '-40px', '-30px', '-30px', '50px']
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
      '.login__btn': {
        borderRadius: '45px',
        fontSize: ['14px', null, null, 2],
        letterSpacings: '-0.15px',
        paddingLeft:"20px",
        paddingRight:"20px",
        paddingTop: "10px",
        paddingBottom: "10px",
        fontFamily: 'body',
        cursor: 'pointer',
        lineHeight: 1.2,
        transition: 'all 0.25s',
        fontWeight: 500,
        '&:focus': {
          outline: 0,
        },
        backgroundColor: 'primary',
        color: "black",
        '&:hover': {
          backgroundColor: 'white',
          color: 'black',
        },
      },
      '.register__btn': {
        borderRadius: '45px',
        fontSize: ['14px', null, null, 2],
        letterSpacings: '-0.15px',
        paddingLeft:"20px",
        paddingRight:"20px",
        paddingTop: "10px",
        paddingBottom: "10px",
        fontFamily: 'body',
        cursor: 'pointer',
        lineHeight: 1.2,
        transition: 'all 0.25s',
        fontWeight: 500,
        '&:focus': {
          outline: 0,
        },
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
    '@media screen and (min-width: 1024px)': {
      display: 'block',
    },
    '@media screen and (max-width: 768px)': {
      display: 'none',
    },
    a: {
      color: "black",
      textDecoration: "none",
      fontSize: 1,
      fontWeight: 'body',
      px: 4,
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
