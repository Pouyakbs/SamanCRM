// assets
import { LoginOutlined, ProfileOutlined, UserOutlined, KeyOutlined, LockOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    UserOutlined,
    KeyOutlined,
    LockOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'Authentication',
    title: 'Authentication',
    type: 'MegaGroup',
    icon: icons.UserOutlined,
    children: [
        {
            id: 'Login',
            title: 'Login',
            type: 'item',
            url: '/login',
            icon: icons.LoginOutlined,
            breadcrumbs: false
        },
        {
            id: 'register',
            title: 'ثبت کاربر',
            type: 'item',
            url: '/register',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },
        {
            id: 'PasswordSettings',
            title: 'تنظیمات رمز عبور',
            type: 'item',
            url: '/PasswordSettings',
            icon: icons.KeyOutlined,
            breadcrumbs: false
        },
        {
            id: 'ChangePassword',
            title: 'تغییر رمز عبور',
            type: 'item',
            url: '/ChangePassword',
            icon: icons.LockOutlined,
            breadcrumbs: false
        },
        {
            id: 'GetAllUsers',
            title: 'نمایش کاربران',
            type: 'item',
            url: '/getAllUsers',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },
    ]
};

export default pages;
