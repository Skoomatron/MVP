import BattleScreen from './Modules/BattleScreen/BattleScreen.jsx';
import TitleScreen from './Modules/TitleScreen/TitleScreen.jsx';
import LoadScreen from './Modules/LoadScreen/LoadScreen.jsx';
import NewGame from './Modules/NewGame/NewGame.jsx';
import React from 'react';


const App = () => {


  return (
    <div>
      <TitleScreen/>
      <NewGame/>
      <LoadScreen/>
      <BattleScreen/>
    </div>
  );
}

export default App;
