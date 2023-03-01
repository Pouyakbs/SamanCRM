// assets
import { HomeOutlined , InfoCircleOutlined , IdcardOutlined , UserAddOutlined , SisternodeOutlined } from '@ant-design/icons';

// icons
const icons = {
    HomeOutlined,
    InfoCircleOutlined,
    IdcardOutlined,
    UserAddOutlined,
    SisternodeOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const baseInfo = {
    id: 'Basic Information',
    title: 'Basic Information',
    type: 'MegaGroup',
    icon: icons.InfoCircleOutlined,
    children: [
        {
            id: 'Meeting Location List',
            title: 'Meeting Location List',
            type: 'item',
            url: '/BaseInfo/MeetingPlacesManagement',
            icon: icons.HomeOutlined,
            breadcrumbs: true
        },
        {
            id: 'Organization Structure',
            title: 'Organization Structure',
            type: 'item',
            url: '/BaseInfo/Personnels/PersonnelTreeView',
            icon: icons.IdcardOutlined,
            breadcrumbs: true
        },
        {
            id: 'Personnel List',
            title: 'Personnel List',
            type: 'item',
            url: '/BaseInfo/Personnels/PersonnelManagement',
            icon: icons.UserAddOutlined,
            breadcrumbs: true
        },
        {
            id: 'Organization Chart',
            title: 'Organization Chart',
            type: 'item',
            url: '/BaseInfo/Personnels/OrgChart',
            icon: icons.SisternodeOutlined,
            breadcrumbs: true
        },
    ]
};

export default baseInfo;