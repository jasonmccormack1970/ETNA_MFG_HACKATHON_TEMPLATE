import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { Table, Form, FormGroup, Container } from 'react-bootstrap';
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
function users() {
    const client = new ApolloClient({
        uri: 'http://localhost:3600/graphql',
    });

    return (
        <div>
            <div className="card" style={{ marginTop: '10px' }}>
                <ApolloProvider client={client}>
                    <Query query={CUSTOMER_QUERY}>
                        {({ loading, error, data }) => {
                            if (loading) {
                                return <div style={P_LOADING}>Loading Data Please Wait ...</div>;
                            }
                            // catch apollo exceptions example network issues
                            if (error) {
                                return <div style={P_ERROR}>{error.message}</div>;
                            }
                            // catch graphql exceptions
                            if (onError.message === '') {
                                return (
                                    <div style={P_ERROR}>
                                        There is a problem with your GraphQL query
                                    </div>
                                );
                            }

                            return (
                                <div className="card">
                                    <div className="card-body" style={CARD_STYLE}>
                                        <h5 className="card-title text-muted">
                                            GraphQL resolver returning "ALL" customers from a Mock
                                            API
                                        </h5>
                                        <div>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Email Address</th>
                                                        <th>region</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.customers.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.region}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    </Query>
                </ApolloProvider>

                <Form style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '20px' }}>
                    ID: <input type="text" name="id"></input>
                    Name: <input type="text" name="name"></input>
                    Email: <input type="text" name="email"></input>
                    Region: <input type="number" name="region"></input>
                    <button>Submit</button>
                </Form>
            </div>
        </div>
    );
}

export default users;
