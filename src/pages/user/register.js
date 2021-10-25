/** @jsx jsx */
import {jsx, Box, Button, Label, Input, Image, Text, Alert, Close} from 'theme-ui';
import Head from 'next/head';
import {useState, useReducer, useEffect} from 'react';
import PatternBG from "../../assets/register.png";
import {RegisterUser} from "../../dataStore/actions/userRegistrationAction";
import checkDetailsReducer, {initialCheckDetailsState} from "../../dataStore/reducers/checkDetailsReducer";
import {useRouter} from "next/router";
import {BiArrowBack} from "react-icons/bi";
import Link from "next/link";

export default function Register() {
    const router = useRouter();
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
            RegisterUser(dispatchCheckDetails, bodyData)
        } else {
            dispatchCheckDetails({
                type: 'ERROR',
                errorMessage: 'Make sure all the fields all filled',
            });
        }
    };

    useEffect(() => {
        const user = localStorage.currentUser && JSON.parse(localStorage.currentUser);
        if (user){
            router.push('/dashboard/completed');
        } else {
            localStorage.clear();
        }
    }, [dispatchCheckDetails, router]);

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
                    <Box sx={styles.formLogin} as="form" onSubmit={handleRegisterUser}>
                        <center>
                            <h3 sx={{fontFamily: 'Quicksand, sans-serif'}}>Welcome to TopRatedProfessors</h3><br/>
                            <Button sx={{background: "#17a2b8", display: 'block',width: '100%', borderColor: '#17a2b8'}}
                                    onClick={()=> router.push("/")} block theme="info"><BiArrowBack/> Go Home</Button><br/>
                            {checkDetailsData.errorMessage && (
                                <Alert sx={{background: 'red', mt:'10px'}}>
                                {checkDetailsData.errorMessage }
                                <Close ml="auto" mr={-2} />
                            </Alert>
                            )}
                        </center><br/>
                        <h3 sx={{textAlign: 'center', fontFamily: 'Quicksand, sans-serif'}}>Register</h3><br/>
                        <Box sx={styles.grid}>
                        <Box>
                            <Label sx={styles.formLogin.label} htmlFor="email">First Name</Label>
                            <Input
                                sx={styles.formLogin.input}
                                type="text"
                                name="first_name"
                                placeholder="FirstName"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </Box>
                        <Box>
                            <Label sx={styles.formLogin.label} htmlFor="password">Last Name</Label>
                            <Input
                                sx={styles.formLogin.input}
                                type="text"
                                name="last_name"
                                placeholder="LastName"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </Box>
                        <Box>
                            <Label sx={styles.formLogin.label} htmlFor="password">Username</Label>
                            <Input
                                sx={styles.formLogin.input}
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </Box>
                        <Box>
                            <Label sx={styles.formLogin.label} htmlFor="password">Email</Label>
                            <Input
                                sx={styles.formLogin.input}
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </Box>
                        <Box>
                            <Label sx={styles.formLogin.label} htmlFor="password">Password</Label>
                            <Input
                                sx={styles.formLogin.input}
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </Box>
                        <Box>
                            <Label sx={styles.formLogin.label} htmlFor="password">Password Confirmation</Label>
                            <Input
                                sx={styles.formLogin.input}
                                type="password"
                                name="password_confirmation"
                                placeholder="Password Confirmation"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </Box>
                    </Box>
                        <Button sx={styles.formLogin.login}>Register</Button>
                        <Text as='p'>Already have an account ? Login Here</Text>
                        <Button sx={styles.formLogin.register}><Link href='/user/login'><a>Login</a></Link></Button>
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
        height: '100%',
        a: {
            textDecoration: 'none',
            color: 'white',
        }
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: ['repeat(1,1fr)', 'repeat(2,1fr)',  'repeat(2,1fr)', 'repeat(2,1fr)'],
        gridGap: '1em',
    },
    formLogin: {
        wordWrap: 'break-word',
        padding: '30px',
        border: '1px solid #c9c9c9',
        boxShadow: t => `0 0 0 2px rgba(0, 0, 0, 0.2)`,
        borderRadius: '5px',
        background: '#f5f5f5',
        width: ['250px', '420px',],
        label: {
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 1,
            fontWeight: 'bold',
        },
        input: {
            borderColor: 'gray',
            mb: '10px',
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
