/** @jsx jsx */
import { jsx, Box, Button, Label, Input, Grid, Image } from 'theme-ui';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loginUser } from "../../dataStore/actions/userLoginAction";
import PatternBG from "../../assets/login.svg";

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    });
    const [loginStatus, setLoginStatus] = useState({
        error: '',
        loading: false,
    });

    const handleUserLogin = e => {
        setLoginStatus(status => ({
            ...status,
            loading: true,
            error: '',
        }));
        e.preventDefault();
        const { email, password } = loginDetails;

        const bodyData = {
            email,
            password,
        };

        loginUser(dispatch, bodyData).then(response => {
            if (response.status === 200) router.push('/dashboard/completed');
            if (response.data.error_message)
                setLoginStatus({ loading: false, error: response.data.error_message });
        });
    };

    const handleInputChange = e => {
        e.persist();
        setLoginDetails(details => ({
            ...details,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const user = localStorage.currentUser && JSON.parse(localStorage.currentUser);
        if (user){
                    router.push('/dashboard/completed');
                } else {
                    localStorage.clear();
                }
    }, [dispatch, router]);

    return (
        <Box>
        <Box>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
            </Head>
        </Box>
            <Box sx={styles.login}>
                    <Box sx={styles.loginImage}>
                        <Image src={PatternBG} alt="" sx={styles.patternImage}/>
                    </Box>
                    <Box sx={styles.form}>
                        <center><h3 sx={{fontFamily: 'Quicksand, sans-serif'}}>Welcome to TopRatedProfessors</h3></center><br/>
                    <Box sx={styles.formLogin} as="form" onSubmit={handleUserLogin}>
                        <h3 sx={{textAlign: 'center', fontFamily: 'Quicksand, sans-serif'}}>Login</h3>
                        <div className="error-section mb-2">{loginStatus.error}</div>
                        <Label sx={styles.formLogin.label} htmlFor="email">Email</Label>
                        <Input
                            sx={styles.formLogin.input}
                            id="email"
                            type="email"
                            name="email"
                            value={loginDetails.email}
                            onChange={handleInputChange}
                        />
                        <Label sx={styles.formLogin.label} htmlFor="password">Password</Label>
                        <Input
                            sx={styles.formLogin.input}
                            id="password"
                            type="password"
                            name="password"
                            value={loginDetails.password}
                            onChange={handleInputChange}
                        />
                        <Button sx={styles.formLogin.submit}>Submit</Button>
                    </Box>
                    </Box>
            </Box>
        </Box>
    );
}

const styles = {
    login: {
        display: 'flex',
        '@media screen and (max-width:768px)': {
            display: 'flex',
            gap: '20px',
            flexDirection: 'column',
        },
    },
    grid: {
        pt: [0, null, null, null, null, null, 2],
        px: [5, 6, 0, null, 7, 8, 7],
        gridTemplateColumns: ['repeat(1,1fr)', 'repeat(2,1fr)',  'repeat(2,1fr)', 'repeat(2,1fr)'],
    },
    loginImage: {
        display: 'grid',
        height: '100%',
    },
    patternImage: {
        maxWidth: '100%',
        maxHeight: '100vh',
        margin: 'auto',
    },
    form: {
        margin: 'auto',
    },
    formLogin: {
        padding: '30px',
        border: '1px solid #c9c9c9',
        boxShadow: t => `0 0 0 2px rgba(0, 0, 0, 0.2)`,
        borderRadius: '5px',
        background: '#f5f5f5',
        width: ['250px', '420px',],
        display: 'block',
        label: {
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 1,
            fontWeight: 'bold',
        },
        input: {
            borderColor: 'gray',
            mb: '30px',
            borderRadius: '3px',
            width: '100%',
            '&:focus': {
                borderColor: 'primary',
                boxShadow: t => `0 0 0 2px rgba(0, 0, 0, 0.2)`,
                outline: 'none',
            },
        },
        submit: {
            margin: '10px 0 0 0',
            padding: '7px 10px',
            border: '1px solid #efffff',
            borderRadius: '3px',
            background: '#3085d6',
            width: '100%',
            fontSize: '15px',
            color: 'white',
            display: 'block'
        }
    },
}
