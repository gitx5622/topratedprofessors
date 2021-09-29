/** @jsx jsx */
import { jsx, Box, Button, Label, Input, Image } from 'theme-ui';
import Head from 'next/head';
import {useState, useReducer, useEffect} from 'react';
import PatternBG from "../../assets/login.svg";
import {RegisterUser} from "../../dataStore/actions/userRegistrationAction";
import checkDetailsReducer, {initialCheckDetailsState} from "../../dataStore/reducers/checkDetailsReducer";

export default function Register() {
    const [registerValues, setregisterValues] = useState({
        first_name:'',
        last_name:'',
        username:'',
        email: '',
        password: '',
        password_confirmation:''
    });

    const [checkDetailsData, dispatchCheckDetails] = useReducer(
        checkDetailsReducer,
        initialCheckDetailsState
    );

    const handleChange  = (event) => {
        if (checkDetailsData.isError) {
            dispatchCheckDetails({ type: 'DEFAULT' });
        }
        setregisterValues({ ...registerValues, [event.target.name]: event.target.value });
    };
    const handleRegisterUser = e => {
        e.preventDefault();
        const bodyData = {
            first_name: registerValues.email,
            last_name: registerValues.last_name,
            username: registerValues.username,
            email: registerValues.email,
            password: registerValues.password,
            password_confirmation: registerValues.password_confirmation
        };
        if (registerValues.first_name !== '' && registerValues.last_name && registerValues.username &&
            registerValues.email && registerValues.password !== '' && registerValues.password_confirmation) {
            RegisterUser(dispatchCheckDetails, bodyData);
        } else {
            dispatchCheckDetails({
                type: 'ERROR',
                errorMessage: 'Make sure all the fields all filled',
            });
        }
    };
    useEffect(() => {
        try {
            JSON.parse(localStorage.currentUser);
            window.location.replace('/dashboard/completed')
        } catch (error) {
            localStorage.clear();
        }
    }, []);

    return (
        <Box>
            <Box>
                <Head>
                    <title>Register</title>
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
                    <Box sx={styles.formLogin} as="form" onSubmit={handleRegisterUser}>
                        <h3 sx={{textAlign: 'center', fontFamily: 'Quicksand, sans-serif'}}>Register</h3>
                        <Label sx={styles.formLogin.label} htmlFor="email">First Name</Label>
                        <Input
                            sx={styles.formLogin.input}
                            type="text"
                            name="first_name"
                            placeholder="FirstName"
                            className="form-control"
                            onChange={handleChange}
                        />
                        <Label sx={styles.formLogin.label} htmlFor="password">Last Name</Label>
                        <Input
                            sx={styles.formLogin.input}
                            type="text"
                            name="last_name"
                            placeholder="LastName"
                            className="form-control"
                            onChange={handleChange}
                        />
                        <Label sx={styles.formLogin.label} htmlFor="password">Username</Label>
                        <Input
                            sx={styles.formLogin.input}
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="form-control"
                            onChange={handleChange}
                        />
                        <Label sx={styles.formLogin.label} htmlFor="password">Email</Label>
                        <Input
                            sx={styles.formLogin.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-control"
                            onChange={handleChange}
                        />
                        <Label sx={styles.formLogin.label} htmlFor="password">Password</Label>
                        <Input
                            sx={styles.formLogin.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control"
                            onChange={handleChange}
                        />
                        <Label sx={styles.formLogin.label} htmlFor="password">Password Confirmation</Label>
                        <Input
                            sx={styles.formLogin.input}
                            type="password"
                            name="password_confirmation"
                            placeholder="Password Confirmation"
                            className="form-control"
                            onChange={handleChange}
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
