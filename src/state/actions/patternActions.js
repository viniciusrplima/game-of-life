
export default {
  
  setPage: page => ({
    type: 'SET_PAGE', 
    payload: page
  }), 
  
  setItem: item => ({
    type: 'SET_ITEM', 
    payload: item
  })
}
