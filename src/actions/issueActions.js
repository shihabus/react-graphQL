import gql from 'graphql-tag';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import * as types from '../constants/type';

// --------- GraphQL Client Configuration --------
const URL = 'https://api.github.com/graphql'
const httpLink = new HttpLink({ uri: URL });

const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    const TOKEN = 'b94dd56a6d34e840697580f34a876b8b9aa0a16b';

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

const sevenDaysBack = new Date(Date.now() - 864e5 * 7).toISOString();
const yesterday = new Date(Date.now() - 864e5).toISOString();

// Action to fetch open issue count
export const fetchIssueCount = ({ owner, name }) => {
    return async (dispatch) => {
        dispatch({ type: types.LOADING })
        try {
            // fetching total issue count
            let total_count_response = await client.query({
                query: gql`{
                repository(owner:"${owner}", name:"${name}"){
                    issues(states:OPEN){
                      totalCount
                    }
                  }
              }`
            })
            let total_count = total_count_response.data.repository.issues.totalCount

            // fetching issue count since yesterday
            let count_since_yesterday_response = await client.query({
                query: gql`{
                repository(owner:"${owner}", name:"${name}"){
                  issues(states:OPEN,filterBy:{since:"${yesterday}"}){
                    totalCount
                  }
                }
              }`
            })
            let count_since_yesterday = count_since_yesterday_response.data.repository.issues.totalCount

            // fetching issue count since seven days
            let count_since_sevendays_response = await client.query({
                query: gql`{
                repository(owner:"${owner}", name:"${name}"){
                  issues(states:OPEN,filterBy:{since:"${sevenDaysBack}"}){
                    totalCount
                  }
                }
              }`
            })

            let count_since_sevendays = count_since_sevendays_response.data.repository.issues.totalCount
            let payload = {
                total_count,
                count_since_yesterday,
                count_since_sevendays,
                count_prior_sevendays: total_count - count_since_sevendays,
                owner,
                name
            }
            return dispatch({ type: types.SUCCESS, payload })
        }
        catch (err) {
            return dispatch({ type: types.ERROR })
        }
    }
}



