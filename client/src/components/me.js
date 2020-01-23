import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// important to use back ticks
const ME_QUERY = gql`
    query MeQuery {
        about_Me(key: "4242") {
            id
            fullName
            department
            email
        }
    }
`;

export class me extends Component {
    render() {
        return (
            <div>
                <h5>About Me</h5>
                <Query query={ME_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <h4>Loading Data ......</h4>;
                        }
                        if (error) {
                            return console.log(error);
                        }
                        console.log(data);
                        return <h5>Done .....</h5>;
                    }}
                </Query>
            </div>
        );
    }
}

export default me;
