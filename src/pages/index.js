import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Banner from '../sections/banner';
import TestimonialCard from "../sections/reviews";
import HowItWorks from "../sections/how-it-works";
import WhyChooseUs from "../sections/why-choose-us";
import HomeworkServices from "../sections/homework-services";
import CounterSection from "../sections/counter-section";
import Package from "../sections/package";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
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
