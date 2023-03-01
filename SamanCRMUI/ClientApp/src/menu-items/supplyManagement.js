// assets
import { ShopOutlined , ShoppingCartOutlined , UnorderedListOutlined , UsergroupAddOutlined } from '@ant-design/icons';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// icons
const icons = {
    ShopOutlined,
    ShoppingCartOutlined,
    UnorderedListOutlined,
    UsergroupAddOutlined,
    Inventory2OutlinedIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const supplyManagement = {
    id: 'inventory Management',
    title: 'inventory Management',
    type: 'MegaGroup',
    icon: icons.Inventory2OutlinedIcon,
    children: [
        {
            id: 'Create Product',
            title: 'Create Product',
            type: 'item',
            url: '/inventory-management/product/create-product',
            icon: icons.ShopOutlined,
            breadcrumbs: true
        },
        {
            id: 'Product Categories List',
            title: 'Product Categories List',
            type: 'item',
            url: '/inventory-management/productCategories/ProductCategoriesManagement',
            icon: icons.UnorderedListOutlined,
            breadcrumbs: true
        },
        {
            id: 'Order List',
            title: 'Order List',
            type: 'item',
            url: '/inventory-management/purchase-orders/create-order',
            icon: icons.ShoppingCartOutlined,
            breadcrumbs: true
        },
        {
            id: 'Supplier List',
            title: 'Supplier List',
            type: 'item',
            url: '/inventory-management/suppliers/SupplierManagement',
            icon: icons.UsergroupAddOutlined,
            breadcrumbs: true
        },
    ]
};

export default supplyManagement;