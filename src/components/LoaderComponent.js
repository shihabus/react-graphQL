import React from 'react'

function LoaderComponent({ isLoading }) {
  return (

    <div>
      {
        isLoading &&
        <div class="ui active inverted dimmer">
          <div class="ui large text loader">Loading</div>
        </div>
      }
    </div>
  )
}

export default LoaderComponent
