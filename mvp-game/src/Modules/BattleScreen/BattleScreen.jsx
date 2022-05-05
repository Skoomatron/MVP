import React, {useState} from 'react';
import {changeView, currentCharacter} from '../../Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';
import {GiCurvyKnife} from 'react-icons/gi';
import {monsters} from '../Assets/assets.js';
import axios from 'axios';
import Sprites from '../Assets/SpriteSheets/chara6.png';
import Orcs from '../Assets/SpriteSheets/orc2.png';
import Cave from '../Assets/SpriteSheets/cave.png';
import Forest from '../Assets/SpriteSheets/forest.png';
import styled, {keyframes} from 'styled-components';

const BattleScreen = () => {

  const [monsterIndex, setMonsterIndex] = useState(0);
  const [currentCharValue, setCurrentChar] = useRecoilState(currentCharacter);
  const [viewValue, setView] = useRecoilState(changeView);
  const [enemyHealthValue, setEnemyHealth] = useState(monsters[0].level1[monsterIndex].health);
  const [playerHealthValue, setPlayerHealth] = useState(currentCharValue.health);
  const [enemyRatio, setEnemyRatio] = useState(1);
  const [playerRatio, setPlayerRatio] = useState(1);
  const [modalValue, setModal] = useState('none');
  const [toggleValue, setToggle] = useState('false');

  const handleToggle = () => {
    setToggle(!toggleValue);
  }

  const attackButton = () => {
    handleToggle()

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
      setModal('block')
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
  }

  const modalClick = () => {
    setModal('none')
    setView('load')
  }


  return (
    <div style={{
      position: 'relative', height: '60vw',
      width: '100vw', backgroundSize: 'cover',
      backgroundImage: `url(${Forest}`}}>

        <div style={{
          display: `${modalValue}`, height: '200px', border: '3px solid grey',
          width: '444px', color: 'white', zIndex: '10', position: 'absolute', lineHeight: '200px',
          backgroundColor: 'blue', top: '30%', left: '45%', fontSize: '42px',
          justifyContent: 'center', textAlign: 'center', fontWeight: 'bold'}}>
          You Have Ceased To Be
          <button style={{
            positions: 'absolute', bottom: '1%', left: '45%',
            borderRadius: '25px', height: '50px', width: '100px',
            color: 'black', fontWeight: 'bold', fontSize: '24px'}} onClick={() => {
            modalClick();
          }}>Exit</button>
        </div>

      <div style={{
        overflow: 'hidden', border: '10px solid grey',
        borderRadius: '25px', position: 'absolute', left: '5%',
        backgroundImage: `url(${Cave})`, width: '90vw', height: '30vw'}}>

        <div style={{
          height: '70px', width: '95%', backgroundColor: 'black', borderRadius: '25px',
          border: '2px solid grey', color: 'white', textWeight: 'bold', marginLeft: '2.5%',
          textAlign: 'center', lineHeight: '70px', justifyContent: 'center', fontSize: '24px'}}>
          Character [ {currentCharValue.name} ]
          Level [ {currentCharValue.level} ]
          Attack [ {Math.floor(currentCharValue.attack)} ]
          Health [ {Math.floor(currentCharValue.health)} ]
          Experience [ {currentCharValue.experience} ]
        </div>

        <div style={{
          zIndex: 2, position: 'absolute', bottom: '2%',
          right: '2%', backgroundColor: 'green', width: `${playerRatio * 40}%`,
          height: '20px' }}></div>
        <div style={{
          position: 'absolute', bottom: '2%',
          border: '3px solid gray', right: '2%', backgroundColor: 'red',
          width: '40%', height: '20px' }}></div>

        <div style={{
          zIndex: 2, position: 'absolute', bottom: '2%',
          left: '2%', backgroundColor: 'green', width: `${enemyRatio * 40}%`,
          height: '20px' }}></div>
          <div style={{
            position: 'absolute', bottom: '2%', border: '3px solid gray',
            left: '2%', backgroundColor: 'red', width: '40%', height: '20px' }}></div>

        <div onClick={() => {
          attackButton();
        }}
        style={{
          position: 'absolute', bottom: '2%', right: '45%',
          height: '10%', width: '10%', backgroundColor: 'black',
          border: '3px solid grey', borderRadius: '25px'}}>

          <GiCurvyKnife style={{
            color: 'red', position: 'absolute',
            left: '10%', bottom: '15%',
            height: '85%', width: '80%'}}/>

        </div>
      </div>

      <button style={{
        border: '10px solid grey', backgroundColor: 'black',
        color: 'white', fontSize: '24px', fontWeight: 'bold',
        borderRadius: '25px', position: 'absolute', left: '45%',
        bottom: '43%', height: '5%', width: '10%'}} onClick={() => {
          setView('title');
      }}>Flee</button>

      <Monster>
        <MonsterSheet style={{
          backgroundImage: `url(${Orcs})`,}}></MonsterSheet>
      </Monster>

      <Character>
        <CharacterSheet style={{
          backgroundImage: `url(${Sprites})`}}></CharacterSheet>
      </Character>

    </div>
  );
}


const pixelSize = 5;

const moveSprite = keyframes`
from {
  transform: translate3d(0px, 0, 0);
}
to {
  transform: translate3d(-28%, 0, 0);
}
`;

const attackAnimation = keyframes`
  from {
    transform: translate(0%, 0, 0)
  }
  to {
    transform:  translate(100%, 0, 400px)
  }
`

const Character = styled.div`
  width: calc(30px * ${pixelSize});
  height: calc(50px * ${pixelSize});
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  left: 80vw;
  top: -3vw;
`;

const spriteOptions = `1s steps(3) infinite`;

const CharacterSheet = styled.div`
  animation: ${moveSprite} ${spriteOptions};
  width: calc(360px * ${pixelSize});
  height: calc(360px * ${pixelSize});
  image-rendering: pixelated;
  background-size: cover;
  position: absolute;
  background-repeat: no-repeat;
  left: 0vw;
  top: -9vw;
`;

const Monster = styled.div`
  width: calc(30px * ${pixelSize});
  height: calc(50px * ${pixelSize});
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  left: 10vw;
  top: 12vw;
`;
// overflow: hidden;

const MonsterSheet = styled.div`
  animation: ${moveSprite} ${spriteOptions};
  width: calc(360px * ${pixelSize});
  height: calc(360px * ${pixelSize});
  image-rendering: pixelated;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  right: -34vw;
  top: -18vw;
`;

export default BattleScreen;