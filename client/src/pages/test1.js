import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Hello from '../components/hello';

const client = new ApolloClient({
    uri: 'http://localhost:3600/graphql',
});

export default function test1() {
    return (
        <div>
            <div>
                <h4>TEST PAGE</h4>
            </div>

            <ApolloProvider client={client}>
                <React-Fragment>
                    <Hello />
                </React-Fragment>
            </ApolloProvider>
        </div>
    );
}
