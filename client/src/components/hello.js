import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Card, Button } from 'react-bootstrap';

function welcome(stuff) {
    //
    const client = new ApolloClient({
        uri: 'http://localhost:3600/graphql',
    });

    //    const HELLO_QUERY = gql`
    //      query HelloQuery {
    //          hello
    //      }
    //     `;

    const HELLO_QUERY = gql(stuff.message1);

    // Example of passing inline css JSX format
    const CARD_STYLE = {
        width: '100%',
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-body" style={CARD_STYLE}>
                    <h5 className="card-title text-muted">
                        An example of data passed from the page into a component
                    </h5>
                    <p className="card-text">
                        {stuff.otherData}
                        {stuff.someMore}
                    </p>
                </div>
            </div>

            <div className="card">
                <div className="card-body" style={CARD_STYLE}>
                    <h5 className="card-title text-muted">
                        Simple GraphQL resolver
                    </h5>
                    <p className="card-text">
                        <ApolloProvider client={client}>
                            <Query query={HELLO_QUERY}>
                                {({ loading, error, data }) => {
                                    if (loading) {
                                        return <h4>Loading Data ......</h4>;
                                    }
                                    if (error) {
                                        return console.log(error);
                                    }
                                    return <p> {data.hello} </p>;
                                }}
                            </Query>
                        </ApolloProvider>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default welcome;
