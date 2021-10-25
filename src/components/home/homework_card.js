/** @jsx jsx */
import { Card, Heading, Text, jsx } from 'theme-ui';

const HomeworkCard = ({title,number, content}) => {
    return (
        <Card sx={styles.card}>
            {title && (
                <Heading sx={styles.title}>{title}</Heading>
            )}
            {number && (
                <Heading sx={styles.number}>{number}</Heading>
            )}
            <p>{content}</p>
        </Card>
    );
};

export default HomeworkCard;

const styles = {
    card: {
        backgroundColor: '#ffffff',
        boxShadow: '10px 10px 10px  10px rgba(38, 78, 118, 0.1)',
        borderRadius: '10px',
        padding: '20px',
        lineHeight: 1.5,
    },
    title: {
        fontFamily: 'body',
        lineHeight:1.5,
        fontSize: ['16px', null, '18px'],
    },
    number: {
        fontSize: [30, 36, 40],
        ml: [0, null, 5],
        fontWeight: 600,
        color: 'secondary',
    }
}