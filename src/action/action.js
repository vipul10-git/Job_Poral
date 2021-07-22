export const GETDATA = 'GETDATA';

export function apiCall(offset){
  return (dispatch)=>{
    dispatch({type:GETDATA,payload : offset});
  }
}
