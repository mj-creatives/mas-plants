import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import CheckoutPage from './common/checkout-page';

const Checkout = () => {
    return (
        <>
            <CommonLayout parent="home" title="checkout">
                <CheckoutPage />
            </CommonLayout>
        </>
    )
}

export default Checkout;