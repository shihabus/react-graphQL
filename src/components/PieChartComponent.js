import React from 'react'

function PieChartComponent({ options }) {
    const { count_since_sevendays, count_since_yesterday, error, total_count, count_prior_sevendays, loading, fetched } = options
    return (
        <>
            {
                fetched &&
                <div>
                    <div>total_count {total_count}</div>
                    <div>count_since_yesterday {count_since_yesterday}</div>
                    <div>count_since_sevendays {count_since_sevendays}</div>
                    <div>count_prior_sevendays {count_prior_sevendays}</div>
                </div>
            }
        </>
    )
}

export default PieChartComponent
