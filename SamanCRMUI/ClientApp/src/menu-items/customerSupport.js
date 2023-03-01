// assets
import { SolutionOutlined } from '@ant-design/icons';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
// icons
const icons = {
    SolutionOutlined,
    SupportAgentOutlinedIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const customerSupport = {
    id: 'Customer Support',
    title: 'Customer Support',
    type: 'MegaGroup',
    icon: icons.SupportAgentOutlinedIcon,
    children: [
        {
            id: 'Support',
            title: 'Support',
            type: 'item',
            url: '/Support/Support/SupportManagement',
            icon: icons.SolutionOutlined,
            breadcrumbs: true
        },
    ]
};

export default customerSupport;