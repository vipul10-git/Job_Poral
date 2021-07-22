import {useSelector, shallowEqual} from 'react-redux';

export default function Container(){
  let {jobDataSet, totalItem} = useSelector((state)=>({
    jobDataSet : state.data,
    totalItem : state.totalItem
  }),shallowEqual)
  return {jobDataSet, totalItem}
}
