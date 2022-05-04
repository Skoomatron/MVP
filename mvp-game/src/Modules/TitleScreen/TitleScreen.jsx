import React from 'react';
import {changeView} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';


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
    <div style={{height: '100vw', width: '100vw', background: 'blue'}}>
      <div style={{
        border: '10px solid grey', borderRadius: '25px', textAlign: 'center',
        backgroundColor: 'black', width: '800px', height: '100px',
        fontSize: '50px', color: 'white', fontWeigt: 'bold',
        position: 'absolute', top: '20%', left: '30%'}}>
        Title TBD
      </div>

        <button style={{border: '10px solid grey', backgroundColor: 'black', color: 'white', fontSize: '24px',
        fontWeight: 'bold', borderRadius: '25px', position: 'absolute', left: '45%', top: '40%', height: '10%', width: '20%'}} onClick={(event) => {
          clickHandler(event.target.innerText);
        }}>New Game</button>

        <button style={{border: '10px solid grey', backgroundColor: 'black', color: 'white', fontSize: '24px',
        fontWeight: 'bold', borderRadius: '25px', position: 'absolute', left: '45%', bottom: '30%', height: '10%', width: '20%'}} onClick={() => {
          clickHandler(event.target.innerText);
        }}>Load Game</button>
    </div>
  );
}

export default TitleScreen;