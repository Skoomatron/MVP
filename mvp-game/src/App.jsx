import BattleScreen from './Modules/BattleScreen/BattleScreen.jsx';
import TitleScreen from './Modules/TitleScreen/TitleScreen.jsx';
import LoadScreen from './Modules/LoadScreen/LoadScreen.jsx';
import NewGame from './Modules/NewGame/NewGame.jsx';
import React from 'react';
import {changeView} from './Atoms/Atoms.jsx';
import {useRecoilState} from 'recoil';


const App = () => {

  const [viewValue, setView] = useRecoilState(changeView);

  if (viewValue === 'title') {
    return <TitleScreen/>;
  } else if (viewValue === 'new') {
    return <NewGame/>;
  } else if (viewValue === 'load') {
    return <LoadScreen/>;
  } else if (viewValue === 'battle') {
    return <BattleScreen/>
  }
}

export default App;
