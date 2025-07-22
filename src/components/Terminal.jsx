import '/terminal.css'
import Help from './Help.jsx'
import Template from './Template.jsx';

function Terminal() {
  let oldInput = "";

  addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
      const input = document.querySelector('.user-input');
        if (input.value == 'help') {
          oldInput = input;
          <Help />
        }
    }
  });

  return (
    <Template />
  )
}

export default Terminal
