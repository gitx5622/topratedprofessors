import React from 'react';
import CompletedOrders from "../orders/components/completedOrders";
import AllOrders from "../orders/components/allOrders";
import WaitingAssign from "../orders/components/waitingAssign";
import ApprovedOrders from "../orders/components/approvedOrders";
import PendingOrders from "../orders/components/pendingOrders";
import OrderLayout from "../orders/layout/order-layout";
import CreateOrder from "../orders/components/createOrder";
import Finances from "../wallet/finances";
import SettingEdit from "../settings/edit";
import SettingView from "../settings/view";
import OrderDetails from 'components/orders/components/order-details';

const Dashboard = ({ section }) => {
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
            case 'specific-order':
                return (
                    <OrderDetails
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
            <OrderLayout>
                {renderOrderPages()}
            </OrderLayout>
        </div>
    );
};

export default Dashboard;