import { useRoutes } from 'react-router-dom';
import axios from "axios";
// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import PrintRoute from './PrintRoute';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, LoginRoutes,PrintRoute]);
}
