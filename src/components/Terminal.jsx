import '/terminal.css'
import { useEffect, useState } from 'react';

function Terminal() {
  const [lines, setLines] = useState([''])
  const [globalIndex, setGlobalIndex] = useState(0)
  const [outputs, setOutputs] = useState([])
  const [directory, setDirectory] = useState("/athena/shreya's about me")
  const [name, setName] = useState("shreya's about me")

  useEffect(() => {
    setName(directory.substring(directory.lastIndexOf("/") + 1));
  }, [directory]);

  function handleKeyDown(e, index) {
    if (e.key === 'Enter') {
      const value = e.target.value;
      console.log('Entered input:', value);
      console.log(name);
      setLines([...lines, value])
      setGlobalIndex(lines.length + 1)
      handelInputValue(e, index)
      updateTime()

    } else if (e.key === 'ArrowUp') {
      if (globalIndex <= 0) return;
      console.log(globalIndex)
      const newIndex = globalIndex - 1;
      setGlobalIndex(newIndex);
      const oldValue = lines[newIndex];
      e.target.value = oldValue;
      
    } else if (e.key === 'ArrowDown') {
      if (globalIndex >= lines.length - 1) return;
      else if (globalIndex == lines.length - 2){
        console.log(index)
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
    let newOutput = [...outputs];
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
      const newText = `${directory}`
      newOutput[index] = newText
    }
    else if (value == "cd"){
      setDirectory("/athena/shreya's about me")
    }
    else if (value == "cd activities"){
      setDirectory("/athena/shreya's about me/activities")
    }
    else if (value == "cat"){
      newOutput[index] = "cat entered"
    }
    else if (value == "ls"){
      if (directory == "/athena/shreya's about me"){
        const newText = <p style={{display: "grid", gridTemplateColumns: "repeat(2, auto)"}}>   
            <span style={{fontWeight:"60"}}>	activities </span>
            <span> about_me.md</span>
          </p>
          newOutput[index] = newText
      }
      else {
        const newText = "glitch"
        newOutput[index] = newText
      }
      
    }
    else if (value == "clear"){
      setLines([''])
      setOutputs('')
      newOutput=''
    }
    else {
      newOutput[index] = `-bash: ${value}: command not found`
    }
    console.log(name)
    setOutputs(newOutput)
  }

  return (
    <div className="terminal">
      {lines.map((line, index) => (
        <div key={index}>
          <div className='input'>
            <span style={{fontWeight:800}}>shreya@shreya-macbook-air <span className='directory'>{name}</span>~ % </span>
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
