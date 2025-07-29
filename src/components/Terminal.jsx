import '/terminal.css'
import Help from './Help.jsx'
import { useState } from 'react';


function Terminal() {
  const [lines, setLines] = useState(['']);

  function handleKeyDown(e, index) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value;
      console.log('Entered input:', value);
      setLines([...lines, value])
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Enter logic here 
    }
  }

  return (
    <div className="terminal">
      {lines.map((line, index) => (
        <div key={index}>
          <span style={{fontWeight:700}}>shreya@shreya-air ~ </span>
          {index < lines.length - 1 ? (
            <div className="terminal-line">{line}</div>
          ) : (
            <input
              className="user-input"
              autoFocus
              onChange={(e) => {
                const updated = [...lines];
                updated[index] = e.target.value;
                setLines(updated);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          )}
        </div>
      ))}
    </div>     
  )
}

export default Terminal
