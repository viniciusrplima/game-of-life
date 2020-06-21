
export default function toolsReducer(state = 'PATTERN', action) {

  switch(action.type) {
    case 'SET': 
      return action.payload;
    default:
      return state;
  }
}
