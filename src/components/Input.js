import React, { useEffect, useState } from 'react'
function Input({ handleQuery }) {
  const [query, setQuery] = useState({ owner: '', query: '' })
  const [text, setText] = useState('')

  const onChange = (e) => {
    e.preventDefault();
    setText(e.target.value)
  }

  useEffect(() => {
    const { owner, name } = query
    if (owner && name) {
      setText('')
      handleQuery(query)
    }
  }, [query])

  const style = {
    border: query.owner === undefined && query.name === undefined ? '1px solid red' : '',
    marginTop: 10,
    marginBottom: 10,
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let owner = text.split('/')[3]
    let name = text.split('/')[4]
    setQuery({ owner, name })
  }
  return (
    <div class="ui raised very padded text container segment">
      <p class="ui teal ribbon label" style={{ marginLeft: 10, marginBottom: 10 }}><i class="github icon"></i> OPEN ISSUE EXPLORER</p>
      <form onSubmit={handleSubmit} class="ui form">
        <div>
          <input type="url" name="query" value={text} onChange={onChange} placeholder="GitHub repo URL" style={style} class="prompt" />
        </div>
        <input class="ui secondary button" type="button" value="Submit" onClick={handleSubmit} disabled={text.length < 10} />
      </form>
    </div>
  )
}

export default Input
