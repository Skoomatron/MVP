import React, {useEffect} from 'react';
import {changeView, allCharacters} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import axios from 'axios';

const LoadScreen = () => {

  const [viewValue, setView] = useRecoilState(changeView);
  const [charactersValue, setCharacters] = useRecoilState(changeView);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = () => {
    const characters = axios.get('/retrieve')
    .then((response) => {
      console.log(response, 'this is response in getCharacters')
      setCharacters(response.body)
      console.log(charactersValue)
    })
    .catch((error) => {
      console.log(error, 'error in getCharacters')
    })

  }

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