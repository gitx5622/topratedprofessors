import React, {useEffect} from 'react';
import Dashboard from "../../components/admin/dashboard";

const EditSetting = () => {
    useEffect(() => {
        try {
            JSON.parse(localStorage.currentUser);
        } catch (error) {
            localStorage.clear();
            window.location.replace('/user/login');
        }
    }, []);
    return (
        <Dashboard page='settings' section='edit'/>
    );
};

export default EditSetting;