/** @jsx jsx */
import { jsx, Box, Container, Grid, Heading, Text} from 'theme-ui';
import Lets from 'assets/footer/lets.png';
import Mcafee from 'assets/footer/mcafee.png';
import Paypal from 'assets/footer/paypal.png';
import Visa from 'assets/footer/visa.png';

export default function Footer() {
  return (
    <footer sx={styles.footer}>
          <Grid sx={styles.footer.grid}>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>COMPANY</Heading>
                  <ul>
                      <li>FAQ</li>
                      <li>Reviews</li>
                      <li>About Us</li>
                      <li>Contact Us</li>
                      <li>Essay Writing App</li>
                      <li>Become a Freelance Writer</li>
                  </ul>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>LEGAL</Heading>
                  <ul>
                      <li>Cookie Policy</li>
                      <li>Privacy Policy</li>
                      <li>Ratings & Reviews</li>
                      <li>Terms & Conditions</li>
                      <li>Confidentiality Policy</li>
                      <li>Money Back Guarantee</li>
                  </ul>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>SERVICES</Heading>
                  <ul>
                      <li>Online Tutors</li>
                      <li>Best online tutors</li>
                      <li>Do my homework</li>
                      <li>Essay writing online</li>
                      <li>Maths & Statistics help</li>
                      <li>Dissertation/Thesis writing</li>
                  </ul>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>TOPRATED</Heading>
                  <ul>
                      <li>Paper revision</li>
                      <li>Custom writing</li>
                      <li>English essays</li>
                      <li>Plagiarism report</li>
                      <li>Urgent essay writing</li>
                      <li>Write my paper cheap</li>
                  </ul>
              </Box>
          </Grid>
        <Container>
                <ul sx={{display: 'flex', justifyContent: 'center',   '@media screen and (max-width:768px)': {display: 'none'},}}>
                    <li><img src={Lets} alt="lets_encrypt" width="200px" height="70px"/></li>
                    <li><img src={Mcafee} alt="mcafee" width="100px"/></li>
                    <li><img src={Paypal} alt="paypal" width="100px"/></li>
                    <li><img src={Visa} alt="visa" width="100px"/></li>
                </ul>
            <Text sx={{lineHeight: 1.5, textAlign: 'center',  color: '#A1A9B3', px: 8}}>
                Write My Paper for Cheap |
                Fast Essay Writing Service |
                Pay for Term Papers  |
                How to Write a Good Essay  |
                Buy Cheap Essays |
                Free Essays |
                Cheap Custom Essays |
                Research Papers for Sale |
                College Essay Writing Service |
                Term Paper Writing Service |
                Write My College Essay |
                Buy College Essays |
                Cheap Dissertation |
                Buy Apa Papers |
                Case Study Writing Service |
                Article Review Writing Service  |
                Research Proposal Writing Service
            </Text>
            <Text sx={{textAlign: 'center',color: '#A1A9B3'}}>Rated 4.8 / 5 based on Reviews. |All Reviews</Text>
            <Text sx={{textAlign: 'center',  color: '#A1A9B3'}}>All Rights Reserved</Text>
        </Container>
    </footer>
  );
}

const styles = {
  footer: {
      fontFamily: 'body',
      backgroundColor: '#242a35',
      grid: {
          pt: [0, null, null, null, null, null, 2],
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
          gridTemplateColumns: ['repeat(1,1fr)', 'repeat(2,1fr)',  'repeat(2,1fr)', 'repeat(4,1fr)'],
      },
      heading: {
          fontFamily: 'body',
          color: 'primary',
          ml: 4,
          fontSize: [25, null, 30],
          '@media screen and (max-width:768px)': {
              textAlign: 'center',
              ml: 0,
          },
      },
      ul: {
          listStyle: 'none',
          li: {
              lineHeight: 2.0,
              color: "white",
              p: [1, null, 1.9],
              '@media screen and (max-width:768px)': {
                  textAlign: 'center',
              },
          }
      }
  }
};
