import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { P_LOADING, P_ERROR, CARD_STYLE } from '../styles/jsx_styles';

function example2() {
    //
    const client = new ApolloClient({
        uri: 'http://localhost:3600/graphql',
    });

    const HELLO_QUERY = gql(exampleData.message1);

    return <div>TEST</div>;
}

export default example2;
