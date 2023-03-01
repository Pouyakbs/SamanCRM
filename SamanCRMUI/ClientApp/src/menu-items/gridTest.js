// assets
import { DashboardOutlined, TeamOutlined , CalculatorOutlined } from '@ant-design/icons';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import GridOnIcon from '@mui/icons-material/GridOn';
// icons
const icons = {
    DashboardOutlined,
    TeamOutlined,
    GridOnIcon,
    CalculatorOutlined,
    GroupsOutlinedIcon,
    EmojiEventsOutlinedIcon
};
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
const gridTest = {
    id: 'gridTest',
    title: 'Grid Test',
    type: 'item',
    url: '/grid-test',
    icon: icons.GridOnIcon,
    breadcrumbs: true
};

export default gridTest;
