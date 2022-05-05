import React, {useEffect, useState} from 'react';
import {changeView, currentCharacter} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import Waterfall from '../Assets/SpriteSheets/waterfall2.png';


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
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', height: '60vw',
      width: '100vw', backgroundSize: 'cover',
      backgroundImage: `url(${Waterfall}`}}>

        <div style={{
          border: '10px solid grey', overflow: 'auto',
          padding: '30px', borderRadius: '25px',
          width: '50vw', height: '25vw',
          backgroundColor: 'black'}}>
        {charactersValue.map((value, index) => {
          return (
            <div>
            <div key={value._id} style={{color: 'white', fontSize: '42px'}}>
              Name: [ {value.name} ]
              Level: [ {value.level} ]
              Experience: [ {value.experience} ]</div>
            <button style={{height: '40px', width: '200px', fontSize: '24px', borderRadius: '25px'}} onClick={() => {
              clickHandler(null, index);
            }}>Load Data</button>
            <button style={{height: '40px', width: '200px', fontSize: '24px', borderRadius: '25px'}} onClick={() => {
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