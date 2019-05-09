import React from 'react';
import { connect } from 'react-redux';
import TextInput from '../Input'
import ErrorComponent from './ErrorComponent'
import LoaderComponent from './LoaderComponent'
import PieChartComponent from './PieChartComponent'
import {
  fetchIssueCount,
} from '../actions';

class App extends React.Component {

  handleSubmit = (q) => {
    this.props.fetchIssueCount(q)
  }

  render() {
    const {error,loading}=this.props
    const options=this.props
    return (
      <div>
        <TextInput handleQuery={this.handleSubmit} />
        <ErrorComponent error={error}/>
        <LoaderComponent isLoading={loading}/>
        <PieChartComponent options={options}/>
      </div>
    );
  }
}

const mapStateToProps=({issues})=>{
  console.log(issues)
  const {count_since_sevendays,count_since_yesterday,error,total_count,count_prior_sevendays,loading,fetched} =issues
  return {
    total_count,
    count_since_yesterday,
    count_since_sevendays,
    count_prior_sevendays,
    error,
    loading,
    fetched
  }
}


export default connect(mapStateToProps, {
  fetchIssueCount,
})(App);

