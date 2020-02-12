import React, { useState, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import gql from 'graphql-tag';

const GET_MY_TODOS = gql`
    query UserQuery {
        Users {
            fullName
            email
            department
            id
            active
        }
    }
`;

const TodoPrivateListQuery = () => {
    const { loading, error, data } = useQuery(GET_MY_TODOS);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }
    return <TodoPrivateList todos={data.fullname} />;
};

export default TodoPrivateList;
