/** @jsx jsx */
import React, {useEffect} from "react";
import { useRouter } from "next/router";
import { jsx } from 'theme-ui';
import { Image, Grid, Box, Heading, Text, Button } from 'theme-ui';
import {useDispatch, useSelector} from "react-redux";
import Original from 'assets/original-stamp.png';
import Check from 'assets/check.png';
import ShapeLeft from 'assets/shape-left.png';
import ShapeRight from 'assets/shape-right.png';
import CalculatorCard from "../components/calculator_card";
import {getLevels} from "../dataStore/actions/levelsAction";
import {getTypes} from "../dataStore/actions/typesAction";
import {getUrgencies} from "../dataStore/actions/urgenciesAction";
import {getServices} from "../dataStore/actions/servicesAction";
import {getPages} from "../dataStore/actions/pagesAction";

export default function Banner() {
    const levelsSelector = useSelector(store => store.levelState);
    const { levels: levelsData } = levelsSelector;

    const servicesSelector = useSelector(store => store.serviceState);
    const { services: servicesData } = servicesSelector;

    const pagesSelector = useSelector(store => store.pageState);
    const { pages: pagesData } = pagesSelector;

    const typesSelector = useSelector(store => store.typeState);
    const { types: typesData } = typesSelector;

    const urgenciesSelector = useSelector(store => store.urgencyState);
    const { urgencies: urgenciesData } = urgenciesSelector;

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        getLevels(dispatch);
        getTypes(dispatch);
        getUrgencies(dispatch);
        getServices(dispatch);
        getPages(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const [selected, setSelected] = React.useState("");
    const [myservice, setmyservice] = React.useState(8);
    const [mytype, setmytype] = React.useState(1);
    const [myurgency, setmyurgency] = React.useState(1);
    const [mypages, setmypages] = React.useState(1);
    const [mylevel, setmylevel] = React.useState(1);
    console.log(selected);

    const parseServiceSelected = (event) => {
        const valueToParse = event.target.value;
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setmyservice(itemSelected.factor);
    };
    const parseTypeSelected = (event) => {
        const valueToParse = event.target.value;
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setmytype(itemSelected.factor);
    };
    const parseUrgencySelected = (event) => {
        const valueToParse = event.target.value;
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setmyurgency(itemSelected.factor);
    };
    const parsePageSelected = (event) => {
        const valueToParse = event.target.value;
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setmypages(itemSelected.factor);
    };
    const parseLevelSelected = (event) => {
        const valueToParse = event.target.value;
        const itemSelected = JSON.parse(valueToParse);
        setSelected(itemSelected);
        setmylevel(itemSelected.factor);
    };
  return (
      <section sx={styles.banner} id="home">
          <Grid sx={styles.banner.grid}>
                <Box sx={styles.banner.bannerCard}>
                    <Heading sx={styles.banner.mainTitle}>
                        Hire Experts to Do Your Assignment
                    </Heading>
                    <Box sx={styles.banner.buttonGroup}>
                        <Box sx={{lineHeight: 3.0}}>
                            <Text><Image src={Check} alt="checks" sx={styles.banner.checks}/> A+ Quality Paper</Text>
                            <Text><Image src={Check} alt="checks" sx={styles.banner.checks}/> 100% Written from Scratch</Text>
                        </Box>
                        <Box sx={{lineHeight: 3.0}}>
                            <Text><Image src={Check} alt="checks" sx={styles.banner.checks}/> Unlimited Free Revisions</Text>
                            <Text><Image src={Check} alt="checks" sx={styles.banner.checks}/> On Time Delivery </Text>
                        </Box>
                    </Box>
                    <Text sx={styles.banner.services}>We are the best custom essay writers online.</Text><br/>
                    <Heading sx={styles.banner.services}>100% SATISFACTION GUARANTEED</Heading>
                    <Image src={Original} alt='100% original' sx={styles.banner.originalImg}/>
                    <Box sx={styles.banner.buttonGroup}>
                        <Button className='buttons' onClick={() => router.push('/dashboard/completed')} >Dashboard</Button>
                        <Button className='buttons' onClick={() => router.push('/dashboard/completed')} >Order Now</Button>
                    </Box>
                </Box>
              <Box>
                  <CalculatorCard
                      myLevel={mylevel }
                      myPages={mypages}
                      myService={myservice}
                      myType={mytype}
                      myUrgency={myurgency}
                      levelsData={levelsData}
                      serviceData={servicesData}
                      pagesData={pagesData}
                      typesData={typesData}
                      urgenciesData={urgenciesData}
                      parsePageSelected={parsePageSelected}
                      parseServiceSelected={parseServiceSelected}
                      parseTypeSelected={parseTypeSelected}
                      parseLevelSelected={parseLevelSelected}
                      parseUrgencySelected={parseUrgencySelected}
                  />
              </Box>
          </Grid>
          <hr sx={{border: '1px solid rgba(0, 0, 0, 0.2)'}}/>
      </section>
  );
}

const styles = {
  banner: {
      pt: ['40px', '45px', '55px', '70px', null, null, '80px', '115px'],
      pb: [2, null, 0, null, 2, 0, null, 5],
      position: 'relative',
      zIndex: 2,
      '&::before': {
          position: 'absolute',
          content: '""',
          bottom: 6,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: -1,
          backgroundImage: `url(${ShapeLeft})`,
          backgroundRepeat: `no-repeat`,
          backgroundPosition: 'bottom left',
          backgroundSize: '36%',
      },
      '&::after': {
          position: 'absolute',
          content: '""',
          bottom: '40px',
          right: 0,
          height: '100%',
          width: '100%',
          zIndex: -1,
          backgroundImage: `url(${ShapeRight})`,
          backgroundRepeat: `no-repeat`,
          backgroundPosition: 'bottom right',
          backgroundSize: '32%',
      },
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
          gridTemplateColumns: ['repeat(1,1fr)', null, 'repeat(2,1fr)'],
      },
      bannerCard: {
          width: ['100%', null, '100%'],
          py: [2, null, null, null, null, null, 3],
          mr: [0, 2, 4, null, null, 6, 8, 10],
          ml: [2, null, null, null, null, null, 3],
          mt: [6, null, null, 5, null, null, 4 ],
          px: [2, null, null, 3, null, null, 4],
          border: '1px solid whitesmoke',
          borderRadius: '10px',
          transition: 'all 0.3s',
          backgroundColor: 'white',
          boxShadow: '0 1px 0px 1px rgba(0, 0, 0, 0.2)',
          opacity: 0.96,
      },
      mainTitle: {
          fontSize: [20,20, 22, 26, 30, 32,34,36],
      },
      buttonGroup: {
          display: 'flex',
          justifyContent: 'space-between',
          mx: [2, null, 4],
          py: [2, null, null, 3, null, null, 6],
          '.buttons' : {
              backgroundColor: 'secondary',
              border: '1px solid whitesmoke',
              borderRadius: '10px',
              outline: 0,
              color: 'background',
          },
      },
      services: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          lineHeight: 'body'
      },
      checks: {
        width: ['7%', null, '8%']
      },
      originalImg: {
          width: ['10%', null, '15%'],
          mt: ['-50px'],
          '@media screen and (max-width:568px)': {
              display: 'none',
          },
      },
  }
};