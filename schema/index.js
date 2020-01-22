// Import type helpers from graphql-js
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
} = require('graphql');

const axios = require('axios');

const pgdb = require('../database/pgdb');
const MeType = require('./types/me');
const LaunchType = require('./types/launch');

// The root query type is where in the data graph begins
const RootQueryType = new GraphQLObjectType({
    name: 'Starting_Point_Query',
    description: 'An examle scheme to help get started',
    fields: {
        hello: {
            type: GraphQLString,
            description: 'The mandatory hello world example....',
            resolve: () =>
                'Hello World - You have connected to you ETNA Hackathon Server ',
        },

        launch_info: {
            type: new GraphQLList(LaunchType),
            description:
                'SpaceX - Open Source REST API for rocket, capsule, pad, and launch data',
            resolve: (obj, args) => {
                return axios
                    .get('https://api.spacexdata.com/v3/launches')
                    .then((res) => res.data);
            },
        },

        about_Me: {
            type: MeType,
            description:
                'Infomation about me and to do list from ProstgresDB & MongoBD',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getUser(args.key);
            },
        },

        customer_info: {
            type: new GraphQLList(LaunchType),
            description:
                'SpaceX - Open Source REST API for rocket, capsule, pad, and launch data',
            resolve: (obj, args) => {
                return axios
                    .get('https://api.spacexdata.com/v3/launches')
                    .then((res) => res.data);
            },
        },
    },
});

const ncSchema = new GraphQLSchema({
    query: RootQueryType,

    // mutation: ...
});

module.exports = ncSchema;
