import React from 'react';
import {changeView} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';

const LoadScreen = () => {

  const [viewValue, setView] = useRecoilState(changeView);

  const clickHandler = () => {
    setView('battle')
  }

  return (
    <div style={{height: '100vw', width: '100vw', background: 'brown'}}>
      <div style={{top: '50%', left: '50%', bottom: '50%', right: '50%', width: '50vw', height: '50vw', backgroundColor: 'black'}}>

      </div>
      <button onClick={() => {
        clickHandler();
      }}>Load Data</button>
      <button onClick={() => {
        console.log('for later')
      }}>Delete Data</button>
    </div>
  );
}

export default LoadScreen;