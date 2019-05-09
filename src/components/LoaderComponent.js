import React from 'react'

function LoaderComponent({isLoading}) {
  return (

    <div>
      {
          isLoading&&<div>Loading......</div>
      }
    </div>
  )
}

export default LoaderComponent
