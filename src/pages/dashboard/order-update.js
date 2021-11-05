import React, {useEffect} from 'react';
import Dashboard from "../../components/admin/dashboard";

const OrderUpdate = () => {
    useEffect(() => {
        try {
            JSON.parse(localStorage.currentUser);
        } catch (error) {
            localStorage.clear();
            window.location.replace('/user/login');
        }
    }, []);
    return (
        <Dashboard page='dashboard' section='order-update'/>
    );
};

export default OrderUpdate;