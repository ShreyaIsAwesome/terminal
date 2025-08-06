import '/terminal.css'
import { useState } from 'react';


//if globalIndex > lines.length - 1 or globalIndex < 0:
//    don't allow it to go any further


function Terminal() {
  const [lines, setLines] = useState(['']);
  const [globalIndex, setGlobalIndex] = useState([0])

  function handleKeyDown(e, index) {
    if (e.key === 'Enter') {
      const value = e.target.value;
      console.log('Entered input:', value);
      setLines([...lines, value])
      setGlobalIndex(index + 1)
    } else if (e.key === 'ArrowUp') {
      if (globalIndex <= 0) return;
      const newIndex = globalIndex - 1;
      setGlobalIndex(newIndex);
      const oldValue = lines[newIndex];
      console.log(newIndex);
      e.target.value = oldValue;
    } else if (e.key === 'ArrowDown') {
      if (globalIndex >= lines.length - 2) return;
      const newIndex = globalIndex + 1;
      setGlobalIndex(newIndex);
      const oldValue = lines[newIndex];
      console.log(newIndex);
      e.target.value = oldValue;
    }
  }

  return (
    <div className="terminal">
      {lines.map((line, index) => (
        <div key={index}>
          <span style={{fontWeight:700}}>shreya@shreya-macbook-air ~ </span>
          {index < lines.length - 1 ? (
            <div className="terminal-line">{line}</div>
          ) : (
            <input
              className="user-input"
              autoFocus
              onChange={(e) => {
                const newLines = [...lines];
                newLines[index] = e.target.value;
                setLines(newLines);
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
