const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');
const LaunchAction = require('./launchaction');

const pgdb = require('../../database/pgdb');

module.exports = new GraphQLObjectType({
    name: 'launchPlan',
    fields: {
        id: { type: GraphQLID },
        planName: { type: new GraphQLNonNull(GraphQLString) },
        details: { type: GraphQLString },
        launchDate: { type: GraphQLString },
        launchActions: { 
            type: new GraphQLList(LaunchAction),
            resolve(obj, args, { pgPool }) {
                return pgdb(pgPool).getLaunchActions(obj);
            },
         }
    },
});
