import React, { useState,useEffect } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'

export default function Courses() {
    const [issueCountSevenDays, setIssueCountSevenDays] = useState(0);
    const [issueCountYesterday, setIssueCountYesterday] = useState(0);
    const [repoQuery, setRepoQuery] = useState({owner:'',name:''});
    const [totalIssueCount, setTotalIssueCount] = useState(0);
    const [sevenDaysBack] = useState(new Date(Date.now() - 864e5*7).toISOString());
    const [yesterday] = useState(new Date(Date.now() - 864e5).toISOString());

    useEffect(() => {
        // only runs once
        console.log(sevenDaysBack,'|',yesterday)
        setRepoQuery({owner:'axios',name:'axios'})
      }, []);


    return (
        <>
        <Query
            query={gql`
    {
        repository(owner:"${repoQuery.owner}", name:"${repoQuery.name}"){
            issues(states:OPEN,filterBy:{since:"${sevenDaysBack}"}){
              totalCount
            }
          }
      }
    `}
        >
            {({data,loading,error}) => {
                if(loading) return <p>loading....</p>
                if(!loading){
                    let result = data.repository.issues.totalCount
                    console.log(data.repository.issues.totalCount)
                    setIssueCountSevenDays(result);
                }
                return (
                    <p>24 to 7: {`${issueCountSevenDays-issueCountYesterday}`}</p>
                )
            }}
        </Query>
        <Query
            query={gql`
    {
        repository(owner:"${repoQuery.owner}", name:"${repoQuery.name}"){
            issues(states:OPEN,filterBy:{since:"${yesterday}"}){
              totalCount
            },
          }
      }
    `}
        >
            {({data,loading,error}) => {
                if(loading) return <p>loading....</p>

                if(!loading){
                    let result = data.repository.issues.totalCount
                    console.log(data.repository.issues.totalCount)
                    setIssueCountYesterday(result);
                }
                return (
                    <p>24 back {`${issueCountYesterday}`}</p>
                )
            }}
        </Query>
        <Query
            query={gql`
    {
        repository(owner:"${repoQuery.owner}", name:"${repoQuery.name}"){
            issues(states:OPEN){
              totalCount
            },
          }
      }
    `}
        >
            {({data,loading,error}) => {
                if(loading) return <p>loading....</p>

                if(!loading){
                    let result = data.repository.issues.totalCount
                    console.log(data.repository.issues.totalCount)
                    setTotalIssueCount(result);
                }
                return (
                    <p>Total {`${totalIssueCount}`}</p>
                )
            }}
        </Query>
        <p>{`7 to --: ${totalIssueCount-issueCountSevenDays}`}</p>
            </>
    )
}
