import React from 'react';
import Customers from '../components/customers';
import AddCustomer from '../components/addcustomer';

export default function example3() {
    return (
        <div>
            <h4 className="text-muted">EXAMPLE PAGE 3</h4>
            <AddCustomer />
            <Customers />
        </div>
    );
}
