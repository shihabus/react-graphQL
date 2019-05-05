import React, { useEffect } from 'react';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';
import Courses from './Courses';
import './App.css';
import {fetchIssueCount} from './components/Fetcher'

// const client = new ApolloClient({
//   uri: "https://api.github.com/graphql?client_id='6b08bd9feb6db1cf8f7fe6694993517991cd2779'"
// })

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = '6b08bd9feb6db1cf8f7fe6694993517991cd2779';

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache()
});

const TOTAL_QUERY = gql`{
                      repository(owner:"github", name:"fetch"){
                          issues(states:OPEN){
                            totalCount
                          }
                        }
                    }`



function App() {
  useEffect(() => {
    // only runs once
    fetchIssueCount(TOTAL_QUERY);
   
    client.query({
      query: TOTAL_QUERY
    }).then(response => console.log("grf", response.data.repository.issues.totalCount))
  }, []);
  return (
    <ApolloProvider client={client}>
      <div>
        <Courses />
      </div>
    </ApolloProvider>
  );
}

export default App;
