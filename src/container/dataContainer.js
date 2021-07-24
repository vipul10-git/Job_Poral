import { useSelector, shallowEqual } from 'react-redux';

export default function DataContainer() {
  let { jobDataSet, totalItem, gitHubUserData } = useSelector((state) => ({
    jobDataSet: state.data,
    totalItem: state.totalItem,
    gitHubUserData: state.gitHubUserData
  }), shallowEqual)
  return { jobDataSet, totalItem, gitHubUserData }
}
