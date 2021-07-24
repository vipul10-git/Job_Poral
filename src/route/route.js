import { Route ,Switch,BrowserRouter} from 'react-router-dom';
import React from 'react';
import { RouteList } from './routeList';
import { setTheme } from '../client/util/constFun';
const RoutePage = () => {

    return (
        <BrowserRouter>
        {setTheme()}
            <Switch>
            {RouteList.map((routeData,index) => {
                return <Route path={routeData.path} key={index} render={() => {
                        return <routeData.component />
                }} />
            })}
            </Switch>
        </BrowserRouter>
    )
}

export default RoutePage