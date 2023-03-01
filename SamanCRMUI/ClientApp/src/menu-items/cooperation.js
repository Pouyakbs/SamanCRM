// assets
import { CheckOutlined , FieldTimeOutlined , LineChartOutlined , ProjectOutlined } from '@ant-design/icons';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';

// icons
const icons = {
    CheckOutlined,
    FieldTimeOutlined,
    LineChartOutlined,
    ProjectOutlined,
    HandshakeOutlinedIcon,

};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const cooperation = {
    id: 'Cooperation',
    title: 'Cooperation',
    type: 'MegaGroup',
    icon: icons.HandshakeOutlinedIcon,
    children: [
        {
            id: 'Confirmation List',
            title: 'Confirmation List',
            type: 'item',
            url: '/Cooperation/Confrimation/NewConfrimation',
            icon: icons.CheckOutlined,
            breadcrumbs: true
        },
        {
            id: 'Time Sheet',
            title: 'Time Sheet',
            type: 'item',
            url: '/',
            icon: icons.FieldTimeOutlined,
            breadcrumbs: false
        },
        {
            id: 'Target List',
            title: 'Target List',
            type: 'item',
            url: '/',
            icon: icons.LineChartOutlined,
            breadcrumbs: false
        },
        {
            id: 'Project List',
            title: 'Project List',
            type: 'item',
            url: '/Cooperation/Project/CreateProject',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        },
    ]
};

export default cooperation;