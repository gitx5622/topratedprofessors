import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Banner from '../sections/banner';
import TestimonialCard from "../sections/reviews";
import HowItWorks from "../sections/how-it-works";
import WhyChooseUs from "../sections/why-choose-us";
import HomeworkServices from "../sections/homework-services";
import CounterSection from "../sections/counter-section";
import Package from "../sections/package";
import Head from "next/head";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
        <Head>
            <title>Toprated Professors</title>
            <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        </Head>
        <Layout>
            <SEO title="Top Rated Professors" />
            <Banner />
            <TestimonialCard/>
            <HowItWorks/>
            <WhyChooseUs/>
            <CounterSection/>
            <HomeworkServices/>
            <Package/>
        </Layout>
    </ThemeProvider>
  );
}
