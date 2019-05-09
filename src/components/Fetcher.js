import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';

const URL='https://api.github.com/graphql'
const httpLink = new HttpLink({ uri: URL });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const TOKEN = 'df819f0f5a6fceadc14878bf8c103dcde9e34468';

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: TOKEN ? `Bearer ${TOKEN}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache()
});

const sevenDaysBack = new Date(Date.now() - 864e5*7).toISOString();
const yesterday = new Date(Date.now() - 864e5).toISOString();

export const fetchTotalIssueCount =({owner,name})=>{
  return (dispatch)=>{
    client.query({
        query: gql`{
          repository(owner:"${owner}", name:"${name}"){
              issues(states:OPEN){
                totalCount
              }
            }
        }`
      }).then(response => {
          console.log("Total", response.data.repository.issues.totalCount)
      })
  }
}

export const fetchYesterdayIssueCount =({owner,name})=>{
    client.query({
        query: gql`{
          repository(owner:"${owner}", name:"${name}"){
            issues(states:OPEN,filterBy:{since:"${yesterday}"}){
              totalCount
            }
          }
        }`
      }).then(response => {
          console.log("Yesterday", response.data.repository.issues.totalCount)
      })
}

export const fetchSevenDayIssueCount =({owner,name})=>{
    client.query({
        query: gql`{
          repository(owner:"${owner}", name:"${name}"){
            issues(states:OPEN,filterBy:{since:"${sevenDaysBack}"}){
              totalCount
            }
          }
        }`
      }).then(response => {
          console.log("sevenDaysBack", response.data.repository.issues.totalCount)
      })
}

