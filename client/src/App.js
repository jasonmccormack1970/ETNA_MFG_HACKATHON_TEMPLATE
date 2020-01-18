import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Launches from './components/launches';

const client = new ApolloClient({
    uri: 'http://localhost:3100/graphql',
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="container">
                <h2>Enta Manufacturing Hackathon</h2>
            </div>

            <Launches />
        </ApolloProvider>
    );
}

export default App;
