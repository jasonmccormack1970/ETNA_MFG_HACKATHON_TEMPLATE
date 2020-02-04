const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');
const LaunchAction = require('./launchaction');

module.exports = new GraphQLObjectType({
    name: 'launchPlan',
    fields: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        details: { type: GraphQLString },
        launchDate: { type: GraphQLString },
        launchActions: { 
            type: new GraphQLList(LaunchAction),
            resolve(obj, args, { pgPool }) {
                return pgdb(pgPool).getLaunchAction(obj);
            },
         }
    },
});
