import { GETDATA, GET_USER_SELECT, CLEAR, GITHUB_USER_SUCCESS} from '../action/action';
import { Data } from '../client/util/constants';

let initialState = {
  data: [],
  totalItem: 0,
  gitHubUserData : []
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GETDATA:
      {
        let dataX = [];
        for (let i = action.payload - 1; i < action.payload + 199; i++) {
          dataX.push(Data[i])
        }
        return {
          data: dataX,
          totalItem: Data.length
        }
      }
    case GET_USER_SELECT:
      {
        let dataX = [];
        for (let i = 0; i < action.payload.length; i++) {
          dataX.push(Data[action.payload[i]-1])
        }
        return {
          data: dataX,
          totalItem: dataX.length
        }
      }
      case CLEAR:
        return {
          data: [],
          totalItem: [],
          gitHubUserData:[]
        }
      case GITHUB_USER_SUCCESS:{
        return{
          gitHubUserData : action.payload
        }
      }
    default:
      return state
  }
}
