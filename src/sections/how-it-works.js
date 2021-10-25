/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Grid, Box, Heading } from 'theme-ui';
import SectionHeader from 'components/home/section-header';

import PatternBG from 'assets/patternBG.png';
import ArrowOdd from 'assets/arrowOdd.svg';
import ArrowEven from 'assets/arrowEven.svg';

const data = [
  {
    id: 1,
    title: 'We assign the writer',
    text:
      'Get your blood tests delivered at home collect a sample from the your blood tests.',
  },
  {
    id: 2,
    title: 'The writer prepares sources for your work',
    text:
      'Get your blood tests delivered at home collect a sample from the your blood tests.',
  },
  {
    id: 3,
    title: 'The writer completes your paper',
    text:
      'Get your blood tests delivered at home collect a sample from the your blood tests.',
  },
  {
    id: 4,
    title: 'The writer polishes your paper',
    text:
      'Get your blood tests delivered at home collect a sample from the your blood tests.',
  },
  {
    id: 5,
    title: 'We send the completed paper to you',
    text:
        'Get your blood tests delivered at home collect a sample from the your blood tests.',
  },
];

export default function HowItWorks() {
  return (
      <section id='how-it-works' sx={{variant: 'section.HowItWorks'}}>
        <Box sx={styles.workflow}>
            <SectionHeader
                title="How it works"
                isWhite={false}
            /><br/><br/>
            <Grid sx={styles.grid}>
              {data.map((item) => (
                  <Box key={item.id} sx={styles.card}>
                    <Box sx={styles.iconBox}>{`0${item.id}`}</Box>
                    <Box sx={styles.wrapper}>
                      <h4>{item.title}</h4>
                    </Box>
                  </Box>
              ))}
            </Grid>
        </Box>
      </section>
  );
}

const styles = {
  workflow: {
    backgroundColor: 'primary',
    backgroundImage: `url(${PatternBG})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    position: 'relative',
    mt: '-50px',
    px: 8,
    py: [7, null, 6, null, null, 7],
  },
  grid: {
    mb: -1,
    pt: 0,
    gridGap: [
      '35px 0',
      null,
      '45px 30px',
      null,
      '50px 25px',
      null,
      null,
      '50px 65px',
    ],
    gridTemplateColumns: [
      'repeat(1,1fr)',
      null,
      'repeat(3,1fr)',
      null,
      'repeat(5,1fr)',
    ],
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    textAlign: ['center', null, 'left'],
    width: ['100%', '80%', '100%'],
    mx: ['auto'],
    px: [4, null, null, 0],
    '&::before': {
      position: 'absolute',
      content: '""',
      top: 0,
      left: [0, null, null, null, null, 72, null, 90],
      backgroundRepeat: `no-repeat`,
      backgroundPosition: 'center center',
      width: 215,
      height: 60,
      '@media screen and (max-width:1220px)': {
        display: 'none',
      },
    },
    '&:nth-of-type(2n-1)::before': {
      backgroundImage: `url(${ArrowOdd})`,
    },
    '&:nth-of-type(2n)::before': {
      backgroundImage: `url(${ArrowEven})`,
      top: 17,
    },
    '&:last-child::before': {
      display: 'none',
    },
  },

  iconBox: {
    width: ['50px', null, '60px', null, null, '70px'],
    height: ['50px', null, '60px', null, null, '70px'],
    flexShrink: 0,
    borderRadius: [15, null, 23, null, null, 30],
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    mb: [5, null, null, null, null, 6],
    mx: ['auto', null, 0],
    fontSize: [6, null, 7, null, null, '30px'],
    fontWeight: 700,
    justifyContent: 'center',
    color: '#234582',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    mt: '-5px',
    title: {
      fontFamily: 'body',
      fontSize: [3, null, 4, null, null, 5],
      color: 'white',
      lineHeight: [1.4, null, null, null, null, 1.55],
      pr: [0, null, null, null, null, 2],
      mb: [2, 3],
    },
  },
};
