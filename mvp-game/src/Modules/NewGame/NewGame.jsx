import React from 'react';
import {changeView, characterName, currentCharacter} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import Spritesheet from 'react-responsive-spritesheet';
import Sprites from '../Assets/SpriteSheets/chara6.png';
import styled, {keyframes, css} from 'styled-components';


const NewGame = () => {

  const [viewValue, setView] = useRecoilState(changeView);
  const [nameValue, setName] = useRecoilState(characterName);
  const [currentCharValue, setCurrentChar] = useRecoilState(currentCharacter);


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
      <Character>
        <CharacterSheet style={{backgroundImage: `url(${Sprites})`}}></CharacterSheet>
      </Character>
    </div>
  );
}

const pixelSize = 20;

const moveSprite = keyframes`
from {
  transform: translate3d(0px, 0, 0)
}
to {
  transform: translate3d(-100%, 0, 0);
}
`
const Character = styled.div`
width: calc(30px * ${pixelSize});
height: calc(30px * ${pixelSize});
overflow: hidden;
background: red;
`
// overflow: hidden;

const spriteOptions = `1s steps(3) infinite`

const CharacterSheet = styled.div`
animation: ${moveSprite} ${spriteOptions};
height: calc(90px * ${pixelSize});
width: calc(90px * ${pixelSize});
image-rendering: pixelated;
`

export default NewGame;


// width: calc(90px * ${pixelSize});
// height: calc(90px * ${pixelSize});
// image-rendering: pixelated;
// position: absolute;
// left: 50%;
// bottom: 50%;