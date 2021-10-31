import React, {useEffect} from 'react';
import Dashboard from "../../components/admin/dashboard";

const Home = () => {
    useEffect(() => {
        try {
            JSON.parse(localStorage.currentUser);
        } catch (error) {
            localStorage.clear();
            window.location.replace('/user/login');
        }
    }, []);
    return (
       <Dashboard page='dashboard' section='home'/>
    );
};

export default Home;