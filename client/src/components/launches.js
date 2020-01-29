import React from 'react';
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

function launches() {
    return (
        <div>
            <h5>Launch Data</h5>
            <Query query={LAUNCHES_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <h5>Loading Data ......</h5>;
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

export default launches;
