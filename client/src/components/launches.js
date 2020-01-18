import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// important to use back ticks
const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launch_info {
            flight_number
            mission_name
        }
    }
`;

export class launches extends Component {
    render() {
        return (
            <div>
                <Query query={LAUNCHES_QUERY}>
                    {({ loading, error, data }) => {
                        console.log(data);
                        return <h1>Test ....</h1>;
                    }}
                </Query>
            </div>
        );
    }
}

export default launches;
