const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql');

const pgdb = require('../../database/pgdb');

module.exports = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        fullName: {
            type: GraphQLString,
            resolve: (obj) => `${obj.firstName} ${obj.lastName}`,
        },
        department: { type: GraphQLString },
        active: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLString },
    },
});
