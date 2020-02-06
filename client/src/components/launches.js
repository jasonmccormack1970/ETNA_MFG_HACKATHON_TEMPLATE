import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { onError } from 'apollo-link-error';

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

// important to use back ticks
const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launch_info {
            flight_number
            mission_name
        }
    }
`;

function launches() {
    const client = new ApolloClient({
        uri: 'http://localhost:3600/graphql',
    });

    return (
        <div>
            <div className="container">
                <div className="card">
                    <div className="card-body" style={CARD_STYLE}>
                        <h5 className="card-title text-muted">
                            An example of data read from a public API
                        </h5>
                        <ApolloProvider client={client}>
                            <Query query={LAUNCHES_QUERY}>
                                {({ loading, error, launchData }) => {
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

                                    return <div>data</div>;
                                }}
                            </Query>
                        </ApolloProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default launches;
