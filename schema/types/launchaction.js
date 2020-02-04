const Action = require('./action');
const Engineer = require('./engineer');
const ActionStatusType = require('./action_status');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'launchAction',
    fields: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        dueDate: { type: GraphQLString },
        status: { type: new GraphQLNonNull(ActionStatusType) },
        action: { 
            type: new GraphQLNonNull(Action),
            resolve(obj, args, { pgPool }) {
                return pgdb(pgPool).getEngineer(obj);
            },
        },
        assignedTo: { 
            type: new GraphQLNonNull(Engineer), 
            resolve(obj, args, { pgPool }) {
                return pgdb(pgPool).getEngineer(obj);
            },
        },
    },
});
