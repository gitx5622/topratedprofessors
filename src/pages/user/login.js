/** @jsx jsx */
import { jsx, Box, Button, Label, Input, } from 'theme-ui';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loginUser } from "../../dataStore/actions/userLoginAction";
import PatternBG from "../../assets/back.png";

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
        <Box sx={styles.login}>
        <Box>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </Box>
            <Box sx={styles.forms} as="form" onSubmit={handleUserLogin}>
                <h3 sx={{textAlign: 'center'}}>Login</h3>
                <div className="error-section mb-2">{loginStatus.error}</div>
                <Label sx={styles.forms.label} htmlFor="email">Email</Label>
                <Input
                    sx={styles.forms.input}
                    id="email"
                    type="email"
                    name="email"
                    value={loginDetails.email}
                    onChange={handleInputChange}
                />
                <Label sx={styles.forms.label} htmlFor="password">Password</Label>
                <Input
                    sx={styles.forms.input}
                    id="password"
                    type="password"
                    name="password"
                    value={loginDetails.password}
                    onChange={handleInputChange}
                />
                <Button sx={styles.forms.submit}>Submit</Button>
            </Box>
        </Box>
    );
}

const styles = {
    login: {
        backgroundImage: `url(${PatternBG})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'relative',
        py: '160px'
    },
    forms: {
        margin: 'auto',
        padding: '30px',
        border: '1px solid #c9c9c9',
        borderRadius: '5px',
        background: '#f5f5f5',
        width: ['250px', '420px',],
        display: 'block',
        label: {
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
