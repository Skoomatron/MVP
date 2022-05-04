import React, {useEffect, useState} from 'react';
import {changeView, currentCharacter} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import axios from 'axios';

const LoadScreen = () => {

  const [currentCharValue, setCurrentChar] = useRecoilState(currentCharacter);
  const [viewValue, setView] = useRecoilState(changeView);
  const [charactersValue, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = () => {
    const characters = axios.get('/retrieve')
    .then((response) => {
      setCharacters(response.data)
    })
    .catch((error) => {
      console.log(error, 'error in getCharacters')
    })
  }

  const clickHandler = (id, index) => {
    if (id === null) {
      setCurrentChar(charactersValue[index])
      setView('battle')
    } else {
      axios.post('/delete', {_id: id})
      .then((response) => {
        console.log('Character Deleted')
      })
      .catch((error) => {
        console.log('Failed to Delete Character')
      })
    }
    getCharacters();
  }

  return (
    <div style={{height: '100vw', width: '100vw', background: 'blue'}}>
      <div style={{border: '10px solid grey', padding: '30px', borderRadius: '25px', position: 'absolute', top: '25%', left: '25%', width: '50vw', height: '25vw', backgroundColor: 'black'}}>
      {charactersValue.map((value, index) => {
        return (
          <div>
          <div key={value._id} style={{color: 'white'}}>Name: {value.name} Level: {value.level} Experience: {value.experience}</div>
          <button onClick={() => {
            clickHandler(null, index);
          }}>Load Data</button>
          <button onClick={() => {
            clickHandler(value._id);
          }}>Delete Data</button>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default LoadScreen;