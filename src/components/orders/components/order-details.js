import {Box, Button, jsx} from "theme-ui";
import {formatDate} from "./dates";
import { AiOutlineArrowRight} from 'react-icons/ai';

export const ExpandedComponent = ({ data }) =>
    <Box sx={styles.orderDetails}>
        <Box sx={styles.lastOrder}>
            <Box sx={styles.lastOrder.header}>
                <h3>Order Details</h3>
            </Box>
            <Box>
                <Box sx={{display: 'flex', minHeight: '250px', width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.2)',p:'10px'}}>
                <Box  sx={{display: 'flex', width: '50%', borderRight: '1px solid rgba(0, 0, 0, 0.2)',}}>
                    <Box sx={{width: '40%'}}>
                        <Box sx={{fontSize: '20px'}}>  OrderID </Box>
                        <Box sx={{fontSize: '20px'}}>  Service </Box>
                        <Box sx={{fontSize: '20px'}}>  Urgency </Box>
                        <Box sx={{fontSize: '20px'}}>  Client </Box>
                        <Box sx={{fontSize: '20px'}}>  Sources </Box>
                        <Box sx={{fontSize: '20px'}}>  Amount </Box>
                        <Box sx={{fontSize: '20px'}}>  Subject </Box>
                        <Box sx={{fontSize: '20px'}}>  Type </Box>
                        <Box><button sx={{background: 'blue', p: '10px', borderRadius: '10px'}}>Edit Order</button></Box>
                    </Box>
                    <Box sx={{width: '10%'}}>
                        {/*<AiOutlineArrowRight style={{fontSize: '20px'}}/>*/}
                    </Box>
                    <Box sx={{width: '50%'}}>
                        <Box sx={{fontSize: '20px'}}>  {data.id} </Box>
                        <Box sx={{fontSize: '20px'}}>  {data.service.name} </Box>
                        <Box sx={{fontSize: '20px'}}> {data.urgency.name} </Box>
                        <Box sx={{fontSize: '20px'}}>  {data.user.username} </Box>
                        <Box sx={{fontSize: '20px'}}>  {data.source.name} </Box>
                        <Box sx={{fontSize: '20px'}}>  {Math.round((data.amount + Number.EPSILON) * 100) / 100} </Box>
                        <Box sx={{fontSize: '20px'}}>  {data.subject.name} </Box>
                        <Box sx={{fontSize: '20px'}}>  {data.type.name} </Box>
                        <Box><button sx={{backgroundColor: 'blue', p: '10px', borderRadius: '10px'}}>Cancel Order</button></Box>
                    </Box>
                </Box>
                <Box sx={{width: '23.33%', ml: '20px'}}>
                    <Box sx={{fontSize: '20px'}}>  Style </Box>
                    <Box sx={{fontSize: '20px'}}>  Deadline </Box>
                    <Box sx={{fontSize: '20px'}}>  Page </Box>
                    <Box sx={{fontSize: '20px'}}>  Level </Box>
                    <Box sx={{fontSize: '20px'}}>  Spacing </Box>
                    <Box sx={{fontSize: '20px'}}>  Language </Box>
                    <Box sx={{fontSize: '20px'}}>  Topic </Box>
                    <Box sx={{fontSize: '20px'}}>  Instructions </Box>
                    <Box><button sx={{background: 'blue', p: '10px', borderRadius: '10px'}}>Reserve Order</button></Box>
                </Box>
                    <Box sx={{width: '10%'}}>
                        {/*<AiOutlineArrowRight style={{fontSize: '20px'}}/>*/}
                    </Box>
                <Box sx={{width: '33.33%'}}>
                    <Box sx={{fontSize: '20px'}}> {data.style.name} </Box>
                    <Box sx={{fontSize: '20px'}}> {formatDate(data.deadline)} </Box>
                    <Box sx={{fontSize: '20px'}}>  {data.page.name} </Box>
                    <Box sx={{fontSize: '20px'}}>  {data.level.name} </Box>
                    <Box sx={{fontSize: '20px'}}>  {data.spacing.name} </Box>
                    <Box sx={{fontSize: '20px'}}>  {data.language.name} </Box>
                    <Box sx={{fontSize: '20px'}}>  {data.topic} </Box>
                    <Box sx={{fontSize: '20px'}}>  {data.instructions} </Box>
                    <Box><button sx={{background: 'green', p: '10px', borderRadius: '10px'}}>Pay via Paypal</button></Box>
                </Box>
                </Box>
            </Box>
        </Box>
    </Box>;

const styles = {
    orderDetails: {
        ml: '50px',
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