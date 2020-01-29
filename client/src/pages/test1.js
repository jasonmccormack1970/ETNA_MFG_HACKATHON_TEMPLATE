import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Hello from '../components/hello';

const client = new ApolloClient({
    uri: 'http://localhost:3600/graphql',
});

// an example of creating an object which
// is then sent to a react component as a "prop"
const stuff = {
    message1: 'query HelloQuery {hello}',
};

export default function test1() {
    return (
        <div>
            <div>
                <h4 className="text-muted">TEST PAGE</h4>
            </div>

            <ApolloProvider client={client}>
                <React-Fragment>
                    <Hello {...stuff} />
                </React-Fragment>
            </ApolloProvider>
        </div>
    );
}
