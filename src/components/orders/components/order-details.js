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
                    <Box sx={{width: '40%', fontSize: '18px'}}>
                        <Box>  OrderID </Box>
                        <Box>  Service </Box>
                        <Box>  Urgency </Box>
                        <Box>  Client </Box>
                        <Box>  Sources </Box>
                        <Box>  Amount </Box>
                        <Box>  Subject </Box>
                        <Box>  Type </Box>
                        <Box><button style={{background: 'blue', padding: '10px', marginTop:"10px", color: 'white', borderRadius: '10px'}}>Edit Order</button></Box>
                        <Box><button style={{backgroundColor: '#FFB400', padding: '10px', marginTop:"20px", color: 'white', borderRadius: '10px'}}>Cancel Order</button></Box>
                    </Box>
                    <Box sx={{width: '10%'}}>
                        {/*<AiOutlineArrowRight style={{fontSize: '20px'}}/>*/}
                    </Box>
                    <Box sx={{width: '50%', fontSize: '18px'}}>
                        <Box>  {data.id} </Box>
                        <Box>  {data.service.name} </Box>
                        <Box> {data.urgency.name} </Box>
                        <Box>  {data.user.username} </Box>
                        <Box>  {data.source.name} </Box>
                        <Box>  {Math.round((data.amount + Number.EPSILON) * 100) / 100} </Box>
                        <Box>  {data.subject.name} </Box>
                        <Box>  {data.type.name} </Box>
                    </Box>
                </Box>
                <Box sx={{width: '23.33%', ml: '20px', fontSize: '18px'}}>
                    <Box>Style </Box>
                    <Box> Deadline </Box>
                    <Box>  Page </Box>
                    <Box>  Level </Box>
                    <Box>  Spacing </Box>
                    <Box>  Language </Box>
                    <Box>  Topic </Box>
                    <Box>  Instructions </Box>
                    <Box><button style={{background: 'blue', padding: '10px', marginTop:"10px", color: 'white', borderRadius: '10px'}}>Reserve Order</button></Box>
                    <Box><button style={{background: 'green', padding: '10px',marginTop:"20px", color: 'white',  borderRadius: '10px'}}>Pay via Paypal</button></Box>
                </Box>
                    <Box sx={{width: '10%'}}>
                        {/*<AiOutlineArrowRight style={{fontSize: '20px'}}/>*/}
                    </Box>
                <Box sx={{width: '33.33%', fontSize: '18px'}}>
                    <Box> {data.style.name} </Box>
                    <Box> {formatDate(data.deadline)} </Box>
                    <Box>  {data.page.name} </Box>
                    <Box>  {data.level.name} </Box>
                    <Box>  {data.spacing.name} </Box>
                    <Box>  {data.language.name} </Box>
                    <Box>  {data.topic} </Box>
                    <Box>  {data.instructions} </Box>
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