import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// important to use back ticks
const LAUNCHES_QUERY = gql`
    query HelloQuery {
        hello
    }
`;

export class welcome extends Component {
    render() {
        return (
            <div>
                <h5>Test Message</h5>
                <Query query={LAUNCHES_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <h4>Loading Data ......</h4>;
                        }
                        if (error) {
                            return console.log(error);
                        }
                        console.log(data);
                        return <p> {data.hello} </p>;
                    }}
                </Query>
            </div>
        );
    }
}

export default welcome;
