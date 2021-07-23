import Login from '../client/pages/loginPage';
import JobListing from '../client/pages/jobListingPage';
import LandingPage from '../client/routing';
import UserProfile from '../client/pages/userProfile';

export const RouteList = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/job-listing',
        component: JobListing,
    },
    {
        path :'/user-profile',
        component: UserProfile,

    },
    {
        path: '/',
        component: LandingPage,
    }
]