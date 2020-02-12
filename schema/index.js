// Import type helpers from graphql-js
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
} = require('graphql');

const axios = require('axios');
const json_server_config = require('../json-server');

let jsonServerPort = json_server_config.port;

const pgdb = require('../database/pgdb');
const MeType = require('./types/me');
const LaunchType = require('./types/launch');
const CustomerType = require('./types/customer');

const ActionType = require('./types/action');
const EngineerType = require('./types/engineer');
const LaunchPlanType = require('./types/launchplan');
const LaunchActionType = require('./types/launchaction');
const SkillLevelType = require('./types/skill_level');
const ActionStatusType = require('./types/action_status');
const ActionInputType = require('./types/action_input');

const EngineerInputType = new GraphQLInputObjectType ({
    name: "EngineerInput",

    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        jobTitle: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        skillLevel: { type: new GraphQLNonNull(SkillLevelType) },
    },
});

const LaunchActionInputType = new GraphQLInputObjectType ({
    name: "LaunchActionInput",

    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        dueDate: { type: new GraphQLNonNull(GraphQLString) },
        planName: { type: new GraphQLNonNull(GraphQLString) },
        actionName: { type: new GraphQLNonNull(GraphQLString) },
        engineerName: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: ActionStatusType },
    }
});

const LaunchPlanInputType = new GraphQLInputObjectType ({
    name: "LaunchPlanInput",

    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        details: { type: new GraphQLNonNull(GraphQLString) },
        launchDate: { type: new GraphQLNonNull(GraphQLString) },
    },
});

// The root query type is where in the data graph begins
const RootQueryType = new GraphQLObjectType({
    name: 'Starting_Point_Query',
    description: 'An example scheme to help get started',
    fields: {
        hello: {
            type: GraphQLString,
            description: 'The mandatory hello world example....',
            resolve: () =>
                'Hello World - This message has come from your GraphQL server',
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
                'Infomation about me (logged in??) and to do list from ProstgresDB & MongoBD',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getUser(args.key);
            },
        },

        customer: {
            type: CustomerType,
            description:
                'Return selected Customer data from a locally hosted mock api',
            args: {
                id: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios
                    .get(
                        `http://localhost:${jsonServerPort}/customers/` +
                            args.id,
                    )
                    .then((res) => res.data);
            },
        },
        customers: {
            type: new GraphQLList(CustomerType),
            description:
                'Return all Customer data from a locally hosted mock api',
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:${jsonServerPort}/customers`)
                    .then((res) => res.data);
            },
        },

        // Resolvers for GraphQL queries
        action: {
            type: ActionType,
            description:
                'Action that is part of a launch plan',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getAction(args.key);
            },
        },
        actionById: {
            type: ActionType,
            description:
                'Actions that are part of a launch plan',
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getActionById(args.id);
            },
        },
        actions: {
            type: new GraphQLList(ActionType),
            description:
                'Actions that are part of a launch plan',
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getActions();
            },
        },
        engineer: {
            type: EngineerType,
            description:
                'Engineers that are part of a launch plan action',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getEngineer(args.key);
            },
        },
        engineers: {
            type: new GraphQLList(EngineerType),
            description:
                'Engineers that are part of a launch plan action',
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getEngineers();
            },
        },
        launchPlan: {
            type: LaunchPlanType,
            description:
                'Launch plans to launch rockets',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getLaunchPlan(args.key);
            },
        },
        launchPlans: {
            type: new GraphQLList(LaunchPlanType),
            description:
                'Launch plans to launch rockets',
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getLaunchPlans();
            },
        },
        launchActions: {
            type: LaunchActionType,
            description:
                'Launch action that are part of a launch plan',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getLaunchActions(obj);
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
        addPageAction: {
            type: ActionType,
            description: 'Add a new action to the database',
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                skillLevel: { type: GraphQLInt },
            },
            resolve(obj, args, { pgPool } ) {
                return pgdb(pgPool).addPageAction(args);
            },
        },
        addNewAction: {
            type: ActionType,
            description: 'Add a new action to the database',
            args: {
                input: { type: new GraphQLNonNull(ActionInputType) },
            },
            resolve(obj, { input }, { pgPool } ) {
                return pgdb(pgPool).addNewAction(input);
            },
        },
        addNewEngineer: {
            type: EngineerType,
            description: 'Add a new engineer to the database',
            args: {
                input: { type: new GraphQLNonNull(EngineerInputType) },
            },
            resolve(obj, { input }, { pgPool } ) {
                return pgdb(pgPool).addNewEngineer(input);
            },
        },
        addNewLaunchPlan: {
            type: LaunchPlanType,
            description: 'Add a new launch plan to the database',
            args: {
                input: { type: new GraphQLNonNull(LaunchPlanInputType) },
            },
            resolve(obj, { input }, { pgPool } ) {
                return pgdb(pgPool).addNewLaunchPlan(input);
            },
        },
        addNewLaunchPlanAction: {
            type: LaunchActionType,
            description: 'Add a new launch plan action to the database',
            args: { 
                input: { type: new GraphQLNonNull(LaunchActionInputType) },
            },
            resolve(obj, { input }, { pgPool } ) {
                return pgdb(pgPool).addNewLaunchAction(input);
            },
        },
    },
});

const ncSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

module.exports = ncSchema;
