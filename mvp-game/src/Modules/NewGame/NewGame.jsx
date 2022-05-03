import React from 'react';
import {changeView, characterName} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import axios from 'axios';

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
    setName(value)
  }

  return (
    <div style={{height: '100vw', width: '100vw', background: 'brown'}}>
      <form style={{position: 'absolute', top: '30%', left: '30%'}}>
        <label>
          <input type='text' placeholder='Enter Character Name' onChange={() => {
            changeHandler(event);
          }}/>
        </label>
      </form>
      <button style={{position: 'absolute', top: '40%', left: '30%'}} onClick={() => {
        clickHandler()
      }}>Start Game</button>
    </div>
  );
}

export default NewGame;