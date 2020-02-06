import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { onError } from 'apollo-link-error';

function welcome(stuff) {
    //
    const client = new ApolloClient({
        uri: 'http://localhost:3600/graphql',
    });

    const HELLO_QUERY = gql(stuff.message1);

    // Example of passing inline css JSX format
    const CARD_STYLE = {
        width: '100%',
    };

    const P_ERROR = {
        color: 'Red',
    };

    const P_LOADING = {
        color: 'blue',
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-body" style={CARD_STYLE}>
                    <h5 className="card-title text-muted">
                        An example of data passed from the page into a component
                    </h5>
                    <div className="card-text">
                        {stuff.otherData}
                        {stuff.someMore}
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body" style={CARD_STYLE}>
                    <h5 className="card-title text-muted">
                        Simple GraphQL resolver
                    </h5>
                    <div className="card-text">
                        <ApolloProvider client={client}>
                            <Query query={HELLO_QUERY}>
                                {({ loading, error, data }) => {
                                    if (loading) {
                                        return (
                                            <div style={P_LOADING}>
                                                Loading Data Please Wait ...
                                            </div>
                                        );
                                    }
                                    // catch apollo exceptions example network issues
                                    if (error) {
                                        return (
                                            <div style={P_ERROR}>
                                                {error.message}
                                            </div>
                                        );
                                    }
                                    // catch graphql exceptions
                                    if (onError.message === '') {
                                        return (
                                            <div style={P_ERROR}>
                                                There is a problem with your
                                                GraphQL query
                                            </div>
                                        );
                                    }

                                    return <div> {data.hello} </div>;
                                }}
                            </Query>
                        </ApolloProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default welcome;
