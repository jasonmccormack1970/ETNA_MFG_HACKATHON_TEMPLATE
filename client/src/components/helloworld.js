import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { P_LOADING, P_ERROR } from '../styles/jsx_styles';

function helloworld(exampleData) {
    //
    const client = new ApolloClient({
        uri: 'http://localhost:3600/graphql',
    });

    const HELLO_QUERY = gql(exampleData.message1);

    return (
        <div className="container">
            <div className="card" style={{ marginTop: '10px' }}>
                <div className="card-body">
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
                                        <div style={P_LOADING}>
                                            {data.hello}
                                            <div>{exampleData.otherData}</div>
                                        </div>
                                    );
                                }}
                            </Query>
                        </ApolloProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default helloworld;
