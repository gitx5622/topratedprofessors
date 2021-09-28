import React, {useEffect} from 'react';

const Index = () => {
    useEffect(() => {
        try {
            JSON.parse(localStorage.currentUser);
        } catch (error) {
            localStorage.clear();
            window.location.replace('/user/login');
        }
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default Index;