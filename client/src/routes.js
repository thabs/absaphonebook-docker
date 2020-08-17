// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonAdd from '@material-ui/icons/PersonAdd';
// Features
import {Dashboard} from 'features/dashboard';
import {ProfileCreate} from 'features/profile';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/createprofile',
    name: 'Add Profile',
    icon: PersonAdd,
    component: ProfileCreate,
    layout: '/admin',
  },
];

export default dashboardRoutes;
