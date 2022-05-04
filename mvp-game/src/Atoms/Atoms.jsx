import {atom} from 'recoil';

export const changeView = atom({
  key: 'changeView',
  default: 'title',
})

export const characterName = atom({
  key: 'characterName',
  default: '',
})

export const currentCharacter =  atom({
  key: 'currentCharacter',
  default: {},
})

