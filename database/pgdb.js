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
        where id = $1
      `,
                    [apiKey],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        getUserTasks(apiKey) {
            return pgPool.query(`select * from tasks where id = $1`, [apiKey]).then((res) => {
                return humps.camelizeKeys(res.rows);
            });
        },
        getTasks() {
            return pgPool.query(`select * from tasks`).then((res) => {
                return humps.camelizeKeys(res.rows);
            });
        },
        getUserTasks(user) {
            return pgPool
                .query(
                    `
        select * from tasks
        where assignedto = $1
      `,
                    [user],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows);
                });
        },
    };
};
