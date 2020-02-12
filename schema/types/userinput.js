const { GraphQLString, GraphQLNonNull, GraphQLInputObjectType } = require('graphql');

const pgdb = require('../../database/pgdb');

module.exports = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        first_name: { type: new GraphQLNonNull(GraphQLString) },
        last_name: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        api_key: { type: new GraphQLNonNull(GraphQLString) },
    },
});
