const { GraphQLEnumType } = require('graphql');

module.exports = new GraphQLEnumType({
    name: 'SkillLevelType',

    values: {
        Junior_engineer: { value: 1 },
        Engineer: { value: 2 },
        Senior_engineer: { value: 3 },
        Principle_engineer: { value: 4 },
        Rocket_scientist: { value: 5 },
    },
});
