import { Box, Grid, Heading, Text} from 'theme-ui';
import Lets from 'assets/footer/lets.png';
import Mcafee from 'assets/footer/mcafee.png';
import Paypal from 'assets/footer/paypal.png';
import Visa from 'assets/footer/visa.png';
import { useRouter } from "next/router";

export default function Footer() {
    const router = useRouter();
  return (
    <footer sx={styles.footer}>
          <Grid sx={styles.footer.grid}>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>COMPANY</Heading>
                  <center>
                  <ul style={{fontSize:"16px"}}>
                      <li onClick={() => router.push('/fags')}>FAQ</li>
                      <li  onClick={() => router.push('/reviews')}>Reviews</li>
                      <li  onClick={() => router.push('/about-us')}>About Us</li>
                      <li  onClick={() => router.push('/contact-us')}>Contact Us</li>
                  </ul>
                  </center>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>LEGAL</Heading>
                  <center>
                  <ul style={{fontSize:"16px"}}>
                      <li  onClick={() => router.push('/fags')}>Cookie Policy</li>
                      <li  onClick={() => router.push('/privacy_policy')}>Privacy Policy</li>
                      <li  onClick={() => router.push('/reviews')}>Ratings & Reviews</li>
                      <li  onClick={() => router.push('/terms_and_conditions')}>Terms and Conditions</li>
                  </ul>
                  </center>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>SERVICES</Heading>
                  <center>
                  <ul style={{fontSize:"16px"}}>
                      <li  onClick={() => router.push('/online-tutors')}>Online Tutors</li>
                      <li  onClick={() => router.push('/best-online-tutors')}>Best online tutors</li>
                      <li  onClick={() => router.push('/do-my-homework')}>Do my homework</li>
                      <li  onClick={() => router.push('/essay-writing-online')}>Essay writing online</li>
                  </ul>
                  </center>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>TOPRATED</Heading>
                  <center>
                  <ul style={{fontSize:"16px"}}>
                      <li  onClick={() => router.push('/paper-revision')}>Paper revision</li>
                      <li  onClick={() => router.push('/custom-writing')}>Custom writing</li>
                      <li  onClick={() => router.push('/english-essays')}>English essays</li>
                      <li  onClick={() => router.push('/plagiarism-report')}>Plagiarism report</li>
                  </ul>
                  </center>
              </Box>
          </Grid>
        <Grid>
                <ul sx={{display: 'flex', justifyContent: 'center',   '@media screen and (max-width:768px)': {display: 'none'},}}>
                    <li><img src={Lets} alt="lets_encrypt" width="200px" height="70px"/></li>
                    <li><img src={Mcafee} alt="mcafee" width="100px"/></li>
                    <li><img src={Paypal} alt="paypal" width="100px"/></li>
                    <li><img src={Visa} alt="visa" width="100px"/></li>
                </ul>
            <p style={{lineHeight: 1.5, textAlign: 'center',  color: '#A1A9B3', paddingLeft: "50px", paddingRight:"50px"}}>
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
            </p>
            <Text sx={{textAlign: 'center',color: '#A1A9B3'}}>Rated 4.8 / 5 based on Reviews. |All Reviews</Text>
            <Text sx={{textAlign: 'center',  color: '#A1A9B3'}}>All Rights Reserved</Text>
        </Grid>
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
          fontFamily: 'Quicksand, sans-serif',
          color: 'primary',
          ml: 4,
          textAlign:'center',
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
