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

        getLaunchPlans(plans) {
            return pgPool
                .query(
                    `
        select * from launch_plan
        where plan_name = ANY($1)
      `,
                    [plans],
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

        getLaunchActions(ids) {
            return pgPool
                .query(
                    `
        select * from launch_action
        where id = ANY ($1)
      `,
                    [ids],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows);
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

        addNewLaunchPlan({ name, details, dueDate }) {
            return pgPool
                .query(
                    `
                    insert into launch_plan (plan_name, details, due_date)
                    values ($1, $2, $3)
                    returning *
                    `,
                    [name, details, dueDate],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        addNewLaunchAction({ description, dueDate, status, actionId, assignedTo, planId }) {
            return pgPool
                .query(
                    `
                    insert into launch_action (description, due_date, status, action_id, assigned_to, plan_id )
                    values ($1, $2, $3, $4, $5, $6)
                    returning *
                    `,
                    [description, dueDate, status, actionId, assignedTo, planId],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },
    };
};
