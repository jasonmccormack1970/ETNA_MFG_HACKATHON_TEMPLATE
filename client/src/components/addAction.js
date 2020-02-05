import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Query, ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const ADD_ACTION = gql`
enum SkillLevel {
    Junior_engineer
    Engineer
    Senior_engineer
    Principle_engineer
    Rocket_scientist
}

input ActionInput {
    fullname: String!
    description: String!
    skillLevel: SkillLevel
}

mutation addNewAction ($input: ActionInput) { 
    addNewAction (input: $input) {
        id
    } 
}

`;


export default function AddAction() {
  const skillLevels = [
      {
        key: "Junior_engineer",
        text: "Junior engineer",
        value: 1,
      },
      {
        key: "Engineer",
        text: "Engineer",
        value: 2,
      },
      {
        key: "Senior_engineer",
        text: "Senior engineer",
        value: 3,
      },
      {
        key: "Priciple_engineer",
        text: "Principle engineer",
        value: 4,
      },
      {
        key: "Rocket_scientist",
        text: "Rocket scientist",
        value: 5,
      },
    ];
    let fullname;
    let description;
    let skillLevel;
    const client = new ApolloClient({
        uri: 'http://localhost:3600/graphql',
    });
    const [addAction, { data }] = useMutation(ADD_ACTION, {client});
          
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addAction({ variables: { fullname: fullname.value, description: description.value, skillLevel: skillLevel.value } });
            fullname.value = '';
            description.value = '';
            skillLevel.value = '';
          }}
        >
          <table >
            <thead>
              <tr>
          <th>Full name</th>
          <th>Description</th>
          <th>Skill level</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
          <input
            ref={node => {
              fullname = node;
            }}
          />
          </td>
          <td>
          <input
            ref={node => {
              description = node;
            }}
          />
          </td>
          <td>
          <input
            ref={node => {
              skillLevel = node;
            }}
          />
          </td>
          </tr>
          </tbody>
          </table>
          <button type="submit">Add Action</button>
        </form>
      </div>
    );
  }
