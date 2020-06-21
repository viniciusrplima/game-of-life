

export default function patternReducer(state = { page:0, item:-1 }, action) {
  
  switch(action.type) {
    case 'SET_PAGE':
      state.page = action.payload;
      return state;
    case 'SET_ITEM':
      state.item = action.payload;
      return state;
    default:
      return state;
  }
}
