/** @jsx jsx */
import { jsx, Box, Flex, Button } from 'theme-ui';
import { useRouter } from 'next/router';
import { keyframes } from '@emotion/react';
import { Link } from 'react-scroll';
import Logo from 'components/logo';
import LogoDark from 'assets/logo.png';
import MobileDrawer from './mobile-drawer';
import menuItems from './header.data';

const Header  = ({ className }) => {
  const router = useRouter();
  return (
      <header sx={styles.header} className={className}>
          <Logo src={LogoDark}/>
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
                    {menuItem.label}
                  </Link>
              ))}
            </Flex>
        <Box sx={{display: 'flex', gap: '10px'}}>
          <Button sx={{  '@media screen and (max-width:768px)': {
              display: 'none',
            },}} className="donate__btn" onClick={() => router.push('/user/login')} variant="secondary" aria-label="Get Started">Login</Button>
          <Button className="donate__btn" onClick={() => router.push('/user/register')}  variant="secondary" aria-label="Get Started">Get Started</Button>
        </Box>
          <MobileDrawer/>
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
    '.donate__btn': {
      backgroundColor: 'secondary',
      color: 'white',
      flexShrink: 0,
      mr: [15, 20, null, null, 0],
      ml: ['auto', null, null, null, 0],
      '@media screen and (max-width:768px)': {
        ml: ['-80px', '-40px', '-30px', '-30px', 0]
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
