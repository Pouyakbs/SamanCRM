// assets
import { MonitorOutlined , BulbOutlined , FileSyncOutlined , FileDoneOutlined , CreditCardOutlined , WalletOutlined , AuditOutlined , DollarOutlined  } from '@ant-design/icons';

// icons
const icons = {
    MonitorOutlined,
    BulbOutlined,
    FileSyncOutlined,
    FileDoneOutlined,
    CreditCardOutlined,
    WalletOutlined,
    AuditOutlined,
    DollarOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const sales = {
    id: 'Sale',
    title: 'Sale',
    type: 'MegaGroup',
    icon: icons.DollarOutlined,
    children: [
        {
            id: 'Clue List',
            title: 'Clue List',
            type: 'item',
            url: '/sale/Clues/ClueManagement',
            icon: icons.MonitorOutlined,
            breadcrumbs: true
        },
        {
            id: 'Opportunities',
            title: 'Opportunities',
            type: 'item',
            url: '/sale/Opportunities/NewOpportunities',
            icon: icons.BulbOutlined,
            breadcrumbs: true
        },
       
        
        {
            id: 'Invoice',
            title: 'Invoice',
            type: 'item',
            url: '/sale/Invoice/InvoiceManagement',
            icon: icons.FileDoneOutlined,
            breadcrumbs: true
        },
        {
            id: 'PreInvoice',
            title: 'PreInvoice',
            type: 'item',
            url: '/sale/PreInvoice/PreInvoiceManagement',
            icon: icons.FileDoneOutlined,
            breadcrumbs: true
        },
        {
            id: 'Payments',
            title: 'Payments',
            type: 'item',
            url: '/sale/Payment/PaymentManagement',
            icon: icons.CreditCardOutlined,
            breadcrumbs: true
        },
        {
            id: 'Deposit List',
            title: 'Deposit List',
            type: 'item',
            url: '/sale/Deposit/createDeposit',
            icon: icons.WalletOutlined,
            breadcrumbs: true
        },
        {
            id: 'Contract List',
            title: 'Contract List',
            type: 'item',
            url: '/sale/SaleContract/createSaleContract',
            icon: icons.AuditOutlined,
            breadcrumbs: true
        },
    ]
};

export default sales;