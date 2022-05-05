import React from 'react';
import {changeView} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import Waterfall from '../Assets/SpriteSheets/waterfall.png';
import styled, {createGlobalStyle} from 'styled-components';



const TitleScreen = () => {

  const [viewValue, setView] = useRecoilState(changeView);

  const clickHandler = (value) => {
    if (value === 'New Game') {
      setView('new');
    } else if (value === 'Load Game') {
      setView('load');
    }
  }


  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '60vw', width: '100vw', backgroundSize: 'cover',
      backgroundImage: `url(${Waterfall})`, flexDirection: 'column'}}>

      <div style={{
        border: '10px solid grey', borderRadius: '25px', textAlign: 'center',
        lineHeight: '100px', justifyContent: 'center',
        backgroundColor: 'black', width: '800px', height: '100px',
        fontSize: '50px', color: 'white', fontWeigt: 'bold',
        }}>
        Fun: The Game
      </div>

        <button style={{border: '10px solid grey', backgroundColor: 'black', color: 'white', fontSize: '24px',
        fontWeight: 'bold', borderRadius: '25px', height: '5%', width: '10%'}} onClick={(event) => {
          clickHandler(event.target.innerText);
        }}>New Game</button>

        <button style={{border: '10px solid grey', backgroundColor: 'black', color: 'white', fontSize: '24px',
        fontWeight: 'bold', borderRadius: '25px', height: '5%', width: '10%'}} onClick={() => {
          clickHandler(event.target.innerText);
        }}>Load Game</button>
    </div>
  );
}



export default TitleScreen;