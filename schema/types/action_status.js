const { GraphQLEnumType } = require('graphql');

module.exports = new GraphQLEnumType({
    name: 'ActionStatusType',

    values: {
        Pending: { value: 1 },
        In_progress: { value: 2 },
        Completed: { value: 3 },
        Closed: { value: 4 },
    },
});
