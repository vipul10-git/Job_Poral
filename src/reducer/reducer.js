import {GETDATA} from '../action/action';
import {Data } from '../client/util/constants';

let initialState = {
  data :[],
  totalItem:0
}
export function reducer(state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case GETDATA:
        let dataX = [];
        for(let i=action.payload-1;i<action.payload+199;i++){
            dataX.push(Data[i])
        }
      return {
        data:dataX,
        totalItem:Data.length
      }
    default:
      return state
  }
}
