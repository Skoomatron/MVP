import React from 'react';
import {changeView} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';

const BattleScreen = () => {

  const [viewValue, setView] = useRecoilState(changeView);

  const clickHandler = () => {
    setView('title')
  }

  return (
    <div style={{height: '100vw', width: '100vw', background: 'brown'}}>
      <div style={{backgroundColor: 'black', width: '90vw', height: '1000px'}}>

      </div>
      <button style={{position: 'absolute', top: '5%', right: '2%'}} onClick={() => {
        clickHandler();
      }}>Save And Exit</button>
    </div>
  );
}

export default BattleScreen;