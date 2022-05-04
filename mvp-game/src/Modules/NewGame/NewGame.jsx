import React from 'react';
import {changeView, characterName} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import Spritesheet from 'react-responsive-spritesheet';

const NewGame = () => {

  const [viewValue, setView] = useRecoilState(changeView);
  const [nameValue, setName] = useRecoilState(characterName);

  const clickHandler = () => {

      axios.post('/create', {name: nameValue})
      .then((response) => {
        console.log('response in axios post', response.body)
      })
      .catch((error) => {
        console.log('error in axios post')
      })
    setView('battle')
  }

  const changeHandler = (event) => {
    const value = event.target.value;
    console.log(event.key, 'this is the key')
    setName(value)
  }

  return (
    <div style={{height: '100vw', width: '100vw', background: 'blue'}}>
      <form style={{position: 'absolute', top: '30%', left: '30%'}}>
        <label>
          <input type='text' placeholder='Enter Character Name' onChange={() => {
            changeHandler(event);
          }}/>
        </label>
      </form>
      <button style={{border: '10px solid grey', backgroundColor: 'black', color: 'white', fontSize: '24px',
        fontWeight: 'bold', borderRadius: '25px', position: 'absolute', left: '45%', bottom: '30%', height: '10%', width: '20%'}} onClick={() => {
        clickHandler()
      }}>Start Game</button>
    </div>
  );
}

export default NewGame;