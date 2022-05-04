import React, {useState} from 'react';
import {changeView, currentCharacter} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import {GiCurvyKnife} from 'react-icons/gi';
import {monsters} from '../Assets/assets.js';
import axios from 'axios';

const BattleScreen = () => {

  const [currentCharValue, setCurrentChar] = useRecoilState(currentCharacter);
  const [viewValue, setView] = useRecoilState(changeView);
  const [enemyHealthValue, setEnemyHealth] = useState(monsters[0].health);
  const [playerHealthValue, setPlayerHealth] = useState(currentCharValue.health);
  const [enemyRatio, setEnemyRatio] = useState(1);
  const [playerRatio, setPlayerRatio] = useState(1);

  const clickHandler = () => {
    setView('title')
  }

  const attackButton = () => {
    setEnemyHealth(enemyHealthValue - currentCharValue.attack);
    setPlayerHealth(playerHealthValue - monsters[0].attack);
    setEnemyRatio(enemyHealthValue / monsters[0].health);
    setPlayerRatio(playerHealthValue / currentCharValue.health);
    if (enemyHealthValue <= 0) {
      axios.post('/gain', {_id: currentCharValue._id, experience: monsters[0].experience})
      .then((response) => {
        console.log(currentCharValue.experience, 'this is experience')
        console.log('response in level up')
      })
      .catch((error) => {
        console.log('error gaining experience, contact you adminstrator')
      })
    } else if (playerHealthValue <= 0) {
      console.log('sucks to suck booooiiiii')
    }

  }

  return (
    <div style={{height: '100vw', width: '100vw', background: 'blue'}}>

      <div style={{border: '10px solid grey', borderRadius: '25px', position: 'absolute', left: '5%', backgroundColor: 'black', width: '90vw', height: '40vw'}}>

        <div style={{zIndex: 2, position: 'absolute', bottom: '2%', right: '2%', backgroundColor: 'green', width: `${playerRatio * 40}%`, height: '20px' }}></div>
        <div style={{position: 'absolute', bottom: '2%', right: '2%', backgroundColor: 'red', width: '40%', height: '20px' }}></div>

        <div style={{zIndex: 2, position: 'absolute', bottom: '2%', left: '2%', backgroundColor: 'green', width: `${enemyRatio * 40}%`, height: '20px' }}></div>
        <div style={{position: 'absolute', bottom: '2%', left: '2%', backgroundColor: 'red', width: '40%', height: '20px' }}></div>

        <div onClick={() => {
          attackButton();
        }}
        style={{position: 'absolute', bottom: '2%', right: '45%', height: '10%', width: '10%', backgroundColor: 'blue', border: '3px solid grey', borderRadius: '25px'}}>
          <GiCurvyKnife style={{
            color: 'red', position: 'absolute',
            left: '10%', bottom: '15%',
            height: '85%', width: '80%'}}/>
        </div>
      </div>

      <div style={{borderRadius: '50px', backgroundColor: 'green', position: 'absolute', right: '10%', top: '30%', zIndex: '5', height: '10%', width: '10%'}}></div>
      <div style={{borderRadius: '50px', backgroundColor: 'red', position: 'absolute', left: '10%', top: '30%', zIndex: '5', height: '10%', width: '10%'}}></div>



      <button style={{border: '10px solid grey', backgroundColor: 'black', color: 'white', fontSize: '24px',
        fontWeight: 'bold', borderRadius: '25px', position: 'absolute', left: '45%', bottom: '0%', height: '10%', width: '20%'}} onClick={() => {
        clickHandler();
      }}>Save And Exit</button>

    </div>
  );
}

export default BattleScreen;