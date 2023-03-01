// assets
import { AreaChartOutlined , ReconciliationOutlined } from '@ant-design/icons';

// icons
const icons = {
    AreaChartOutlined,
    ReconciliationOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const report = {
    id: 'Reports',
    title: 'Reports',
    type: 'MegaGroup',
    icon: icons.AreaChartOutlined,
    children: [
        {
            id: 'Advanced Reports List',
            title: 'Advanced Reports List',
            type: 'item',
            url: '/',
            icon: icons.AreaChartOutlined,
            breadcrumbs: false
        },
        {
            id: 'Analysis List',
            title: 'Analysis List',
            type: 'item',
            url: '/',
            icon: icons.ReconciliationOutlined,
            breadcrumbs: false
        },
    ]
};

export default report;