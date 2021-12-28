import React from 'react';
import { useDispatch } from "react-redux";
import WalletCard from "./components/wallet-card";
import { executePayment } from "../../dataStore/actions/walletAction";
import { useRouter } from "next/router";

const Transactions = ({ section }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const payerID = router.query.PayerID;
    const paymentId = router.query.paymentId;

    React.useEffect(() => {
        const { id: userID } = JSON.parse(localStorage.currentUser);
        if (payerID && paymentId) {
            executePayment(dispatch, userID, paymentId, payerID).then(response => {
                window.history.replaceState(null, '', '/dashboard/transactions');
                window.location.reload();
            })
        }

    }, [dispatch, paymentId, payerID])
    return (
        <div>
            <WalletCard
                section={section}
            />
        </div>
    );
};

export default Transactions;