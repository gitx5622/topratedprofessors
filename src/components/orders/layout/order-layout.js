/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import Sticky from 'react-stickynode';
import OrderHeader from "../header/order-header";

export default function OrderLayout({ children }) {
    const [isSticky, setIsSticky] = useState(false);

    const handleStateChange = (status) => {
        if (status.status === Sticky.STATUS_FIXED) {
            setIsSticky(true);
        } else if (status.status === Sticky.STATUS_ORIGINAL) {
            setIsSticky(false);
        }
    };

    return (
        <React.Fragment>
            <Sticky innerZ={1001} top={0} onStateChange={handleStateChange}>
                <OrderHeader className={`${isSticky ? 'sticky' : 'unSticky'}`} />
            </Sticky>
            <main id="content" sx={{ variant: 'layout.main', }} >
                {children}
            </main>
        </React.Fragment>
    );
}
