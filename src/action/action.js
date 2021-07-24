export const GETDATA = 'GETDATA';
export const GET_USER_SELECT = "GET_USER_SELECT";
export const CLEAR ="CLEAR";
export const GITHUB_USER_SUCCESS = "GITHUB_USER_SUCCESS"
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

export function getUserGithubdata(data){
  return (dispatch)=>{
    fetch(`https://api.github.com/users/${data}/repos`).then(resp => resp.json()).then(res => {
      let data = []
      res && res.length > 0 && res.forEach(element => {
          data.push({ name: element.full_name, gitUrl: element.html_url })
      });
      dispatch({type:GITHUB_USER_SUCCESS,payload : data});
  })
  }
}
