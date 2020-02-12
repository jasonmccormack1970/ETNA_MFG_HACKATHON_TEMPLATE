import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { Table, Form } from 'react-bootstrap';
import { P_LOADING, P_ERROR, CARD_STYLE } from '../styles/jsx_styles';

// important to use back ticks
const CUSTOMER_QUERY = gql`
    query CustomerQuery {
        customers {
            id
            name
            email
            region
        }
    }
`;
function Addcustomer() {
    function refreshPage() {
        window.location.reload(true);
    }

    return (
        <div>
            <div className="card" style={{ marginTop: '10px' }}>
                <Form>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Customer</Form.Label>
                        <Form.Control type="text" placeholder="Enter Customer Name" />
                    </Form.Group>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupRegion">
                        <Form.Label>Region</Form.Label>
                        <Form.Control type="text" placeholder="Enter Region" />
                    </Form.Group>
                </Form>

                <Query query={CUSTOMER_QUERY}></Query>
            </div>
        </div>
    );
}

export default Addcustomer;
