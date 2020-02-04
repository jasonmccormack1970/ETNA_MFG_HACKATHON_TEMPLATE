const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const SkillLevelType = require('./skill_level');

module.exports = new GraphQLObjectType({
    name: 'action',
    fields: {
        id: { type: GraphQLID },
        fullname: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        skillLevel: { type: new GraphQLNonNull(SkillLevelType) },
    },
});
