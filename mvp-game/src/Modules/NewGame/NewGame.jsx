import React, {useState} from 'react';
import {changeView, characterName, currentCharacter} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import Sprites from '../Assets/SpriteSheets/chara6.png';
import styled, {keyframes, css} from 'styled-components';
import Night from '../Assets/SpriteSheets/night.png';



const NewGame = () => {

  const [viewValue, setView] = useRecoilState(changeView);
  const [nameValue, setName] = useRecoilState(characterName);
  const [currentCharValue, setCurrentChar] = useRecoilState(currentCharacter);
  const [modalValue, setModal] = useState('none')


  const clickHandler = () => {
    if (nameValue) {
      axios.post('/create', {name: nameValue})
      .then((response) => {
        console.log('response in axios post', response.body)
      })
      .catch((error) => {
        console.log('error in axios post')
      })
    setView('load')
    } else {
      setModal('block')
    }
    setName('');
  }

  const changeHandler = (event) => {
    const value = event.target.value;
    setName(value)
  }

  const modalClick = () => {
    console.log('here')
    setModal('none')
  }
  console.log(modalValue)
  return (
    <div style={{height: '60vw', width: '100vw', backgroundSize: 'cover', backgroundImage: `url(${Night})`}}>
        <form style={{height: '100px', width: '100px', position: 'absolute', top: '30%', left: '42%'}}>
          <label>
            <input style={{backgroundColor: 'lightgrey', height: '50px', width: '400px', borderRadius: '25px', fontWeight: 'bold', fontSize: '24px', textAlign: 'center'}} type='text' placeholder='Enter Character Name' onChange={() => {
              changeHandler(event);
            }}/>
          </label>
        </form>

        <div style={{
          display: `${modalValue}`, height: '200px', border: '3px solid grey',
          width: '400px', zIndex: '10', position: 'absolute', lineHeight: '200px',
          backgroundColor: 'blue', top: '30%', left: '45%', fontSize: '42px',
          justifyContent: 'center', textAlign: 'center', fontWeight: 'bold'}}>
          Invalid Name
          <button style={{
            positions: 'absolute', bottom: '1%', left: '45%',
            borderRadius: '25px', height: '50px', width: '100px',
            color: 'black', fontWeight: 'bold', fontSize: '24px'}} onClick={() => {
            modalClick();
          }}>Exit</button>
        </div>

        <button style={{
          border: '10px solid grey', backgroundColor: 'black',
          color: 'white', fontSize: '24px',
          fontWeight: 'bold', borderRadius: '25px',
          position: 'absolute', left: '44.5%', bottom: '37%',
          height: '5%', width: '10%'}} onClick={() => {
          clickHandler()
        }}>Create Character</button>
      <Character>
        <CharacterSheet style={{backgroundImage: `url(${Sprites})`}}></CharacterSheet>
      </Character>
    </div>
  );
}

const pixelSize = 6;

const moveSprite = keyframes`
  from {
    transform: translate3d(0px, 0, 0)
  }
  to {
    transform: translate3d(-24%, 0, 0);
  }
`
const Character = styled.div`
  width: calc(30px * ${pixelSize});
  height: calc(45px * ${pixelSize});
  overflow: hidden;
  border: 3px solid black;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  left: 45vw;
  top: 20vw;
`
// overflow: hidden;

const spriteOptions = `0.5s steps(3) infinite`

const CharacterSheet = styled.img`
  animation: ${moveSprite} ${spriteOptions};
  width: calc(360px * ${pixelSize});
  height: calc(360px * ${pixelSize});
  image-rendering: pixelated;
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  top: -300px;
`

export default NewGame;


