const Action = require('./action');
const Engineer = require('./engineer');
const ActionStatusType = require('./action_status');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const pgdb = require('../../database/pgdb');

module.exports = new GraphQLObjectType({
    name: 'launchAction',
    fields: {
        id: { type: GraphQLID },
        description: { type: new GraphQLNonNull(GraphQLString) },
        dueDate: { type: GraphQLString },
        status: { type: new GraphQLNonNull(ActionStatusType) },
        action: { 
            type: new GraphQLNonNull(Action),
            resolve(obj, args, { pgPool }) {
                return pgdb(pgPool).getActionById(obj.actionId);
            },
        },
        assignedTo: { 
            type: new GraphQLNonNull(Engineer), 
            resolve(obj, args, { pgPool }) {
                return pgdb(pgPool).getEngineerById(obj.assignedTo);
            },
        },
    },
});
