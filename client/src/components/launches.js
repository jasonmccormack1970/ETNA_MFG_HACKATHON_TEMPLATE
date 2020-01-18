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
                <h3>Launches</h3>
                <Query query={LAUNCHES_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return <h4>Loading Data ......</h4>;
                        }
                        if (error) {
                            return console.log(error);
                        }
                        return <h5>testing .....</h5>;
                    }}
                </Query>
            </div>
        );
    }
}

export default launches;
