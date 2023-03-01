// assets
import { DashboardOutlined, TeamOutlined , CalculatorOutlined , IdcardOutlined } from '@ant-design/icons';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
// icons
const icons = {
    DashboardOutlined,
    TeamOutlined,
    CalculatorOutlined,
    GroupsOutlinedIcon,
    EmojiEventsOutlinedIcon,
    IdcardOutlined
};
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
const dashboard = {
    id: 'Accounts',
    title: 'Accounts',
    type: 'MegaGroup',
    icon: icons.CalculatorOutlined,
    children: [
        {
            id: 'Account List',
            title: 'Account List',
            type: 'item',
            url: '/accounts/AccountManagement',
            icon: icons.TeamOutlined,
            breadcrumbs: true
        },
        {
            id: 'People List',
            title: 'People List',
            type: 'item',
            url: '/accounts/people/PersonManagement',
            icon: icons.GroupsOutlinedIcon,
            breadcrumbs: true
        },
        {
            id: 'Competitor List',
            title: 'Competitor List',
            type: 'item',
            url: '/accounts/Competitor/CompetitorManagement',
            icon: icons.EmojiEventsOutlinedIcon,
            breadcrumbs: true
        },
    ]
};

export default dashboard;
