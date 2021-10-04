import { CgProfile } from 'react-icons/cg';
import { FaWallet } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { MdAddToQueue } from 'react-icons/md';
import { TiThMenuOutline } from 'react-icons/ti';

export default [
    {
        image: <TiThMenuOutline style={{fontSize: '20px'}}/>,
        path: '/dashboard/completed',
        label: 'My Orders',
    },
    {
        image: <MdAddToQueue style={{fontSize: '20px'}}/>,
        path: '/dashboard/create_order',
        label: 'Create Order',
    },
    {
        image: <FiSettings style={{fontSize: '20px'}}/>,
        path: '/settings/index',
        label: 'Settings',
    },
    {
        image: <FaWallet style={{fontSize: '20px'}}/>,
        path: '/dashboard/wallet',
        label: ' My Finances',
    },
    {
        image: <CgProfile style={{fontSize: '20px'}}/>,
        path: '/settings/view',
        label: 'Profile',
    },
];
