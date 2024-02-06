import { useCallback, useEffect, useState } from 'react'
import Pills from './components/Pills';
import './App.css'

function App() {
  const [suggestion, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(new Map())
  const [input, setInput] = useState('');
  useEffect(()=>{
    fetch(`https://dummyjson.com/users/search?q=${input}`)
    .then(res => res.json())
    .then(data => setSuggestions(data))
  },[input])

  const handleSearch = (e) => {
    setInput(e.target.value);
  }

  const handlePillClick = (email) => {
    const obj = new Map(selected);
    obj.delete(email);
    setSelected(obj);
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Backspace' && input === "" && selected.size !== 0){
      handlePillClick([...selected][selected.size - 1][0]);
    }
  }

  const handleSelect = (name,email) => {
    const obj = new Map(selected);
    obj.set(email, name)
    setSelected(obj)
  }
  return (
    <>
      <div className="input-container">
        <Pills selected={selected} handlePillClick={handlePillClick} />
        <input
          className="input"
          onChange={(e) => handleSearch(e)}
          onKeyDown={handleKeyDown}
          value={input}
          placeholder="Search for a user..."
        ></input>
      </div>

      <ul className="suggestions">
        {suggestion?.users?.map((u) => {
          return (
            <li
              key={u.email}
              onClick={() =>
                handleSelect(u.firstName + " " + u.lastName, u.email)
              }
            >
              <img src={u.image} />
              <span>{u.firstName + " " + u.lastName}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App
