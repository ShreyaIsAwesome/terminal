import ".../Terminal.css";
import { useState } from 'react';

function Terminal() {
  const [lines, setLines] = useState([''])
  const [globalIndex, setGlobalIndex] = useState(0)
  const [outputs, setOutputs] = useState([])
  const [name, setName] = useState(["shreya's about me"])

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
      else if (globalIndex == lines.length - 2) {
        console.log(index)
        return e.target.value = "";
      }
      const newIndex = globalIndex + 1;
      setGlobalIndex(newIndex);
      const oldValue = lines[newIndex];
      e.target.value = oldValue;
    }
  }

  function handelInputValue(e, index) {
    const value = e.target.value
    let newOutput = [...outputs];
    if (value == "help") {
      const newText = <span>
        Hello! I'm Shreya and this is a cool About Me page idea I saw online. Here is a quick list of commands you can use to explore this page as well as myself!
        <p style={{ display: "grid", gridTemplateColumns: "repeat(2, auto)" }}>
          <span>— pwd: check which directory you are currently in	</span>
          <span>— ls: view all the files in the directory	</span>
          <span>— cat: open/read file</span>
        </p>
      </span>

      newOutput[index] = newText
    }
    else if (value == "pwd") {
      newOutput[index] = "/home/shreya/documents/athena-award/shreya's about me"
    }
    else if (value.includes("cat")) {
      if (value == "cat about_me.md") {
        const newText = <span>
          Hi! I'm Shreya, a high school student with a passion for computer science and technology.
          I love learning many different things--whether its a new programming language (right now I'm trying to learn C++),
          a new yummy recipe (I'll always be obssesed with my brownies though), or a new card game (after banning phones in schools,
          this is what everyone resorts to)--I love trying new things and growing! I hope you learn a lot more about me after
          exploring this page!
        </span>
        newOutput[index] = newText
      }
      else if (value == "cat sports.md") {
        const newText = <span>
          I have been playing tennis since I was 10-11 years old and have competed in various local and regional tournaments.
          Not only has my tennis skills improved, but my strength (both physical and mental) has also increased significantly. I've
          made countless memories with my teammates and have formed strong friendships through the sport. This sport has been and will
          continue to be a significant part of my life!
        </span>
        newOutput[index] = newText
      }
      else if (value == "cat music.md") {
        const newText = <span>
          I've been playing piano for about 6-7 years and I love it. From classics like Chopin to theme songs like "Howls Moving Castle" 
          or special songs from my lesson book, I love playing anything. Its such a cool skill to have when I can play whatever
          song I want. Piano has helped me learn patience and dedication, as mastering a piece takes time and effort. It also provides a
          creative outlet for me to express my emotions and unwind after a long day. I love the instrument and it has definately helped me
          in so many ways.
        </span>
        newOutput[index] = newText
      }
      else if (value == "cat projects.md") {
        const newText = <span>
          I've been programming so I've done many many projects. Most of them are in Python but recently I've been exploring a lot with
          different frameworks (like React and Flask), and new languages (like JavaScript and C++). I usually do projects for fun,
          and to improve my skills. Other times, its for competitions--for example, Technovation Girls. I competed in this global hackathon
          with my friend and we placed as a Semifinalist. It was a great accomplishment and I can't wait to see what's next in my
          coding journey!
        </span>
        newOutput[index] = newText
      }
      else {
        newOutput[index] = `-bash: ${value.split(" ")[1]}: No such file or directory`
      }
    }
    else if (value == "ls") {
      const newText = <p style={{ display: "grid", gridTemplateColumns: "repeat(2, auto)" }}>
        <span> about_me.md</span>
        <span> sports.md</span>
        <span> music.md</span>
        <span> projects.md</span>
      </p>
      newOutput[index] = newText
    }
    else if (value == "clear") {
      setLines([''])
      setOutputs('')
      newOutput = ''
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
            <span style={{ fontWeight: 800 }}>shreya@shreya-macbook-air ~ % </span>
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
