import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Card, ListGroup } from 'react-bootstrap';
import { onError } from 'apollo-link-error';
import { P_LOADING, P_ERROR } from '../styles/jsx_styles';

// important to use back ticks
const ME_QUERY = gql`
    query MeQuery {
        about_Me(key: "060") {
            firstName
            lastName
            fullName
            email
            department
            id
            active
        }
    }
`;
function me() {
    const client = new ApolloClient({
        uri: 'http://localhost:3600/graphql',
    });

    return (
        <div>
            <ApolloProvider client={client}>
                <Query query={ME_QUERY}>
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
                            <div>
                                <Card style={{ width: '30rem', backgroundColor: 'Lightgrey' }}>
                                    <Card.Body>
                                        <h6>logged in as:</h6>
                                        <Card.Title style={{ color: 'Blue' }}>
                                            {data.about_Me.fullName}
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {data.about_Me.department}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    Email: {data.about_Me.email}
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    Active: {data.about_Me.active}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    }}
                </Query>
            </ApolloProvider>
        </div>
    );
}

export default me;
