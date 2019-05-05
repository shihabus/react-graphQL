import React from 'react';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';

const URL='https://api.github.com/graphql'
const httpLink = new HttpLink({ uri: URL });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const TOKEN = '6b08bd9feb6db1cf8f7fe6694993517991cd2779';

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


export const fetchIssueCount =(query)=>{
    client.query({
        query: query
      }).then(response => {
          console.log("KOOOOOO", response.data.repository.issues.totalCount)
        })
}

