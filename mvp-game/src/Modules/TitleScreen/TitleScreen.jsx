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
      <div style={{borderRadius: '25px', textAlign: 'center',
                  backgroundColor: 'black', width: '800px', height: '100px',
                  fontSize: '50px', color: 'white', fontWeigt: 'bold',
                  position: 'absolute', top: '20%', left: '30%'}}>Title TBD</div>

        <button style={{position: 'absolute', left: '30%', top: '40%'}} onClick={(event) => {
          clickHandler(event.target.innerText);
        }}>New Game</button>

        <button style={{position: 'absolute', left: '30%', top: '50%'}} onClick={() => {
          clickHandler(event.target.innerText);
        }}>Load Game</button>
    </div>
  );
}

export default TitleScreen;