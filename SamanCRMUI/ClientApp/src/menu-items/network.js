// assets
import { RocketOutlined , WhatsAppOutlined , MessageOutlined , NotificationOutlined } from '@ant-design/icons';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

// icons
const icons = {
    RocketOutlined,
    WhatsAppOutlined,
    MessageOutlined,
    CampaignOutlinedIcon,
    NotificationOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const network = {
    id: 'Marketing',
    title: 'Marketing',
    type: 'MegaGroup',
    icon: icons.RocketOutlined,
    children: [
        {
            id: 'Campaign',
            title: 'Campaign',
            type: 'item',
            url: '/marketing/Campaign/newCampaign',
            icon: icons.NotificationOutlined,
            breadcrumbs: true
        },
        {
            id: 'Connection',
            title: 'Connection',
            type: 'item',
            url: '/marketing/connections/ConnectionsManagement',
            icon: icons.WhatsAppOutlined,
            breadcrumbs: true
        },   {
            id: 'FeedBack',
            title: 'FeedBack',
            type: 'item',
            url: '/marketing/FeedBack/newFeedBack',
            icon: icons.MessageOutlined,
            breadcrumbs: true
        },
    ]
};

export default network;
