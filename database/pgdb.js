const humps = require('humps');

module.exports = (pgPool) => {
    return {
        getUser(apiKey) {
            return pgPool
                .query(
                    `
        select * from users
        where api_key = $1
      `,
                    [apiKey],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        getTasks(user) {
            return pgPool
                .query(
                    `
        select * from tasks
        where assigned_to = $1
      `,
                    [user.id],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows);
                });
        },
    };
};
