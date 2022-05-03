import React from 'react';
import {changeView, currentCharacter} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import {GiCurvyKnife} from 'react-icons/gi';
const BattleScreen = () => {

  const [currentCharValue, setCurrentChar] = useRecoilState(currentCharacter);
  const [viewValue, setView] = useRecoilState(changeView);

  const clickHandler = () => {
    setView('title')
  }

  return (
    <div style={{height: '100vw', width: '100vw', background: 'blue'}}>
      <div style={{border: '10px solid grey', borderRadius: '25px', position: 'absolute', left: '5%', backgroundColor: 'black', width: '90vw', height: '40vw'}}>
        <div style={{zIndex: 2, position: 'absolute', bottom: '2%', right: '2%', backgroundColor: 'green', width: '40vw', height: '20px' }}>Health</div>
        <div style={{position: 'absolute', bottom: '2%', right: '2%', backgroundColor: 'red', width: '40vw', height: '20px' }}>Health</div>
        <div style={{position: 'absolute', bottom: '2%', right: '48%', height: '10%', width: '10%', backgroundColor: 'blue', border: '3px solid grey', borderRadius: '25px'}}>
          <GiCurvyKnife style={{color: 'red', position: 'absolute', left: '10%', bottom: '15%', height: '85%', width: '80%'}}/>
        </div>
      </div>
      <button style={{position: 'absolute', top: '5%', right: '2%'}} onClick={() => {
        clickHandler();
      }}>Save And Exit</button>
    </div>
  );
}

export default BattleScreen;