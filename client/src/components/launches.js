import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { onError } from 'apollo-link-error';
import classNames from 'classnames';
import { P_LOADING, P_ERROR, CARD_STYLE } from '../styles/jsx_styles';
import Mflag from '../components/missionflag';

// important to use back ticks
const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launch_info {
            flight_number
            mission_name
            launch_year
            launch_success
            launch_site {
                site_id
                site_name
                site_name_long
            }
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

function launches() {
    const client = new ApolloClient({
        uri: 'http://localhost:3600/graphql',
    });

    return (
        <div>
            <div className="container">
                <div className="card">
                    <div className="card-body" style={CARD_STYLE}>
                        <h5 className="card-title text-muted">
                            GraphQL resolver returning data from a public API
                        </h5>
                        <Mflag />
                        <ApolloProvider client={client}>
                            <Query query={LAUNCHES_QUERY}>
                                {({ loading, error, data }) => {
                                    if (loading) {
                                        return (
                                            <div style={P_LOADING}>
                                                Loading Data Please Wait ...
                                            </div>
                                        );
                                    }
                                    // catch apollo exceptions example network issues
                                    if (error) {
                                        return <div style={P_ERROR}>{error.message}</div>;
                                    }
                                    // catch graphql exceptions
                                    if (onError.message === '') {
                                        return (
                                            <div style={P_ERROR}>
                                                There is a problem with your GraphQL query
                                            </div>
                                        );
                                    }

                                    return (
                                        <ul>
                                            {data.launch_info.map((item) => (
                                                <li key={item.flight_number}>
                                                    <h6>
                                                        Mission Name:{' '}
                                                        <span
                                                            className={classNames({
                                                                'text-success': item.launch_success,
                                                                'text-danger': !item.launch_success,
                                                            })}
                                                        >
                                                            {item.mission_name} - {item.launch_year}
                                                        </span>
                                                    </h6>
                                                    <p>
                                                        Launched from :
                                                        {item.launch_site.site_name_long}
                                                    </p>
                                                    <p>Rocket used: {item.rocket.rocket_name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                }}
                            </Query>
                        </ApolloProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default launches;
