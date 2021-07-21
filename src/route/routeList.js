import Login from '../client/pages/loginPage';
import JobListing from '../client/pages/jobListingPage';
import LandingPage from '../client/routing';
export const RouteList = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/job-listing',
        component: JobListing,
    },{
        path: '/',
        component: LandingPage,
    },
]