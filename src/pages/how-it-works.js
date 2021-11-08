import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import Layout from 'components/home/layout';

const HowItWorks = () => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Layout>
                    <HowItWorks/>
                </Layout>
            </ThemeProvider>
        </div>
    )
}
export default HowItWorks;
