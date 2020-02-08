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
const json_server_config = require('../json-server.json');
const jsonServerPort = json_server_config.port;
const pgdb = require('../database/pgdb');
const MeType = require('./types/me');
const LaunchType = require('./types/launch');
const CustomerType = require('./types/customer');
const UserType = require('./types/users');
const TasksType = require('./types/task');

// The root query type is where in the data graph begins
const RootQueryType = new GraphQLObjectType({
    name: 'Starting_Point_Query',
    description: 'An examle scheme to help get started',
    fields: {
        hello: {
            type: GraphQLString,
            description: 'The mandatory hello world example....',
            resolve: () =>
                'Hello World - This message has come from your GraphQL server, so you are good to start (Enjoy...!!!)',
        },

        launch_info: {
            type: new GraphQLList(LaunchType),
            description: 'SpaceX - Open Source REST API for rocket, capsule, pad, and launch data',
            resolve: (obj, args) => {
                return axios.get('https://api.spacexdata.com/v3/launches').then((res) => res.data);
            },
        },

        Users: {
            type: new GraphQLList(UserType),
            description: 'list all users from from ProstgresDB table',
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getAllUsers();
            },
        },

        about_Me: {
            type: MeType,
            description: 'Infomation about me (logged in??) and to do list from ProstgresDB',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getUser(args.key);
            },
        },

        tasks: {
            type: new GraphQLList(TasksType),
            description: 'list all users from from ProstgresDB tableB',
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getTasks();
            },
        },

        user_tasks: {
            type: new GraphQLList(TasksType),
            description: 'list all users from from ProstgresDB tableB',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getUserTasks(args.key);
            },
        },

        customer: {
            type: CustomerType,
            description: 'Return selected Customer data from a locally hosted mock api',
            args: {
                id: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:${jsonServerPort}/customers/` + args.id)
                    .then((res) => res.data);
            },
        },
        customers: {
            type: new GraphQLList(CustomerType),
            description: 'Return all Customer data from a locally hosted mock api',
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:${jsonServerPort}/customers`)
                    .then((res) => res.data);
            },
        },
    },
});

const RootMutationType = new GraphQLObjectType({
    name: 'MutationQuery',
    fields: {
        addNewCustomer: {
            type: CustomerType,
            description: 'Add a new customer record via the mock api',
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                region: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(obj, args) {
                axios
                    .post(`http://localhost:${jsonServerPort}/customers`, {
                        name: args.name,
                        email: args.email,
                        region: args.region,
                    })
                    .then((res) => res.data);
            },
        },
    },
});

const ncSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

module.exports = ncSchema;
