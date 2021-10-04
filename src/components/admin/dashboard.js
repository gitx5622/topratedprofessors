import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import CompletedOrders from "../orders/completedOrders";
import AllOrders from "../orders/allOrders";
import WaitingAssign from "../orders/waitingAssign";
import ApprovedOrders from "../orders/approvedOrders";
import PendingOrders from "../orders/pendingOrders";
import OrderLayout from "../orders/layout/order-layout";
import CreateOrder from "../orders/createOrder";
import Finances from "../wallet/finances";
import SettingEdit from "../settings/edit";
import SettingView from "../settings/view";

const Dashboard = ({section}) => {
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
            case 'wallet':
                return (
                    <Finances
                        section={section}
                    />
                );
            case 'edit':
                return (
                    <SettingEdit
                        section={section}
                    />
                );
            case 'view':
                return (
                    <SettingView
                        section={section}
                    />
                );
            case 'create_order':
                return (
                    <CreateOrder
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
            <OrderLayout>
                {renderOrderPages()}
            </OrderLayout>
            </ThemeProvider>
        </div>
    );
};

export default Dashboard;