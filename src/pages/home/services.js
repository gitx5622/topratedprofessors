import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../../theme';
import Layout from 'components/home/layout';
import FagsSection from '../../sections/fags';

const Services = () => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Layout>
                    <FagsSection/>
                </Layout>
            </ThemeProvider>
        </div>
    )
}
export default Services;
