import React from 'react';
import { Box } from 'theme-ui';
import WalletCard from "./components/wallet-card";

const Finances = ({section}) => {
    return (
        <div>
            <WalletCard
                section={section}
            />
        </div>
    );
};

export default Finances;