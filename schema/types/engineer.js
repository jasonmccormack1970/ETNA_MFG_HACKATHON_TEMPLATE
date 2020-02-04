const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const SkillLevelType = require('./skill_level');

module.exports = new GraphQLObjectType({
    name: 'engineer',
    fields: {
        id: { type: GraphQLID },
        fullname: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        jobTitle: { type: new GraphQLNonNull(GraphQLString) },
        skillLevel: { type: new GraphQLNonNull(SkillLevelType) },
    },
});
