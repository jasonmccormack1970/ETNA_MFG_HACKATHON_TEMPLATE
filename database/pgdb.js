const humps = require('humps');

module.exports = (pgPool) => {
    return {
        getAllUsers() {
            return pgPool.query(`select * from users`).then((res) => {
                return humps.camelizeKeys(res.rows);
            });
        },

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

        getTasks() {
            return pgPool.query(`select * from tasks`).then((res) => {
                return humps.camelizeKeys(res.rows);
            });
        },

        getTasksold(user) {
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
