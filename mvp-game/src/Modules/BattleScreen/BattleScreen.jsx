import React, {useState} from 'react';
import {changeView, currentCharacter} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import {GiCurvyKnife} from 'react-icons/gi';
import {monsters} from '../Assets/assets.js';
import axios from 'axios';

const BattleScreen = () => {

  const [monsterIndex, setMonsterIndex] = useState(0);
  const [currentCharValue, setCurrentChar] = useRecoilState(currentCharacter);
  const [viewValue, setView] = useRecoilState(changeView);
  const [enemyHealthValue, setEnemyHealth] = useState(monsters[0].level1[monsterIndex].health);
  const [playerHealthValue, setPlayerHealth] = useState(currentCharValue.health);
  const [enemyRatio, setEnemyRatio] = useState(1);
  const [playerRatio, setPlayerRatio] = useState(1);

  const attackButton = () => {
    console.log(monsters[0].level1[monsterIndex].name, monsters[0].level1[monsterIndex].health, enemyHealthValue)
    setEnemyHealth(enemyHealthValue - currentCharValue.attack);
    setPlayerHealth(playerHealthValue - monsters[0].level1[monsterIndex].attack);

    setEnemyRatio(enemyHealthValue / monsters[0].level1[monsterIndex].health);
    setPlayerRatio(playerHealthValue / currentCharValue.health);

    if (enemyHealthValue <= 0) {
      axios.post('/gain', {_id: currentCharValue._id, experience: monsters[0].level1[monsterIndex].experience})
      .then((response) => {
        console.log(currentCharValue.name + ' gained a boosted')
      })
      .catch((error) => {
        console.log('experience lost to the void')
      })

      if (monsterIndex < 2) {
        let newIndex = monsterIndex + 1;
        setMonsterIndex(newIndex);
        setEnemyHealth(monsters[0].level1[newIndex].health);
        setEnemyRatio(1);
      } else if (monsterIndex === 2)  {
        setMonsterIndex(0)
        setEnemyHealth(monsters[0].level1[0].health);
        setEnemyRatio(1);
      }
    } else if (playerHealthValue <= 0) {
      console.log('sucks to suck booooiiiii')
    } else if (currentCharValue.experience >= 100) {
      let newAttack = currentCharValue.attack * 1.2;
      let newHealth = currentCharValue.health * 1.1;
      axios.post('/level', {_id: currentCharValue._id, experience: 0, attack: newAttack, health: newHealth})
      .then((response) => {
        console.log(currentCharValue.name + ' gained ' + Math.floor(newAttack) + ' attack ' + ' and ' + Math.floor(newHealth) + ' health!')
      })
      .catch((error) => {
        console.log('Level up lost to the void')
      })
    }
    setView('battle')
  }



  return (
    <div style={{height: '100vw', width: '100vw', background: 'blue'}}>

      <div style={{border: '10px solid grey', borderRadius: '25px', position: 'absolute', left: '5%', backgroundColor: 'black', width: '90vw', height: '40vw'}}>
        <div style={{color: 'white'}}>Level: {currentCharValue.level} Attack: {currentCharValue.attack} Health: {Math.floor(currentCharValue.health)} Experience: {currentCharValue.experience}</div>
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
      <div style={{borderRadius: '50px', backgroundColor: `${monsters[0].level1[monsterIndex].color}`, position: 'absolute', left: '10%', top: '30%', zIndex: '5', height: '10%', width: '10%'}}></div>



      <button style={{border: '10px solid grey', backgroundColor: 'black', color: 'white', fontSize: '24px',
        fontWeight: 'bold', borderRadius: '25px', position: 'absolute', left: '45%', bottom: '0%', height: '10%', width: '20%'}} onClick={() => {
          setView('title');
      }}>Save And Exit</button>

    </div>
  );
}

export default BattleScreen;