// assets
import { ChromeOutlined, QuestionOutlined , CalendarOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
    CalendarOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'Planning Calendar',
    title: 'Planning Calendar',
    type: 'MegaGroup',
    icon: icons.CalendarOutlined,
    children: [
        {
            id: 'Calendar',
            title: 'Calendar',
            type: 'item',
            url: '/',
            icon: icons.CalendarOutlined,
            breadcrumbs: false
        },
    ]
};

export default support;
