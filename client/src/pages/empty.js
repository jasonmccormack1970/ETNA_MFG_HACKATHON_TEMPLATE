import React from 'react';
import Hello from '../components/hello';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:3600/graphql',
});

export default function empty() {
    return (
        <div>
            <h4>EMPTY PAGE</h4>

            <div>
                <input type="button" value="Hello" onClick={Hello} />
                <br />
            </div>
            <script>let test = 1 + 2;</script>
            <p> test </p>
            <ApolloProvider client={client}>
                <React-Fragment>
                    <Hello />
                </React-Fragment>
            </ApolloProvider>
        </div>
    );
}
