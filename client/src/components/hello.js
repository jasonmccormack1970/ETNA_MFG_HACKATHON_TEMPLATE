import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

    return (
        <div>
            <h5>Test Message</h5>
            <ApolloProvider client={client}>
                <Query query={HELLO_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <h4>Loading Data ......</h4>;
                        }
                        if (error) {
                            return console.log(error);
                        }
                        console.log(data);
                        return <p> {data.hello} </p>;
                    }}
                </Query>
            </ApolloProvider>
        </div>
    );
}

export default welcome;
