// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    OrderedListOutlined,
    LoadingOutlined,
    FundProjectionScreenOutlined,
    PhoneOutlined,
    FormOutlined,
    MailOutlined,
    CommentOutlined,
    SolutionOutlined
} from '@ant-design/icons';

// icons
const icons = {
    PhoneOutlined,
    FundProjectionScreenOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    OrderedListOutlined,
    FormOutlined,
    MailOutlined,
    CommentOutlined,
    SolutionOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'Activities',
    title: 'Activities',
    type: 'MegaGroup',
    icon: icons.SolutionOutlined,
    children: [
        {
            id: 'Contact List',
            title: 'Contact List',
            type: 'item',
            url: '/Activities/Contact/ContactManagement',
            icon: icons.PhoneOutlined,
            breadcrumbs: true
        },
        {
            id: 'Create Meeting',
            title: 'Create Meeting',
            type: 'item',
            url: '/Activities/Meeting/SessionManagement',
            icon: icons.FundProjectionScreenOutlined,
            breadcrumbs: true
        },
        {
            id: 'Create Duty',
            title: 'Create Duty',
            type: 'item',
            url: '/Activities/Duty/DutyManagement',
            icon: icons.OrderedListOutlined,
            breadcrumbs: true
        },
        {
            id: 'Note List',
            title: 'Note List',
            type: 'item',
            url: '/Activities/note/NoteManagement',
            icon: icons.FormOutlined,
            breadcrumbs: true
        },
        {
            id: 'Email',
            title: 'Email',
            type: 'item',
            url: '/',
            icon: icons.MailOutlined,
            breadcrumbs: false
        },
        {
            id: 'Messages',
            title: 'Messages',
            type: 'item',
            url: '/',
            icon: icons.CommentOutlined,
            breadcrumbs: false
        },
    ]
};

export default utilities;
