/** @jsx jsx */
import React, { useState } from 'react';
import Head from 'next/head';
import { Panel, Row, Col, Grid, Divider, Message, Button } from 'rsuite';
import { jsx, Box, } from 'theme-ui';
import Payment from '../../../assets/payment.png';
import {makePayment, userWalletSummary} from '../../../dataStore/actions/walletAction';
import { useDispatch, useSelector } from "react-redux";
import { BoxLoading } from 'react-loadingg';
import { useRouter } from 'next/router';

const WalletCard = ({ section }) => {
    const [payment, setPayment] = useState({
        order_amount: "",
        user_id: "",
    });

    const dispatch = useDispatch();
    const router = useRouter();

    const walletSelector = useSelector(state => state.walletState);
    const { user_wallet_summary } = walletSelector;
    const { user_balance, deposit, withdrawals } = user_wallet_summary;
    const { isLoading: walletLoading, errorMessage: walletError } = walletSelector;

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setPayment({
            ...payment,
            [name]: value,
        })
    };

    const makePaypalPayment = (credentials) => makePayment(dispatch, credentials);

    const handleMakePaymentSubmit = (event) => {
        event.preventDefault();
        const { id: userID } = JSON.parse(localStorage.currentUser);
        const bodyData = {
            user_id: parseInt(userID),
            order_amount: parseInt(payment.order_amount, 10)
        }
        if (payment.order_amount !== "") {
            makePaypalPayment(bodyData).then(response => {
                const links = response.data.links[1].href;
                if (response.status === 200) router.push(links)
            })
        } else {
            dispatch({
                type: 'MAKE_PAYMENT_ERROR',
                errorMessage: 'Make sure all the fields all filled',
            });
        }
    };
    React.useEffect(() => {
        const { id: userId } = JSON.parse(localStorage.currentUser);
        userWalletSummary(dispatch, userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    return (
        <Box>
            <Head>
                <title>Settings</title>
                <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet' />
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            {walletLoading && (
                    <BoxLoading />
            )}
                <Box sx={{ mt: "10px", mx: "10px" }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: '20px' }}>
                        <h3>My Wallet</h3>
                    </Box>
                    <Divider />
                    {walletError && (
                        <Message type="error">{walletError}</Message>
                    )}
                    <Panel shaded>
                        <Grid fluid>
                            <Row className="show-grid">
                                <Col xs={24} sm={24} md={12} style={{ borderRight: "1px solid whitesmoke" }}>
                                    <Panel style={{ borderRadius: "20px", marginBottom: "20px" }}>
                                        <center>
                                        <Message><h3>Balance </h3></Message><Divider/>
                                        <h3>${user_balance}</h3>
                                        <Divider/>
                                            <Grid fluid>
                                                <Row>
                                                    <Col xs={12} style={{borderRight:"1px solid whitesmoke"}}>
                                                        <Button color="cyan" appearance="ghost">Deposits</Button>
                                                        <br/> <h3>${deposit}</h3>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <Button color="cyan" appearance="ghost">Withdrawals</Button>
                                                        <br/><h3>${withdrawals}</h3>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </center>
                                    </Panel>
                                </Col>
                                <Col xs={24} sm={24} md={12} >
                                    <form onSubmit={handleMakePaymentSubmit} style={{ background: "whitesmoke", borderRadius: '20px', padding: "20px" }}>
                                        <center>
                                            <h3>Add funds to your account</h3><br />
                                            <h5>Amount (USD): (Min amount: $0.01)</h5><br />
                                            <input style={{ borderRadius: "5px", fontSize: "24px", border: "1px solid #444141", height: '40px', width: "80%" }} name="order_amount" onChange={handleChange} /><br /><br />
                                            <h5>Payment Methods</h5>
                                            <img src={Payment} width="100" alt="" /><br /><br />
                                            <p>
                                                By clicking proceed button, means I understand and agree to the Terms of Service , including the Privacy
                                                Policy and Refund Policy
                                            </p>
                                            <button style={{ background: "#17c671", color: "white", width: "80%", padding: "10px", borderRadius: "5px" }} type="submit">Proceed</button>
                                        </center>
                                    </form>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                    <Panel>
                        <h5>Trasanctions</h5><br />
                        <table style={styles.table}>
                            <tr>
                                <th style={styles.table.th}>ID</th>
                                <th style={styles.table.th}>Order Number</th>
                                <th style={styles.table.th}>Deadline</th>
                            </tr>
                            <tr>
                                <td style={styles.table.td}>ID</td>
                                <td style={styles.table.td}>Order Number</td>
                                <td style={styles.table.td}>Deadline</td>
                            </tr>
                        </table>
                    </Panel>
                </Box>
        </Box>
    );
};

export default WalletCard;

const styles = {
    table: {
        fontFamily: 'Quicksand, sans-serif',
        borderCollapse: 'collapse',
        width: '100%',
        td: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
        },
        th: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
            background: '#fdaa8f',
        }
    },
}
