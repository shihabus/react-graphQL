import React from 'react'

function ErrorComponent({error}) {
  return (
    <div>
        {
            error&&<div>Something went wrong...!</div>
        }
    </div>
  )
}

export default ErrorComponent
