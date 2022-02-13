/** @jsx jsx */
import {jsx, Box, Button, Label, Input, Text, Image} from 'theme-ui';
import Head from 'next/head';
import Link from 'next/link';
import { Message } from 'rsuite';
import {useEffect, useReducer, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';
import { loginUser } from "../../dataStore/actions/userLoginAction";
import PatternBG from "../../assets/login.svg";
import checkDetailsReducer, {initialCheckDetailsState} from "../../dataStore/reducers/checkDetailsReducer";

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    });
    const [checkDetailsData, dispatchCheckDetails] = useReducer(
        checkDetailsReducer,
        initialCheckDetailsState
    );

    const handleUserLogin = e => {
        e.persist();
        e.preventDefault();
        const { email, password } = loginDetails;

        const bodyData = {
            email,
            password,
        };
        if(bodyData.email !== "" && bodyData.password !== ""){
            loginUser(dispatch, bodyData).then(response => {
                if (response.status === 200) router.push('/dashboard/all-orders');
            });
        }else {
            dispatchCheckDetails({
                type: 'ERROR',
                errorMessage: 'Make sure all the fields all filled',
            });
        }

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
                    router.push('/dashboard/all-orders');
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
                    <Box sx={styles.formLogin} as="form" onSubmit={handleUserLogin}>
                        <center><h3 sx={{fontFamily: 'Quicksand, sans-serif'}}>Welcome to TopRated Professors</h3><br/>
                            <Button sx={{background: "#17a2b8", display: 'block',width: '100%', borderColor: '#17a2b8'}} onClick={() => router.push('/')} block theme="info"><BiArrowBack/> Go Home</Button><br/>
                            {checkDetailsData.errorMessage && (
                                <Message style={{marginTop:"10px"}} closable type="error">
                                    {checkDetailsData.errorMessage }
                                </Message>
                            )}
                        </center><br/>
                        <h3 sx={{textAlign: 'center', fontFamily: 'Quicksand, sans-serif'}}>Login</h3>
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
                        <Button sx={styles.formLogin.login}>Login</Button><br/>
                        <Text as='p'>Don't have an account ? <Link href='/user/register'><a style={{color: 'blue'}}>Register Here</a></Link></Text>
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
        a: {
            textDecoration: 'none',
            color: 'white',
        }
    },
    grid: {
        pt: [0, null, null, null, null, null, 2],
        px: [5, 6, 0, null, 7, 8, 7],
        gridTemplateColumns: ['repeat(1,1fr)', 'repeat(2,1fr)',  'repeat(2,1fr)', 'repeat(2,1fr)'],
    },
    loginImage: {
        display: 'grid',
        maxHeight: '100vh',
        borderRight: '1px solid whitesmoke',
        '@media screen and (max-width:768px)': {
            display: 'none',
        },
    },
    patternImage: {
        maxWidth: '100%',
        height: '100vh',
        margin: 'auto',
    },
    form: {
        margin: 'auto',
        height: '100vh',
    },
    formLogin: {
        padding: '30px',
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
        login: {
            margin: '10px 0 0 0',
            padding: '7px 10px',
            border: '1px solid #efffff',
            borderRadius: '3px',
            background: '#17c671',
            width: '100%',
            fontSize: '15px',
            color: 'white',
            display: 'block'
        },
        register: {
            margin: '10px 0 0 0',
            padding: '7px 10px',
            border: '1px solid #efffff',
            borderRadius: '3px',
            background: '#FDAA8F',
            width: '100%',
            fontSize: '15px',
            color: 'white',
            display: 'block'
        }
    },
}
