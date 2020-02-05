const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql');

const SkillLevelType = require('./skill_level');

module.exports = new GraphQLInputObjectType ({
    name: "ActionInput",

    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        skillLevel: { type: new GraphQLNonNull(SkillLevelType) },
    },
});

