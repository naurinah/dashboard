import React, {
  Suspense,
  Fragment,
  lazy
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DocsLayout from 'src/layouts/DocsLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/home/HomeView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';



export const renderRoutes = (routes=[]) =>(
  <Suspense 
    fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;
        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props)=>(
              <Guard>
                <Layout>
                  {route.routes
                    ?renderRoutes(route.routes)
                    :<Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>

);

const routes = [
  {
    exact:true,
    path:'/404',
    component: lazy(() => import('src/views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path:'/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path:'/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path:'/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    path:'/register-unprotected',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {

    path:'/',
    guard:AuthGuard,
    layout:DashboardLayout,
    routes:[
      {
        exact: true,
        path:'/account',
        component: lazy(()=> import('src/views/account/AccountView'))
      },
      {
        exact: true,
        path:'/calendar',
        component: lazy(() => import('src/views/calendar/CalendarView'))
      },
      {
        exact: true,
        path: [
          '/chat/new',
          '/chat/:threadKey'
        ],
        component: lazy(() => import('src/views/chat/ChatView'))
      },
      {
        exact: true,
        path:'/chat',
        component: () =><Redirect to="/chat/new" />
      },
      {
        exact: true,
        path:'/extra/charts/apex',
        component:lazy(() => import('src/views/extra/charts/ApexChartsView'))
      },
      {
        exact: true,
        path:'/extra/forms/formik',
        component: lazy(() => import('src/views/extra/forms/FormikView'))
      },
      {
        exact: true,
        path:'/extra/forms/redux',
        component: lazy(() => import('src/views/extra/forms/ReduxFormView'))
      },
      {
        exact: true,
        path:'/extra/editors/draft-js',
        component: lazy(() => import('src/views/extra/editors/DraftEditorView'))
      },
      {
        exact: true,
        path:'/extra/editors/quill',
        component: lazy(() => import('src/views/extra/editors/QuillEditorView'))
      },
      {
        exact: true,
        path:'/kanban',
        component: lazy(() => import('src/views/kanban/KanbanView'))
      },

      {
        exact: true,
        path: [
          '/mail/label/:customLabel/:mailId?',
          '/mail/:systemLabel/:mailId?'
        ],
        component: lazy(() => import('src/views/mail/MailView'))
      },
      {
        exact: true,
        path:'/mail',
        component: () =><Redirect to="/mail/all" />
      },

      {
        exact: true,
        path:'/deliveries',
        component: lazy(() => import('src/views/customer/CustomerListView'))
      },

      // {
      //   exact: true,
      //   path:'/test_124',
      //   component: lazy(() => import('src/views/test'))
      // },

      {
        exact: true,
        path:'/management/customers/:customerId',
        component: lazy(() => import('src/views/customer/CustomerDetailsView'))
      },
      {
        exact: true,
        path:'/management/customers/:customerId/edit',
        component: lazy(() => import('src/views/customer/CustomerEditView'))
      },
      {
        exact: true,
        path:'/management/invoices',
        component: lazy(() => import('src/views/invoice/InvoiceListView'))
      },
      {
        exact: true,
        path:'/management/invoices/:invoiceId',
        component: lazy(() => import('src/views/invoice/InvoiceDetailsView'))
      },
      {
        exact: true,
        path:'/management/orders',
        component: lazy(() => import('src/views/order/OrderListView'))
      },
      {
        exact: true,
        path:'/management/orders/:orderId',
        component: lazy(() => import('src/views/order/OrderDetailsView'))
      },
      {
        exact: true,
        path:'/management/products',
        component: lazy(() => import('src/views/product/ProductListView'))
      },
      {
        exact: true,
        path:'/management/products/create',
        component: lazy(() => import('src/views/product/ProductCreateView'))
      },
      {
        exact: true,
        path:'/management',
        component: () =><Redirect to="/management/customers" />
      },
      {
        exact: true,
        path:'/projects/overview',
        component: lazy(() => import('src/views/project/OverviewView'))
      },
      {
        exact: true,
        path:'/projects/browse',
        component: lazy(() => import('src/views/project/ProjectBrowseView'))
      },
      {
        exact: true,
        path:'/projects/create',
        component: lazy(() => import('src/views/project/ProjectCreateView'))
      },
      {
        exact: true,
        path:'/projects/:id',
        component: lazy(() => import('src/views/project/ProjectDetailsView'))
      },
      {
        exact: true,
        path:'/projects',
        component: () => <Redirect to="/projects/browse" />
      },
      {
        
        exact: true,
        path:'/reports/dashboard',
        component: lazy(() => import('src/views/reports/DashboardView'))
      },
      {
        exact: true,
        path:'/dashboard',
        component: lazy(() => import('src/views/dashboard/DashboardView'))
      },



      {
        exact: true,
        path:'/statements',
        component: lazy(() => import('src/views/statements'))
      },
      {
        exact: true,
        path:'/profile',
        component: lazy(() => import('src/views/profile'))
      },
      {
        exact: true,
        path:'/pickup',
        component: lazy(() => import('src/views/PickupList'))
      },
      {
        exact: true,
        path:'/pickup-locations',
        component: lazy(() => import('src/views/Locationlist'))
      },
      {
        exact: true,
        path:'/tracking',
        component: lazy(() => import('src/views/multitrack'))
      },
      {
        exact: true,
        path:'/upload-booking',
        component: lazy(() => import('src/views/bulkImport'))
      },
      {
        exact: true,
        path:'/return-requests',
        component: lazy(() => import('src/views/returnRequest'))
      },
      {
        exact: true,
        path:'/dashboard',
        component: lazy(() => import('src/views/dashboard/DashboardView'))
      },
      {
        exact: true,
        path:'/create-shipment',
        component: lazy(()=>import('src/views/createShipment'))
      },

      {
        exact: true,
        path:'/create-pickup',
        component: lazy(()=>import('src/views/createPickup'))
      },

      {
        exact: true,
        path:'/developer-center',
        component: lazy(() => import('src/views/support/DeveloperCenter'))
      },
      {
        exact: true,
        path:'/faqs',
        component: lazy(() => import('src/views/support/KnowledgeBase'))
      },
      {
        exact: true,
        path:'/release-notes',
        component: lazy(() => import('src/views/support/ReleaseNotes'))
      },
      {
        exact: true,
        path:'/guides',
        component: lazy(() => import('src/views/support/VideoGuides'))
      },

      {
        exact: true,
        path: '/reports/dashboard-alternative',
        component: lazy(() => import('src/views/reports/DashboardAlternativeView'))
      },

      {
        exact: true,
        path:'/reports',
        component:()=> <Redirect to="/reports/dashboard" />
      },
      {
        exact: true,
        path:'/social/feed',
        component: lazy(() => import('src/views/social/FeedView'))
      },
      {
        exact: true,
        path:'/social/profile',
        component:lazy(()=>import('src/views/social/ProfileView'))
      },

      {
        exact: true,
        path:'/social',
        component: () => <Redirect to="/social/profile" />
      },
      {
        exact: true,
        path:'/',
        component:()=><Redirect to="/dashboard" />
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '/docs',
    layout: DocsLayout,
    routes: [
      {
        exact: true,
        path:'/docs',
        component: () => <Redirect to="/docs/welcome" />
      },
      {
        exact: true,
        path:'/docs/welcome',
        component: lazy(() => import('src/views/docs/WelcomeView'))
      },
      {
        exact: true,
        path:'/docs/getting-started',
        component: lazy(() => import('src/views/docs/GettingStartedView'))
      },
      {
        exact: true,
        path:'/docs/environment-variables',
        component: lazy(() => import('src/views/docs/EnvironmentVariablesView'))
      },
      {
        exact: true,
        path:'/docs/deployment',
        component: lazy(() => import('src/views/docs/DeploymentView'))
      },
      {
        exact: true,
        path:'/docs/api-calls',
        component: lazy(() => import('src/views/docs/APICallsView'))
      },
      {
        exact: true,
        path:'/docs/analytics',
        component: lazy(() => import('src/views/docs/AnalyticsView'))
      },
      {
        exact: true,
        path:'/docs/authentication',
        component: lazy(() => import('src/views/docs/AuthenticationView'))
      },
      {

        exact: true,
        path:'/docs/routing',
        component: lazy(() => import('src/views/docs/RoutingView'))

      },
      {
        exact: true,
        path:'/docs/settings',
        component: lazy(() => import('src/views/docs/SettingsView'))
      },
      {
        exact: true,
        path:'/docs/state-management',
        component: lazy(() => import('src/views/docs/StateManagementView'))
      },
      {
        exact: true,
        path:'/docs/theming',
        component: lazy(() => import('src/views/docs/ThemingView'))
      },
      {
        exact: true,
        path:'/docs/support',
        component: lazy(() => import('src/views/docs/SupportView'))
      },
      {
        exact: true,
        path:'/docs/changelog',
        component: lazy(() => import('src/views/docs/ChangelogView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path:'/',
        component: HomeView
      },
      {
        exact: true,
        path:'/pricing',
        component: lazy(()=>import('src/views/pricing/PricingView'))
      },

      {
        component: () =><Redirect to="/404" />
      }
    ]
  }
];
export default routes;
