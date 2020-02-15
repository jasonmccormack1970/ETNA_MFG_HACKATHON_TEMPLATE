import gql from 'graphql-tag';

// Remeber to wrap queries in back ticks ``
const getDeptQuery = gql`
    query GetDeptQuery {
        Depts {
            department
        }
    }
`;

const addNewUserMutation = gql`
    mutation(
        $first_name: String
        $last_name: String
        $department: String
        $email: String!
        $apikey: String
    ) {
        addNewUser(
            first_name: $first_name
            last_name: $last_name
            department: $department
            email: $email
            apikey: $apikey
        ) {
            fullName
        }
    }
`;

export { getDeptQuery, addNewUserMutation };
