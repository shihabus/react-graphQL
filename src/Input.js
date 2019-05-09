import React,{useEffect,useState} from 'react'

function Input({handleQuery}) {
  const [query,setQuery]=useState({owner:'',query:''})
  const [text,setText]=useState('')

  const onChange=(e)=>{
    e.preventDefault();
    setText(e.target.value)
  }

  useEffect(()=>{
    const {owner,name}=query
    if(owner && name){
      handleQuery(query)
      setText('')
    }
  },[query])

  const style={
    border:query.owner===undefined&&query.name===undefined?'1px solid red':''
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    let owner=text.split('/')[3]
    let name=text.split('/')[4]
    setQuery({owner,name})
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="query">GitHub Repo URL</label>
      <input type="url" name="query" value={text} onChange={onChange} placeholder="GitHub repo URL" style={style}/>
      <input type="button" value="Submit" onClick={handleSubmit}/>
    </form>
  )
}

export default Input
