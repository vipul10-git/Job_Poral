import { Route ,Switch,BrowserRouter} from 'react-router-dom';
import React from 'react';
import { RouteList } from './routeList';
import { setTheme } from '../client/util/constants';
const RoutePage = () => {
    const SetTheme = () =>{
        if(sessionStorage.getItem('email') && localStorage.getItem(sessionStorage.getItem('email'))){
            let userData = localStorage.getItem(sessionStorage.getItem('email'));
            userData = JSON.parse(userData);
            setTheme(userData.selectedTheme);
        }  
        else{
            setTheme('theme-light')
        }
    }
    return (
        <BrowserRouter>
        {SetTheme()}
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