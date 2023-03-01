import { element } from 'prop-types';
import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import loadable from "@loadable/component";
import { PrivateRoute } from '../components/PrivateRoute';
import MainLayout from '../layout/MainLayout';
import Loader from '../components/Loader';
import { HashRouter } from 'react-router-dom';
// import NewConfrimation from '../pages/Cooperation/NewConfrimation';
// import CreateProject from '../pages/Project/CreateProject';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard')));

// render - sale

const Payment = Loadable(lazy(() => import('../pages/sale/Payment/Payment')));
const PaymentManagement = Loadable(lazy(() => import('../pages/sale/Payment/PaymentManagement')));
const Deposit = Loadable(lazy(() => import('../pages/sale/Deposit/Deposit')));
const SaleContract = Loadable(lazy(() => import('../pages/sale/SaleContract/SellContract')));
const InvoiceForm = Loadable(lazy(() => import('../pages/sale/Invoice/InvoiceForm')));
const InvoiceManagement = Loadable(lazy(() => import('../pages/sale/Invoice/InvoiceManagement')));
const SalePreInvoice = Loadable(lazy(() => import('../pages/sale/preInvoice/PreInvoiceForm')));
const PreInvoiceManagement = Loadable(lazy(() => import('../pages/sale/preInvoice/PreInvoiceManagement')));
const LoadablePage = loadable((props) => import(`../pages/Accounts/Competitors/${props.page}`), {
    fallback: <Loader/>,
    cacheKey: (props) => props.page
  });

/// render - Activities
const CreateSessionForm = Loadable(lazy(() => import('../pages/Activities/CreateSession/CreateSession')));
const SessionManagement = Loadable(lazy(() => import('../pages/Activities/CreateSession/SessionManagement')));
const CreateDutyForm = Loadable(lazy(() => import('../pages/Activities/CreateDuty/CreateDuty')));
const DutyManagement = Loadable(lazy(() => import('../pages/Activities/CreateDuty/DutyManagement')));
const CreateContact = Loadable(lazy(() => import('../pages/Activities/Contact/CreateContact')));
const ContactManagement = Loadable(lazy(() => import('../pages/Activities/Contact/ContactManagement')));

///render - products
const ProductCreation = Loadable(lazy(() => import('../pages/supply-management/products/ProductCreation')));
const ProductManagement = Loadable(lazy(() => import('../pages/supply-management/products/ProductManagement')));

///render - purchase_orders
const PurchaseOrderManagement = Loadable(lazy(() => import('../pages/supply-management/purchase_orders/PurchaseOrderManagement')));
const PurchaseOrderCreation = Loadable(lazy(() => import('../pages/supply-management/purchase_orders/PurchaseOrderCreation')));


///render - product_categories
const ProductCategoriesCreation = Loadable(lazy(() => import('../pages/supply-management/product_categories/ProductCategoriesCreation')));
const ProductCategoriesManagement = Loadable(lazy(() => import('../pages/supply-management/product_categories/ProductCategoriesManagement')));
const SupplierCreation = Loadable(lazy(() => import('../pages/supply-management/suppliers/CreateSupplier')));
const SupplierManagement = Loadable(lazy(() => import('../pages/supply-management/suppliers/SupplierManagement')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/SamplePage')));


//render - Support page
const SupportForm = Loadable(lazy(() => import('../pages/support/support/Support')));
const SupportManagement = Loadable(lazy(() => import('../pages/support/support/SupportManagement')));
const Service = Loadable(lazy(() => import('../pages/support/support/Service/Service')));
const ServiceManagement = Loadable(lazy(() => import('../pages/support/support/Service/ServiceManagement')));
const SupportContract = Loadable(lazy(() => import('../pages/support/support/SupportContract/SupportContract')));
//render - Marketing page
const ConnectionForm = Loadable(lazy(() => import('../pages/marketing/connections/Connections')));
const ConnectionsManagement = Loadable(lazy(() => import('../pages/marketing/connections/ConnectionsManagement')));
const CampaignForm = Loadable(lazy(() => import('../pages/marketing/campaign/Campane')));
const CampaignManagement = Loadable(lazy(() => import('../pages/marketing/campaign/CampaignManagement')));
const FeedBackForm = Loadable(lazy(() => import('../pages/marketing/feedBack/feedBack')))


// render - utilities
const Typography = Loadable(lazy(() => import('../pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('../pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('../pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('../pages/components-overview/AntIcons')));

///render - coopration
const NewConfrimation = Loadable(lazy(() => import('../pages/Cooperation/Confrimation/NewConfrimation')));
///render - project
const CreateProject = Loadable(lazy(() => import('../pages/Cooperation/Project/CreateProject')));

const Note = Loadable(lazy(() => import('../pages/Activities/Notes/Note')));
const NoteManagement = Loadable(lazy(() => import('../pages/Activities/Notes/NoteManagement')));

const NewClue = Loadable(lazy(() => import('../pages/sale/Clues/NewClue')));
const ClueManagement = Loadable(lazy(() => import('../pages/sale/Clues/ClueManagement')));
const NewOpportunities = Loadable(lazy(() => import('../pages/sale/Opportunities/NewOpportunities')));
const OpportunitiesManagement = Loadable(lazy(() => import('../pages/sale/Opportunities/OpportunitiesManagement')));
///render - Accounts
const NewCompetitor = Loadable(lazy(() => import('../pages/Accounts/Competitors/NewCompetitor')));
const CompetitorManagement = Loadable(lazy(() => import('../pages/Accounts/Competitors/CompetitorManagement')));
const CreatePersons = Loadable(lazy(() => import('../pages/Accounts/Persons/CreatePersons')));
const PersonsManagement = Loadable(lazy(() => import('../pages/Accounts/Persons/PersonsManagement')));
const CreateAccount = Loadable(lazy(() => import('../pages/Accounts/CreateAccount')));
const AccountManagement = Loadable(lazy(() => import('../pages/Accounts/AccountManagement')));
///render - ProgramPart
const CreateProgramPart = Loadable(lazy(() => import('../pages/programPart/ProgramPartForm')));
const MenuManagement = Loadable(lazy(() => import('../pages/programPart/ProgramPartTreeView')));
const Test = Loadable(lazy(() => import('../pages/programPart/test')));
///render - BaseInfo
const CreatePersonnel = Loadable(lazy(() => import('../pages/baseInfo/Personnel/CreatePersonnel')));
const PersonnelManagement = Loadable(lazy(() => import('../pages/baseInfo/Personnel/PersonnelManagement')));
const PersonnelTreeView = Loadable(lazy(() => import('../pages/baseInfo/PersonnelTreeView/PersonnelTreeView')));
const OrganizationChart = Loadable(lazy(() => import('../pages/baseInfo/OrganizationChart/OrganizationChart')));
const DefinitionofTitles = Loadable(lazy(() => import('../pages/baseInfo/DefinitionofTitles/index')));
const MeetingPlaces = Loadable(lazy(() => import('../pages/baseInfo/MeetingPlaces/MeetingPlacesManagement')));
const CreateMeetingPlace = Loadable(lazy(() => import('../pages/baseInfo/MeetingPlaces/CreateMeetingPlace')));
const MyCalendar = Loadable(lazy(() => import('../pages/Calendar/Calendar')));
const EventCalendar = Loadable(lazy(() => import('../pages/Calendar/EventCalendar')));

///render - AccessManagement
const AccessManagement = Loadable(lazy(() => import('../pages/AccessManagement/AccessManagement')));
///render - Profile
const Overview = Loadable(lazy(() => import('../pages/profile/index')));
///render - AccountProfile
const AccountOverview = Loadable(lazy(() => import('../pages/Accounts/AccountsProfile/index')));

// ==============================|| MAIN ROUTING ||============================== //


const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: ( <PrivateRoute><DashboardDefault /></PrivateRoute>)
        },
        {
            path: 'MenuManagement',
            element: <MenuManagement />,
        },
        {
            path: 'AccessManagement',
            element: <AccessManagement />,
        },
        {
            path: 'test',
            element: <Test />,
        },
        {
            path: 'CreateMenu',
            element: <CreateProgramPart />,
        },
        {
            path: 'PersonalProfile',
            element: <Overview />,
        },
        {
            path: 'Calendar',
            children: [
                {
                    path: "TimeSheetCalendar",
                    element: <MyCalendar />
                }
            ]
        },
        {
            path: 'Calendar',
            children: [
                {
                    path: "EventCalendar",
                    element: <EventCalendar />
                }
            ]
        },

        {
            path: 'accounts',
            // element: <DashboardDefault />
            children: [
                {
                    path: 'Competitor',
                    children: [
                        {
                            path: 'NewCompetitor',
                            element: <LoadablePage page="NewCompetitor" />
                        },
                        {
                            path: 'CompetitorManagement',
                            element: <LoadablePage page="CompetitorManagement" />
                        },
                    ]
                },
                {
                    path: 'people',
                    children: [
                        {
                            path: 'NewPerson',
                            element: <CreatePersons />
                        },
                        {
                            path: 'PersonManagement',
                            element: <PersonsManagement />
                        },
                    ]
                },
                {
                    path: 'AccountProfile',
                    element: <AccountOverview />
                },
                {
                    path: 'NewAccount',
                    element: <CreateAccount />
                },
                {
                    path: 'AccountManagement',
                    element: <AccountManagement />
                },
            ]
        },
        {
            path: 'Cooperation',
            children: [
                {
                    path: 'Confrimation',
                    // element:<DashboardDefault />,
                    children: [
                        {
                            path: 'NewConfrimation',
                            element: <NewConfrimation />,
                        },
                    ]
                },
                {
                    path: 'Project',
                    // element: <CreateProject />,
                    children: [
                        {
                            path: 'CreateProject',
                            element: <CreateProject />,
                        },
                    ]
                }
            ]
        },
        
        {
            path: 'sale',
            children: [
                 {
                     path: 'pre-invoice-sale',
                     element: <SalePreInvoice />
                  },
                  {
                      path: 'SaleContract',
                     // element: <SaleContract />
                    children: [
                         {
                             path: 'createSaleContract',
                           element: <SaleContract />
                        }
                     ]

                 },
                {
                    path: 'Invoice',
                    // element: <InvoiceForm />,
                    children: [
                        {
                            path: 'NewInvoice',
                            element: <InvoiceForm />,
                        },
                        {
                            path: 'InvoiceManagement',
                            element: <InvoiceManagement />,
                        }
                    ]
                },
                {
                    path: 'PreInvoice',
                    // element: <PreInvoiceForm />,
                    children: [
                        {
                            path: 'NewPreInvoice',
                            element: <SalePreInvoice />,
                        },
                        {
                            path: 'PreInvoiceManagement',
                            element: <PreInvoiceManagement />,
                        }
                    ]
                },

                {
                    path: 'Payment',
                    //element: <Payment />
                    children: [
                        {
                            path: 'createPayment',
                            element: <Payment />
                        },
                        {
                            path: 'PaymentManagement',
                            element: <PaymentManagement />
                        }
                    ]
                },
                {
                    path: 'Deposit',
                    // element: <Deposit />
                    children: [
                        {
                            path: 'createDeposit',
                            element: <Deposit />
                        }
                    ]
                },
                {
                    path: 'Clues',
                    // element: <Deposit />
                    children: [
                        {
                            path: 'NewClue',
                            element: <NewClue />
                        },
                        {
                            path: 'ClueManagement',
                            element: <ClueManagement />
                        }
                    ]
                },
                {
                    path: 'Opportunities',
                    // element: <Deposit />
                    children: [
                        {
                            path: 'NewOpportunities',
                            element: <NewOpportunities />
                        },
                        {
                            path: 'OpportunitiesManagement',
                            element: <OpportunitiesManagement />
                        }
                    ]
                }

            ]
        },
        {
            path: 'Activities',
            children: [
                {
                    path: 'Meeting',
                    // element: <CreateSessionForm />,
                    children: [
                        {
                            path: 'CreateMeeting',
                            element: <CreateSessionForm />,
                        },
                        {
                            path: 'SessionManagement',
                            element: <SessionManagement />,
                        }
                    ]
                },
                {
                    path: 'Contact',
                    children: [
                        {
                            path: 'CreateContact',
                            element: <CreateContact />,
                        },
                        {
                            path: 'ContactManagement',
                            element: <ContactManagement />,
                        }
                    ]
                },
                {
                    path: 'Duty',
                    // element: <CreateDutyForm />,
                    children: [
                        {
                            path: 'CreateDuty',
                            element: <CreateDutyForm />,
                        },
                        {
                            path: 'DutyManagement',
                            element: <DutyManagement />,
                        }
                    ]
                },
                {
                    path: 'note',
                    // element: <Note />,
                    children: [
                        {
                            path: 'createNote',
                            element: <Note />
                        },
                        {
                            path: 'NoteManagement',
                            element: <NoteManagement />
                        }
                    ]
                }
            ]
        },
        {
            path: 'inventory-management',
            children: [
                {
                    path: 'product',
                    // element: <ProductCreation/>,
                    children: [
                        {
                            path: 'create-product',
                            element: <ProductCreation />
                        },
                        {
                            path: 'ProductManagement',
                            element: <ProductManagement />
                        }
                    ]
                },
                {
                    path: 'productCategories',
                    children: [
                        {
                            path: 'create-category',
                            element: <ProductCategoriesCreation />
                        },
                        {
                            path: 'ProductCategoriesManagement',
                            element: <ProductCategoriesManagement />
                        }
                    ]
                },
                {
                    path: 'suppliers',
                    children: [
                        {
                            path: 'create-supplier',
                            element: <SupplierCreation />
                        },
                        {
                            path: 'SupplierManagement',
                            element: <SupplierManagement />
                        }
                    ]
                },
                {
                    path: 'purchase-orders',
                    children: [
                        {
                            path: 'create-order',
                            element: <PurchaseOrderCreation/>
                        },
                        {
                            path: 'PurchaseOrderManagement',
                            element: <PurchaseOrderManagement/>
                        }
                    ]
                }
            ]
        },
        {
            path: 'purchaseOrders',
            children: [
                {
                    path: 'CreatePurchaseOrder',
                    element: <PurchaseOrderCreation />
                }
            ]
        }, 
        {
            path: 'BaseInfo',
            children: [
                {
                    path: 'MeetingPlacesManagement',
                    element: <MeetingPlaces />
                },
                {
                    path: 'DefinitionofTitles',
                    element: <DefinitionofTitles />
                },
                {
                    path: 'CreateMeetingPlace',
                    element: <CreateMeetingPlace />
                },
                {
                    path: 'personnels',
                    children: [
                        {
                            path: 'PersonnelManagement',
                            element: <PersonnelManagement />
                        },
                        {
                            path: 'NewPersonnel',
                            element: <CreatePersonnel />
                        },
                        {
                            path: 'PersonnelTreeView',
                            element: <PersonnelTreeView />
                        },
                        {
                            path: 'OrgChart',
                            element: <OrganizationChart />
                        },
                    ]
                },
            ]
        },
        {
            path: 'Support',
            children: [
                {
                    path: 'Support',
                    // element: <SupportForm />,
                    children: [
                        {
                            path: 'newSupport',
                            element: <SupportForm />
                        },
                        {
                            path: 'SupportManagement',
                            element: <SupportManagement />
                        }
                    ]
                },
                {
                    path: 'SupportContract',
                    element: <SupportContract />
                },
                {
                    path: 'Service',
                    element: <Service />
                },
                {
                    path: 'ServiceManagement',
                    element: <ServiceManagement />
                },
            ]
        }, {
            path: 'marketing',
            children: [
                {
                    path: 'Connections',
                    // element: <ConnectionForm />,
                    children: [
                        {
                            path: 'newConnections',
                            element: <ConnectionForm />
                        },
                        {
                            path: 'ConnectionsManagement',
                            element: <ConnectionsManagement />
                        }
                    ]
                },
                {
                    path: 'Campaign',
                    // element: <CampaignForm />,
                    children: [
                        {
                            path: 'newCampaign',
                            element: <CampaignForm />
                        },
                        {
                            path: 'CampaignManagement',
                            element: <CampaignManagement />
                        }
                    ]
                },
                {
                    path: 'FeedBack',
                    // element: <CampaignForm />,
                    children: [
                        {
                            path: 'newFeedBack',
                            element: <FeedBackForm />
                        }
                    ]
                }
            ]
        },
    ]
};

export default MainRoutes;
