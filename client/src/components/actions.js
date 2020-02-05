import React from 'react';
import gql from 'graphql-tag';
import { Query, ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

// important to use back ticks
const ACTIONS_QUERY = gql`
    query Actions {
        actions {
            id
            fullname
            description
            skillLevel
        }
    }
`;

const client = new ApolloClient({
    uri: 'http://localhost:3600/graphql',
});

function actions() {
    return (
        <div>
            <ApolloProvider client={client}>
            <Query query={ACTIONS_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <h5>Loading Data ......</h5>;
                    }
                    if (error) {
                        return console.log(error);
                    }
                    console.log(data);
                    return <div>
                        <table  cellPadding="10">
                            <thead>
                                <tr>
                            <th>Action name</th>
                            <th>Description</th>
                            <th>Skill level</th>
                            </tr>
                            </thead>
                            <tbody>

                            {data.actions && data.actions.map((action) => (
                                <tr>
                                    <td>{action.fullname}</td>
                                    <td>{action.description}</td>
                                    <td>{action.skillLevel}</td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>;
                }}
            </Query>
            </ApolloProvider>
        </div>
    );
}

export default actions;
