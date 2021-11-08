/** @jsx jsx */
import { jsx, Box, Grid, Heading, Text} from 'theme-ui';
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
                  <ul style={{fontSize:"16px", cursor:"pointer"}}>
                      <li onClick={() => { router.push('/home/fags'); scroll(0, 0)}}>FAQ</li>
                      <li  onClick={() => { router.push('/home/reviews'); scroll(0, 0)}}>Reviews</li>
                      <li  onClick={() => { router.push('/home/about-us'); scroll(0, 0)}}>About Us</li>
                      <li  onClick={() => { router.push('/home/contact-us'); scroll(0, 0)}}>Contact Us</li>
                  </ul>
                  </center>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>LEGAL</Heading>
                  <center>
                  <ul style={{fontSize:"16px", cursor:"pointer"}}>
                      <li  onClick={() => { router.push('/home/cookie-policy'); scroll(0, 0)}}>Cookie Policy</li>
                      <li  onClick={() => { router.push('/home/privacy-policy'); scroll(0, 0)}}>Privacy Policy</li>
                      <li  onClick={() => { router.push('/home/reviews'); scroll(0, 0)}}>Ratings & Reviews</li>
                      <li  onClick={() => { router.push('/home/terms-and-conditions'); scroll(0, 0)}}>Terms and Conditions</li>
                  </ul>
                  </center>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>SERVICES</Heading>
                  <center>
                  <ul style={{fontSize:"16px", cursor:"pointer"}}>
                      <li  onClick={() => { router.push('/home/online-tutors'); scroll(0, 0)}}>Online Tutors</li>
                      <li  onClick={() => { router.push('/home/best-online-tutors'); scroll(0, 0)}}>Best online tutors</li>
                      <li  onClick={() => { router.push('/home/do-my-homework'); scroll(0, 0)}}>Do my homework</li>
                      <li  onClick={() => { router.push('/home/essay-writing-online'); scroll(0, 0)}}>Essay writing online</li>
                  </ul>
                  </center>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>TOPRATED</Heading>
                  <center>
                  <ul style={{fontSize:"16px", cursor:"pointer"}}>
                      <li  onClick={() => { router.push('/home/paper-revision'); scroll(0, 0)}}>Paper revision</li>
                      <li  onClick={() => { router.push('/home/custom-writing'); scroll(0, 0)}}>Custom writing</li>
                      <li  onClick={() => { router.push('/home/english-essays'); scroll(0, 0)}}>English essays</li>
                      <li  onClick={() => { router.push('/home/plagiarism-report'); scroll(0, 0)}}>Plagiarism report</li>
                  </ul>
                  </center>
              </Box>
          </Grid>
        <Grid>
                <ul style={{display: 'flex', justifyContent: 'center','@media screen and (max-width: 768px)': {display: 'none'},}}>
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
