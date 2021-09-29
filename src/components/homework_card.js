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
            <Text>{content}</Text>
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
        fontSize: ['16px', null, '20px'],
    },
    number: {
        fontSize: [30, 36, 40],
        ml: [0, null, 5],
        fontWeight: 600,
        color: 'secondary',
    }
}