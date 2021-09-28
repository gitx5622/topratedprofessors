import { CgProfile } from 'react-icons/cg';
import { FaWallet } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { MdAddToQueue } from 'react-icons/md';
import { TiThMenuOutline } from 'react-icons/ti';

export default [
    {
        image: <TiThMenuOutline/>,
        path: 'home',
        label: 'My Orders',
    },
    {
        image: <MdAddToQueue/>,
        path: 'why-choose-us',
        label: 'Create Order',
    },
    {
        image: <FiSettings/>,
        path: 'writing-service',
        label: 'Settings',
    },
    {
        image: <FaWallet/>,
        path: 'how-it-works',
        label: ' My Finances',
    },
    {
        image: <CgProfile/>,
        path: 'reviews',
        label: 'Profile',
    },
];
