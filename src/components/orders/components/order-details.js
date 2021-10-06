import {Box, Button, jsx} from "theme-ui";
import {formatDate} from "./dates";
import { AiOutlineArrowRight} from 'react-icons/ai';

export const ExpandedComponent = ({ data }) =>
    <Box sx={styles.orderDetails}>
        <h3>Order Details</h3>
        <Box sx={styles.lastOrder}>
            <Box sx={styles.lastOrder.header}>
                Last Order
            </Box>
            <Box>
                <Box sx={{display: 'flex', minHeight: '250px', width: '100%', borderBottom: '1px solid red',}}>
                <Box  sx={{display: 'flex', width: '33.33%', borderRight: '1px solid red', wrap: 'word-wrap'}}>
                    <Box sx={{width: '40%'}}>
                        <Box sx={{fontSize: '24px'}}>  OrderID </Box>
                        <Box sx={{fontSize: '24px'}}>  Service </Box>
                        <Box sx={{fontSize: '24px'}}>  Urgency </Box>
                        <Box sx={{fontSize: '24px'}}>  Client </Box>
                        <Box sx={{fontSize: '24px'}}>  Sources </Box>
                        <Box sx={{fontSize: '24px'}}>  Amount </Box>
                        <Box sx={{fontSize: '24px'}}>  Subject </Box>
                        <Box sx={{fontSize: '24px'}}>  Type </Box>
                    </Box>
                    <Box sx={{width: '60%'}}>
                        <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.id} </Box>
                        <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.service.name} </Box>
                        <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.urgency.name} </Box>
                        <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.user.username} </Box>
                        <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.source.name} </Box>
                        <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {Math.round((data.amount + Number.EPSILON) * 100) / 100} </Box>
                        <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.subject.name} </Box>
                        <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.type.name} </Box>
                    </Box>
                </Box>
                <Box sx={{width: '23.33%'}}>
                    <Box sx={{fontSize: '24px'}}>  Style </Box>
                    <Box sx={{fontSize: '24px'}}>  Deadline </Box>
                    <Box sx={{fontSize: '24px'}}>  Page </Box>
                    <Box sx={{fontSize: '24px'}}>  Level </Box>
                    <Box sx={{fontSize: '24px'}}>  Spacing </Box>
                    <Box sx={{fontSize: '24px'}}>  Language </Box>
                    <Box sx={{fontSize: '24px'}}>  Topic </Box>
                    <Box sx={{fontSize: '24px'}}>  Instructions </Box>
                    <Box><Button sx={{background: 'blue'}}>Edit Details</Button></Box>
                </Box>
                <Box sx={{width: '43.33%'}}>
                    <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.style.name} </Box>
                    <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {formatDate(data.deadline)} </Box>
                    <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.page.name} </Box>
                    <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.level.name} </Box>
                    <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.spacing.name} </Box>
                    <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.language.name} </Box>
                    <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.topic} </Box>
                    <Box sx={{fontSize: '24px'}}><AiOutlineArrowRight style={{fontSize: '22px'}}/>  {data.instructions} </Box>
                    <Box><Button sx={{background: 'green'}}>Reseve Now</Button></Box>
                </Box>
                </Box>
            </Box>
        </Box>
    </Box>;

const styles = {
    orderDetails: {
        mx: '50px',
    },
    lastOrder:{
        minHeight:'200px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        header: {
            padding: '10px',
            minHeight: '20px',
            background: '#273142',
            color: 'white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
        },
    },
    table : {
        fontFamily: 'arial, sans-serif',
        width: '100%',
        td: {
            borderColor: '#96D4D4',
        },
        th : {
            borderColor: '#96D4D4',
        },
        tr: {
            padding: '20px',
            borderColor: '#96D4D4',
        }
    }
};