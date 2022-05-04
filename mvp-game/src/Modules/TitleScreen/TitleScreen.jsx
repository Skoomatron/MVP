import React from 'react';
import {changeView} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import Waterfall from '../Assets/SpriteSheets/waterfall.png';
import styled from 'styled-components';



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
    <div style={{height: '100vw', width: '100vw', backgroundSize: 'cover', backgroundImage: `url(${Waterfall})`}}>
      <div style={{
        border: '10px solid grey', borderRadius: '25px', textAlign: 'center', lineHeight: '100px', justifyContent: 'center',
        backgroundColor: 'black', width: '800px', height: '100px',
        fontSize: '50px', color: 'white', fontWeigt: 'bold',
        position: 'relative', top: '10vw', left: '40vw'}}>
        It Ain't Much, But It's A Game
      </div>

        <button style={{border: '10px solid grey', backgroundColor: 'black', color: 'white', fontSize: '24px',
        fontWeight: 'bold', borderRadius: '25px', position: 'absolute', left: '48%', top: '30%', height: '5%', width: '10%'}} onClick={(event) => {
          clickHandler(event.target.innerText);
        }}>New Game</button>

        <button style={{border: '10px solid grey', backgroundColor: 'black', color: 'white', fontSize: '24px',
        fontWeight: 'bold', borderRadius: '25px', position: 'absolute', left: '48%', top: '35%', height: '5%', width: '10%'}} onClick={() => {
          clickHandler(event.target.innerText);
        }}>Load Game</button>
    </div>
  );
}

export default TitleScreen;