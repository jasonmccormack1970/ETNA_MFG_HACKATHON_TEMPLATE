import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Query, ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const ADD_ACTION = gql`
mutation addPageAction ($name: String!, $description: String!, $skillLevel: Int!) { 
    addPageAction (name: $name, description: $description, skillLevel: $skillLevel) {
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
    let name;
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
            addAction({ variables: { name: name.value, description: description.value, skillLevel: parseInt(skillLevel.value) } });
            name.value = '';
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
              name = node;
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
