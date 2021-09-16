import React, {Component} from 'react';
import {Image, Box, Grid, Text, Heading, Card, jsx} from 'theme-ui';
import Satisfaction from "../assets/satisfaction.png";
import Original from "../assets/original-stamp.png";
import WallClock from "../assets/wall-clock.png";
import Writers from "../assets/writers.png";
import Support from "../assets/customer-service.png";
import Email  from "../assets/email.png";
import Safety from "../assets/safety.png";
import Confidence from "../assets/confidence.png";
import Graduate from "../assets/graduate.png";
import Envelop from "../assets/envelope.png";
import Check from "../assets/check.png";

const data = [
    {
        title: "On-Time Delivery",
        image: WallClock,
        text: "Time is a crucial aspect of anyone’s life. As such, we never compromise" +
        "when it comes to the deadline."
    },
    {
        title: "500+ Writers",
        image: Writers,
        text: "We have over 500 writers experienced in different fields and subjects. " +
            "Out of the 500+, 153 are professors,"
    },
    {
        title: "24/7 Customer Support",
        image: Support,
        text: "Our world-class customer support team is always available" +
        "at all times to respond to your queries."
    },
    {
        title: "Email and SMS Updates",
        image: Email,
        text: "We always inform you about the progress of your order right" +
            "from the start to completion through emails and SMS."
    },
    {
        title: "Plagiarism Free Work",
        image: Safety,
        text: "Our writers always write their work from scratch and always" +
            "reference any materials they use to do their research."
    },
    {
        title: "100% Money-Back Guarantee",
        image: Confidence,
        text: "You can always get 100% of your money back if you do not" +
        "get the service you wanted."
    },
    {
        title: "Top Quality Work",
        image: Graduate,
        text: "We always deliver the best to the customer. " +
            "You come to us for help because you trust that we will " +
            "make your grade. We never disappoint."
    },
    {
        title: "100% Confidentiality",
        image: Envelop,
        text: "We value your privacy and as such, protect your identity. " +
            "We guarantee 100% anonymity whenever you visit our website."
    },
    // {
    //     title: "Unlimited free revisions",
    //     image: Envelop,
    //     text: "Don’t like what you get? Ask for free revisions until you are 100% " +
    //         "satisfied with the work."
    // }
]

class WhyChooseUs extends Component {
    render() {
        return (
            <section id='why-choose-us'  sx={{variant: 'section.whyChooseUs'}}>
                <Grid sx={styles.grid}>
                    <Box sx={{ml: '20px'}}>
                        <h1 style={{textAlign: 'center'}}>Why Choose Us</h1>
                        <Text>
                            Students go through a lot of challenges. Imagine having five assignments, all due tonight.
                            I bet you would break down as you figure out a way of handling all of them.
                            We understand the challenges students face and, as such always seek to help whenever we can.
                            Sometimes the fear of failing makes you not sure of what you are writing.
                            Our experts take away that fear and handle the assignments for you.
                            The final product is always topnotch and ready for submission.
                            You only need to add your student details, and you are done.
                            Did you have fun the whole weekend and forgot that you had an assignment due on Monday?
                            Don’t panic. As soon as you remember you have an assignment, come to us place your order and relax.
                            Our experts are experienced in working even under the tightest deadlines. We always have a solution for you.

                            The experience within our team guarantees you of quality work, 100% original and on-time delivery.
                            You would have no reason to panic if you hire a professor to do your homework.
                            We boast of helping over 100,000 students from across the globe because they trust us with their assignments and we never fail to deliver.
                        </Text>
                        <Text>
                            <Heading>Features of Our Assignment Help :</Heading>
                            <Grid sx={styles.featureGrid}>
                                {data.map((item, index) => (
                                    <Box key={index}>
                                        <Heading>{item.title}</Heading>
                                        <Box  sx={styles.assignment}>
                                            <Image src={item.image} alt='wall_clock' sx={styles.image}/>
                                            <Text>{item.text}</Text>
                                        </Box>
                                    </Box>
                                ))}
                            </Grid>
                        </Text>
                    </Box>
                    <Box>
                        <Card sx={styles.card}>
                            <h2 style={{textAlign: 'center', fontFamily: 'Quicksand, sans-serif'}}>Why Top Rated Professors</h2>
                            <ul style={{listStyle: 'none', textAlign: 'center', lineHeight: 2.5, marginTop: '-20px'}}>
                                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <Image src={Check} alt="deadline" sx={styles.cardImage}/>
                                    <li>Any Deadline - Any Subject</li>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <Image src={Check} alt="deadline" sx={styles.cardImage}/>
                                    <li>Detailed Writer Profiles</li>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <Image src={Check} alt="deadline" sx={styles.cardImage}/>
                                    <li>Chat With Your Writer</li>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <Image src={Check} alt="deadline" sx={styles.cardImage}/>
                                    <li>Plagiarism Free Papers</li>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <Image src={Check} alt="deadline" sx={styles.cardImage}/>
                                    <li>Email and SMS Notifications</li>
                                </Box>
                            </ul>
                            <Image src={Satisfaction} alt='100% original'/>
                        </Card>
                        <Card sx={styles.card}>
                            <h2 style={{textAlign: 'center'}}>100% Money-Back Guarantee</h2>
                            <Image src={Original} alt='wall_clock'/>
                        </Card>
                    </Box>
                </Grid>
            </section>
        );
    }
}

export default WhyChooseUs;

const styles = {
        grid: {
            pt: [0, null, null, null, null, null, 2],
            pb: [0, null, null, null, null, null, 7],
            px: [5, 6, 0, null, 7, 8, 7],
            gridGap: [
                '40px 0',
                null,
                '45px 30px',
                null,
                '60px 50px',
                '70px 50px',
                null,
                '80px 90px',
            ],
            gridTemplateColumns: ['repeat(1,auto)', 'repeat(1,auto)', 'repeat(1,auto)', 'repeat(2,auto)',  'repeat(2,auto)'],
        },
        card: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: ['100%', null, '100%'],
            borderWidth: '1px',
            borderStyle: 'solid',
            backgroundColor: '#ffffff',
            boxShadow: '10px 10px 10px 10px rgba(38, 78, 118, 0.1)',
            borderColor: 'rgba(0, 0, 0, 0.125)',
            borderRadius: '10px',
            ml: [0, null, 5],
            mt: [0, null, 4],
            mb:[6, null, 0],
            opacity: 2,
            },
        image: {
            width: '30%',
            height: '15%'
        },
        assignment: {
            display: 'flex',
            justifyContent:'center',
            gap: '0.5em',
        },
        featureGrid: {
            pb: [0, null, null, null, null, null, 8],
            px: [5, 6, 0, null, 7, 8, 7],
            gridGap: ['10px 0', null, '15px 10px', null, '10px 10px', '10px 10px', null, '10px 10px'],
            gridTemplateColumns: ['repeat(1,auto)', 'repeat(1,auto)', 'repeat(1,auto)', 'repeat(2,auto)',  'repeat(2,auto)'],
        },
        cardImage: {
            width: '25px',
            height: '25px',
            mr: [1, null, 5],
        },
    }