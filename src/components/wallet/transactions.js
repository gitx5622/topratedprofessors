import React from 'react';
import { useDispatch } from "react-redux";
import WalletCard from "./components/wallet-card";
import { executePayment } from "../../dataStore/actions/walletAtion";
import { useRouter } from "next/router";

const Transactions = ({ section }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const payerID = router.query.PayerID;
    const paymentId = router.query.paymentId;

    React.useEffect(() => {
        localStorage.PID = payerID;
        localStorage.Pid = paymentId;
        window.history.replaceState(null, '', '/dashboard/transactions');
        const { id: userID } = JSON.parse(localStorage.currentUser);
        if (localStorage.PID && localStorage.Pid) {
            executePayment(dispatch, userID, paymentId, payerID);
        }
    }, [dispatch, payerID, paymentId])
    return (
        <div>
            <WalletCard
                section={section}
            />
        </div>
    );
};

export default Transactions;