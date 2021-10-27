import React from 'react';
import {  useDispatch } from "react-redux";
import WalletCard from "./components/wallet-card";
import {executePayment} from "../../dataStore/actions/walletAtion";
import {useRouter} from "next/router";

const Transactions = ({section}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const payerID = router.query.PayerID;
    const paymentId = router.query.paymentId;
    console.log(payerID);
    console.log(paymentId);

    React.useEffect(() => {
        const { id: userID } = JSON.parse(localStorage.currentUser);
        if (payerID && paymentId) {
            executePayment(dispatch, userID, paymentId, payerID).then(response => {
                if(response.status === 200)
               router.push('/dashboard/transactions', undefined, {shallow: true});
            })
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