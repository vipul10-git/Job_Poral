export const GETDATA = 'GETDATA';
export const GET_USER_SELECT = "GET_USER_SELECT";
export const CLEAR ="CLEAR";

export function getListingData(offset){
  return (dispatch)=>{
    dispatch({type:GETDATA,payload : offset});
  }
}

export function getUserSelectedList(list){
  return (dispatch)=>{
    dispatch({type:GET_USER_SELECT,payload : list});
  }
}

export function clearReducer(list){
  return (dispatch)=>{
    dispatch({type:CLEAR,payload : {}});
  }
}
