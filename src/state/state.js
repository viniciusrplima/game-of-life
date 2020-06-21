import { createStore, combineReducers } from 'redux';
import playReducer from './reducers/playReducer';
import toolsReducer from './reducers/toolsReducer';
import patternReducer from './reducers/patternReducer';

const allReducers = combineReducers({
  play: playReducer, 
  tool: toolsReducer, 
  pattern: patternReducer
})

export const controls = createStore(allReducers);

export const game = {
  scale: 2, 
  position: {
    x: 0, 
    y: 0
  }, 
  mouse: {
    down: false, 
    position: {
      i: -1, 
      j: -1
    }
  }, 
  clean: false
};
