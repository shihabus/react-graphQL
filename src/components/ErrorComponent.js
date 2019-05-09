import React from 'react'

function ErrorComponent({ error }) {
  return (
    <div>
      {
        error &&
        <h2 class="ui center aligned icon header">
          <i class="thumbs down icon"></i>
           <p style={{color:'red'}}>Something went wrong..!!</p>
        </h2>
      }
    </div>
  )
}

export default ErrorComponent
