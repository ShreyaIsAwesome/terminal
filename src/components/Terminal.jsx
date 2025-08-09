import '/terminal.css'
import { use, useState } from 'react';

function Terminal() {
  const [lines, setLines] = useState(['']);
  const [globalIndex, setGlobalIndex] = useState([0])
  const [outputs, setOutputs] = useState([]);

  function handleKeyDown(e, index) {
    if (e.key === 'Enter') {
      const value = e.target.value;
      console.log('Entered input:', value);
      setLines([...lines, value])
      setGlobalIndex(index + 1)
      handelInputValue(e, index)
      updateTime()

    } else if (e.key === 'ArrowUp') {
      if (globalIndex <= 0) return;
      const newIndex = globalIndex - 1;
      setGlobalIndex(newIndex);
      const oldValue = lines[newIndex];
      e.target.value = oldValue;

    } else if (e.key === 'ArrowDown') {
      if (globalIndex >= lines.length - 1) return;
      else if (globalIndex == lines.length - 2){
        return e.target.value = "";
      }
      const newIndex = globalIndex + 1;
      setGlobalIndex(newIndex);
      const oldValue = lines[newIndex];
      e.target.value = oldValue;
    }
  }

  function handelInputValue(e, index){
    const value = e.target.value
    const newOutput = [...outputs];
    if (value == "help"){
      const newText = <span>
        Hello! I'm Shreya and this is a cool About Me page idea I saw online. Here is a quick list of commands you can use to explore this page as well as myself!
        <p style={{display: "grid", gridTemplateColumns: "repeat(2, auto)"}}>   
          <span>— pwd: check which directory you are currently in	</span>
          <span>— cd: change directory</span>
          <span>— ls: view all the files in the directory	</span>
          <span>— cat: open/read file</span>
        </p>
      </span>

      newOutput[index] = newText
    }
    else if (value == "pwd"){
      newOutput[index] = "pwd entered"
    }
    else if (value == "cd"){
      newOutput[index] = "cd entered"
    }
    else if (value == "cat"){
      newOutput[index] = "cat entered"
    }
    else if (value == "ls"){
      newOutput[index] = "ls entered"
    }
    setOutputs(newOutput)
  }

  return (
    <div className="terminal">
      {lines.map((line, index) => (
        <div key={index}>
          <div className='input'>
            <span style={{fontWeight:800}}>shreya@shreya-macbook-air ~ % </span>
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
          <div className='output'>
            {outputs[index]}
          </div>
        </div>
      ))}
    </div>     
  )
}

export default Terminal
