const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql');

const TaskStatusType = require('./task_status');

module.exports = new GraphQLObjectType({
    name: 'task',
    fields: {
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLString },
        status: { type: new GraphQLNonNull(TaskStatusType) },
    },
});
