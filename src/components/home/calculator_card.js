/** @jsx jsx */
import React from "react";
import { jsx } from 'theme-ui';
import { Button, Select, Box, Text, Image } from 'theme-ui';
import { Grid, Row, Col } from "rsuite";
import { useRouter } from "next/router";
import Head from 'next/head';
import Mcafee from 'assets/footer/mcafee.png';

const CalculatorCard = ({
    myLevel, myService, myType,
    myUrgency, myPages, levelsData, pagesData, serviceData,
    typesData, urgenciesData, parseServiceSelected,
    parseLevelSelected, parsePageSelected,
    parseTypeSelected, parseUrgencySelected
}) => {
    const router = useRouter();
    return (
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <title>Top Rated Professors</title>
            </Head>
            <Box sx={styles.calculator} as="form" onSubmit={(e) => e.preventDefault()}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <h4>Calculate Price</h4>
                    <Image src={Mcafee} alt="mcafee" sx={styles.calculator.mcafee} />
                </Box>
                <Grid fluid>
                    <Row>
                        <Col xs={24} sm={5} md={5}>
                            <label style={{ fontWeight: 600, marginTop: "10px" }}>Service:</label>
                        </Col>
                        <Col xs={24} sm={19} md={19}>
                            <Select sx={{ border: '1px solid #becad6', fontFamily: 'Quicksand, sans-serif' }} onChange={parseServiceSelected} name="sound" id="sound" mb={3}>
                                {serviceData?.map((service) => (
                                    <option key={service.id} value={JSON.stringify(service)}>{service.name}</option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                </Grid>
                <Grid fluid>
                    <Row>
                        <Col xs={24} sm={5} md={5}>
                            <label style={{ marginRight: "20px", fontWeight: 600 }}>Type of Paper:</label>
                        </Col>
                        <Col xs={24} sm={19} md={19}>
                            <Select sx={{ border: '1px solid #becad6', fontFamily: 'Quicksand, sans-serif' }} onChange={parseTypeSelected} mb={3}>
                                {typesData?.map((type) => (
                                    <option key={type.id} value={JSON.stringify(type)}>{type.name}</option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                </Grid>
                <Grid fluid>
                    <Row>
                        <Col xs={24} sm={5} md={5}>
                            <label style={{ fontWeight: 600, marginTop: "10px" }}>Urgency:</label>
                        </Col>
                        <Col xs={24} sm={19} md={19}>
                            <Select sx={{ border: '1px solid #becad6', fontFamily: 'Quicksand, sans-serif' }} onChange={parseUrgencySelected} mb={3}>
                                {urgenciesData?.map((urgency) => (
                                    <option key={urgency.id} value={JSON.stringify(urgency)}>{urgency.name}</option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                </Grid>
                <Grid fluid>
                    <Row>
                        <Col xs={24} sm={5} md={5}>
                            <label style={{ marginTop: "10px", fontWeight: 600 }}>Pages:</label>
                        </Col>
                        <Col xs={24} sm={19} md={19}>
                            <Select sx={{ border: '1px solid #becad6', fontFamily: 'Quicksand, sans-serif' }} onChange={parsePageSelected} mb={3}>
                                {pagesData?.map((page) => (
                                    <option key={page.id} value={JSON.stringify(page)}>{page.name}</option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                </Grid>
                <Grid fluid>
                    <Row>
                        <Col xs={24} sm={5} md={5}>
                            <label style={{ marginTop: "10px", fontWeight: 600 }}>Level:</label>
                        </Col>
                        <Col xs={24} sm={19} md={19}>
                            <Select sx={{ border: '1px solid #becad6', fontFamily: 'Quicksand, sans-serif' }} onChange={parseLevelSelected} mb={3}>
                                {levelsData?.map((level) => (
                                    <option key={level.id} value={JSON.stringify(level)}>{level.name}</option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                </Grid>
                <Box>
                    <Text><center><strong>Minimum Price
                        : $ {(myService * myType * myUrgency * myPages * myLevel).toFixed(2)}</strong></center></Text>
                </Box>
                <Button onClick={() => { router.push('dashboard/completed'); localStorage.minimumPrice = (myService * myType * myUrgency * myPages * myLevel).toFixed(2) }} className="continue__button" variant="secondary">Continue</Button>
            </Box>
        </div>
    );
};

const styles = {
    calculator: {
        width: ['100%', null, '70%'],
        ml: ["15px", null, '0px'],
        mt: '20px',
        padding: "20px",
        border: '1px solid whitesmoke',
        borderRadius: '10px',
        fontSize: "16px",
        transition: 'all 0.3s',
        backgroundColor: 'white',
        boxShadow: '0 1px 0px 1px rgba(0, 0, 0, 0.2)',
        opacity: 0.96,
        '.continue__button': {
            backgroundColor: 'secondary',
            display: 'block',
            width: '100%',
            border: '1px solid whitesmoke',
            borderRadius: '10px',
            outline: 0,
            color: 'background'
        },
        mcafee: {
            width: ['50px', null, '100px']
        }
    },
}

export default CalculatorCard;