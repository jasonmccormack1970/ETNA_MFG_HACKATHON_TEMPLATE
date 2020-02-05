import React from 'react';
import gql from 'graphql-tag';
import { Query, ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

// important to use back ticks
const ENGINEERS_QUERY = gql`
    query Engineers {
        engineers {
            fullname
            jobTitle
            department
            skillLevel
        }
    }
`;

const client = new ApolloClient({
    uri: 'http://localhost:3600/graphql',
});

function engineers() {
    return (
        <div>
            <ApolloProvider client={client}>
            <Query query={ENGINEERS_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <h5>Loading Data ......</h5>;
                    }
                    if (error) {
                        return console.log(error);
                    }
                    console.log(data);
                    if (data) {
                    return <p>
                        <table  cellPadding="10">
                            <th>Engineer name</th>
                            <th>Department</th>
                            <th>Job title</th>
                            <th>Skill level</th>

                            {data.engineers && data.engineers.map((engineer) => (
                                <tr>
                                    <td>{engineer.fullname}</td>
                                    <td>{engineer.department}</td>
                                    <td>{engineer.jobTitle}</td>
                                    <td>{engineer.skillLevel}</td>
                                </tr>))}
                        </table>
                    </p>;
                    }
                    else {
                        return (null);
                    }
                }}
            </Query>
            </ApolloProvider>
        </div>
    );
}

export default engineers;
