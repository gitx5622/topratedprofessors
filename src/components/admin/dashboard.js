import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import Layout from "../layout";
import CompletedOrders from "../orders/completedOrders";
import AllOrders from "../orders/allOrders";
import WaitingAssign from "../orders/waitingAssign";
import ApprovedOrders from "../orders/approvedOrders";
import PendingOrders from "../orders/pendingOrders";

const Dashboard = ({page, section}) => {
    const renderOrderPages = () => {
        switch (section) {
            case 'completed':
                return (
                    <CompletedOrders
                        section={section}
                    />
                );
            case 'all-orders':
                return (
                    <AllOrders
                        section={section}
                    />
                );
            case 'waiting-assign':
                return (
                    <WaitingAssign
                        section={section}
                    />
                );
            case 'rejected':
                return (
                    <WaitingAssign
                        section={section}
                    />
                );
            case 'approved':
                return (
                    <ApprovedOrders
                        section={section}
                    />
                );
            case 'pending':
                return (
                    <PendingOrders
                        section={section}
                    />
                );
            case undefined:
                return '';
            default:
                return '';
        }
    }
    return (
        <div>
            <ThemeProvider theme={theme}>
            <Layout>
                {renderOrderPages()}
            </Layout>
            </ThemeProvider>
        </div>
    );
};

export default Dashboard;