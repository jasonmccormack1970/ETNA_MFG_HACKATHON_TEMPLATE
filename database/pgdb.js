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

        getAction(name) {
            return pgPool
                .query(
                    `
        select * from action
        where fullname = $1
      `,
                    [name],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        getActionById(id) {
            return pgPool
                .query(
                    `
        select * from action
        where id = $1
      `,
                    [id],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        getActions() {
            return pgPool
                .query(
                    `
        select * from action
      `,
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows);
                });
        },

        getEngineer(name) {
            return pgPool
                .query(
                    `
        select * from engineer
        where fullname = $1
      `,
                    [name],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        getEngineerById(id) {
            return pgPool
                .query(
                    `
        select * from engineer
        where id = $1
      `,
                    [id],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        getEngineers() {
            return pgPool
                .query(
                    `
        select * from engineer
      `,
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows);
                });
        },

        getLaunchPlan(plan) {
            return pgPool
                .query(
                    `
        select * from launch_plan
        where plan_name = $1
      `,
                    [plan],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        getLaunchPlans() {
            return pgPool
                .query(
                    `
        select * from launch_plan
      `,
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows);
                });
        },

        getLaunchAction(id) {
            return pgPool
                .query(
                    `
        select * from launch_action
        where id = $1
      `,
                    [id],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        getLaunchActions(launchPlan) {
            return pgPool
                .query(
                    `
        select * from launch_action
        where id = $1
      `,
                    [launchPlan.id],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows);
                });
        },

        addPageAction({ name, description, skillLevel }) {
            return pgPool
                .query(
                    `
                    insert into action (fullname, description, skill_level)
                    values ($1, $2, $3)
                    returning *
                    `,
                    [name, description, skillLevel],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        addNewAction({ name, description, skillLevel }) {
            return pgPool
                .query(
                    `
                    insert into action (fullname, description, skill_level)
                    values ($1, $2, $3)
                    returning *
                    `,
                    [name, description, skillLevel],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        addNewEngineer({ name, jobTitle, department, skillLevel }) {
            return pgPool
                .query(
                    `
                    insert into engineer (fullname, job_title, department, skill_level)
                    values ($1, $2, $3, $4)
                    returning *
                    `,
                    [name, jobTitle, department, skillLevel],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        addNewLaunchPlan({ name, details, launchDate }) {
            return pgPool
                .query(
                    `
                    insert into launch_plan (plan_name, details, launch_date)
                    values ($1, $2, $3)
                    returning *
                    `,
                    [name, details, launchDate],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        addNewLaunchAction({ description, dueDate, status, actionName, engineerName, planName }) {
            if (!status || status === 0) {
                status = 1;
            }
            return pgPool
                .query(
                    `
                    insert into launch_action (description, due_date, status, action_id, assigned_to, plan_id )
                    values ($1, $2, $3, 
                        (select id from action where fullname = $4), 
                        (select id from engineer where fullname = $5), 
                        (select id from launch_plan where plan_name = $6))
                    returning *
                    `,
                    [description, dueDate, status, actionName, engineerName, planName],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },
    };
};
