import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Query, ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const ADD_USER = gql`
    input UserInput {
        email: String!
        first_name: String!
        last_name: String!
        department: String!
        api_key: String!
    }

    mutation addNewUser($input: UserInput!) {
        addNewUser(input: $input) {
            api_key
        }
    }
`;

export default function AddUser() {
    let email;
    let first_name;
    let last_name;
    let department;
    let api_key;

    const client = new ApolloClient({
        uri: 'http://localhost:3600/graphql',
    });
    const [AddUser, { data }] = useMutation(ADD_USER, { client });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    AddUser({
                        variables: {
                            email: email.value,
                            first_name: first_name.value,
                            last_name: last_name.value,
                            department: department.value,
                            api_key: api_key.value,
                        },
                    });
                    email.value = '';
                    first_name.value = '';
                    last_name.value = '';
                    department.value = '';
                    api_key.value = 0;
                }}
            >
                <table>
                    <thead>
                        <tr>
                            <th>email</th>
                            <th>first_name</th>
                            <th>last_name</th>
                            <th>department</th>
                            <th>api_key</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    ref={(node) => {
                                        email = node;
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    ref={(node) => {
                                        first_name = node;
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    ref={(node) => {
                                        last_name = node;
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    ref={(node) => {
                                        department = node;
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    ref={(node) => {
                                        api_key = node;
                                    }}
                                />
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Add Action</button>
            </form>
        </div>
    );
}
