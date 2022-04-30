/* eslint-disable no-unused-vars */
import React, { lazy } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect, useSelector } from 'react-redux'
import Layout from 'layouts'
import GuardedRoute from 'guardRoute'
import PublicRoute from './publicRoute'
import System404 from './pages/auth/404'
// import VideoContainerWrapper from './components/videoCalling/VideoContainerWrapper'

const routes = [
  // VB:REPLACE-START:ROUTER-CONFIG

  {
    path: '/companyDetails',
    Component: lazy(() => import('pages/companyDetails')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/clinicStaff',
    Component: lazy(() => import('pages/clinicStaff')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/clinicDoctors',
    Component: lazy(() => import('pages/clinicDoctors')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/availability',
    Component: lazy(() => import('pages/managements')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/managements',
    Component: lazy(() => import('pages/userManagement')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/availabilityTest',
    Component: lazy(() => import('pages/availabilityTest')),
    exact: true,
  },
  {
    path: '/services',
    Component: lazy(() => import('pages/services')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/userProfile',
    Component: lazy(() => import('pages/userProfile')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/claimEntry',
    Component: lazy(() => import('pages/claimEntry')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/DashboardMain',
    Component: lazy(() => import('pages/DashboardMain')),
    exact: true,
  },
  {
    path: '/company',
    Component: lazy(() => import('pages/company')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/doctorService',
    Component: lazy(() => import('pages/doctorService')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/clinicDashboard',
    Component: lazy(() => import('pages/clinicDashboard')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/staffDashboard',
    Component: lazy(() => import('pages/staffDashboard')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/appointmentManagerSetting',
    Component: lazy(() => import('pages/appointmentManagerSetting')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/healthHistory',
    Component: lazy(() => import('pages/healthHistory')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/healthHistorySystem',
    Component: lazy(() => import('pages/healthHistoryManagement')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/bookAppointmentByDoctor',
    Component: lazy(() => import('pages/bookAppointmentByDoctor')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/expertAdvice',
    Component: lazy(() => import('pages/expertAdvice')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/userProfileDoctor',
    Component: lazy(() => import('pages/userProfileDoctor')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/appointmentByDoctor',
    Component: lazy(() => import('pages/appointmentByDoctor')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/scheduleAppointment',
    Component: lazy(() => import('pages/scheduleAppointment')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/addNewProvider',
    Component: lazy(() => import('pages/addNewProvider')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/addNewProv',
    Component: lazy(() => import('pages/addNewProvider')),
    exact: true,
  },
  {
    path: '/groups',
    Component: lazy(() => import('pages/groups')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/manageEmployees',
    Component: lazy(() => import('pages/manageEmployees')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/inviteRegisterEmployee',
    Component: lazy(() => import('pages/inviteRegisterEmployee')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/addNewClinic',
    Component: lazy(() => import('pages/addNewClinic')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/clinicDetails',
    Component: lazy(() => import('pages/clinicDetails')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/callHistory',
    Component: lazy(() => import('pages/callHistory')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/editClinic',
    Component: lazy(() => import('pages/editClinic')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/clinics',
    Component: lazy(() => import('pages/clinics')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/groupDetails',
    Component: lazy(() => import('pages/groupDetails')),
    exact: true,
  },
  {
    path: '/addGroup',
    Component: lazy(() => import('pages/addGroup')),
    exact: true,
  },
  {
    path: '/editGroups',
    Component: lazy(() => import('pages/EditGroup')),
    exact: true,
  },
  {
    path: '/groupPlan',
    Component: lazy(() => import('pages/groupPlan')),
    exact: true,
  },
  {
    path: '/uploadCsv',
    Component: lazy(() => import('pages/uploadCsv')),
    exact: true,
  },
  {
    path: '/addCompany',
    Component: lazy(() => import('pages/addCompany')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/addPatientFromAdmins',
    Component: lazy(() => import('pages/addPatientFromAdmin')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/addClinic',
    Component: lazy(() => import('pages/addClinic')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/addAssistedLiving',
    Component: lazy(() => import('pages/addAssistedLiving')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/analytics',
    Component: lazy(() => import('pages/analytics')),
    exact: true,
    authGuard: true,
  },

  {
    path: '/manageAccount',
    Component: lazy(() => import('pages/manageAccount')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/addNewEmployee',
    Component: lazy(() => import('pages/addNewEmployee')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/addNewUser',
    Component: lazy(() => import('pages/addNewUser')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/patientlist',
    Component: lazy(() => import('pages/patientList')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/patientlistForDoctor',
    Component: lazy(() => import('pages/patientListForDoctor')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/editEmployee',
    Component: lazy(() => import('pages/editEmployee')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/editCompany',
    Component: lazy(() => import('pages/editCompany')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/editDoctor',
    Component: lazy(() => import('pages/editDoctor')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/editUserProfile',
    Component: lazy(() => import('pages/editUserProfile')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/dashboard',
    Component: lazy(() => import('pages/dashboard')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/selectRole',
    Component: lazy(() => import('pages/selectRole')),
    exact: true,
    authGuard: true,
  },

  {
    path: '/dashboard/alpha',
    Component: lazy(() => import('pages/dashboard-old/alpha')),
    exact: true,
  },
  {
    path: '/dashboard/beta',
    Component: lazy(() => import('pages/dashboard-old/beta')),
    exact: true,
  },
  {
    path: '/dashboard/gamma',
    Component: lazy(() => import('pages/dashboard-old/gamma')),
    exact: true,
  },
  {
    path: '/dashboard/crypto',
    Component: lazy(() => import('pages/dashboard-old/crypto')),
    exact: true,
  },
  {
    path: '/apps',
    Component: lazy(() => import('pages/apps')),
    exact: true,
  },
  {
    path: '/apps/profile',
    Component: lazy(() => import('pages/apps/profile')),
    exact: true,
  },
  {
    path: '/apps/calendar',
    Component: lazy(() => import('pages/apps/calendar')),
    exact: true,
  },
  {
    path: '/apps/gallery',
    Component: lazy(() => import('pages/apps/gallery')),
    exact: true,
  },
  {
    path: '/apps/messaging',
    Component: lazy(() => import('pages/apps/messaging')),
    exact: true,
  },
  {
    path: '/apps/mail',
    Component: lazy(() => import('pages/apps/mail')),
    exact: true,
  },
  {
    path: '/extra-apps',
    Component: lazy(() => import('pages/extra-apps')),
    exact: true,
  },
  {
    path: '/extra-apps/github-explore',
    Component: lazy(() => import('pages/extra-apps/github-explore')),
    exact: true,
  },
  {
    path: '/extra-apps/github-discuss',
    Component: lazy(() => import('pages/extra-apps/github-discuss')),
    exact: true,
  },
  {
    path: '/extra-apps/digitalocean-droplets',
    Component: lazy(() => import('pages/extra-apps/digitalocean-droplets')),
    exact: true,
  },
  {
    path: '/extra-apps/digitalocean-create',
    Component: lazy(() => import('pages/extra-apps/digitalocean-create')),
    exact: true,
  },
  {
    path: '/extra-apps/google-analytics',
    Component: lazy(() => import('pages/extra-apps/google-analytics')),
    exact: true,
  },
  {
    path: '/extra-apps/wordpress-post',
    Component: lazy(() => import('pages/extra-apps/wordpress-post')),
    exact: true,
  },
  {
    path: '/extra-apps/wordpress-posts',
    Component: lazy(() => import('pages/extra-apps/wordpress-posts')),
    exact: true,
  },
  {
    path: '/extra-apps/wordpress-add',
    Component: lazy(() => import('pages/extra-apps/wordpress-add')),
    exact: true,
  },
  {
    path: '/extra-apps/todoist-list',
    Component: lazy(() => import('pages/extra-apps/todoist-list')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/extra-apps/jira-dashboard',
    Component: lazy(() => import('pages/extra-apps/jira-dashboard')),
    exact: true,
  },
  {
    path: '/extra-apps/jira-agile-board',
    Component: lazy(() => import('pages/extra-apps/jira-agile-board')),
    exact: true,
  },
  {
    path: '/extra-apps/helpdesk-dashboard',
    Component: lazy(() => import('pages/extra-apps/helpdesk-dashboard')),
    exact: true,
  },
  {
    path: '/ecommerce',
    Component: lazy(() => import('pages/ecommerce')),
    exact: true,
  },
  {
    path: '/addNewStaff',
    Component: lazy(() => import('pages/addNewStaff')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/editStaff',
    Component: lazy(() => import('pages/editStaff')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/ecommerce/dashboard',
    Component: lazy(() => import('pages/ecommerce/dashboard')),
    exact: true,
  },
  {
    path: '/ecommerce/orders',
    Component: lazy(() => import('pages/ecommerce/orders')),
    exact: true,
  },
  {
    path: '/ecommerce/product-catalog',
    Component: lazy(() => import('pages/ecommerce/product-catalog')),
    exact: true,
  },
  {
    path: '/ecommerce/product-details',
    Component: lazy(() => import('pages/ecommerce/product-details')),
    exact: true,
  },
  {
    path: '/ecommerce/cart',
    Component: lazy(() => import('pages/ecommerce/cart')),
    exact: true,
  },
  {
    path: '/ui-kits/antd',
    Component: lazy(() => import('pages/ui-kits/antd')),
    exact: true,
  },
  {
    path: '/ui-kits/bootstrap',
    Component: lazy(() => import('pages/ui-kits/bootstrap')),
    exact: true,
  },
  {
    path: '/widgets',
    Component: lazy(() => import('pages/widgets')),
    exact: true,
  },
  {
    path: '/widgets/general',
    Component: lazy(() => import('pages/widgets/general')),
    exact: true,
  },
  {
    path: '/widgets/lists',
    Component: lazy(() => import('pages/widgets/lists')),
    exact: true,
  },
  {
    path: '/widgets/tables',
    Component: lazy(() => import('pages/widgets/tables')),
    exact: true,
  },
  {
    path: '/widgets/charts',
    Component: lazy(() => import('pages/widgets/charts')),
    exact: true,
  },
  {
    path: '/cards',
    Component: lazy(() => import('pages/cards')),
    exact: true,
  },
  {
    path: '/cards/basic',
    Component: lazy(() => import('pages/cards/basic')),
    exact: true,
  },
  {
    path: '/cards/tabbed',
    Component: lazy(() => import('pages/cards/tabbed')),
    exact: true,
  },
  {
    path: '/tables',
    Component: lazy(() => import('pages/tables')),
    exact: true,
  },
  {
    path: '/tables/antd',
    Component: lazy(() => import('pages/tables/antd')),
    exact: true,
  },
  {
    path: '/tables/bootstrap',
    Component: lazy(() => import('pages/tables/bootstrap')),
    exact: true,
  },
  {
    path: '/charts',
    Component: lazy(() => import('pages/charts')),
    exact: true,
  },
  {
    path: '/charts/chartistjs',
    Component: lazy(() => import('pages/charts/chartistjs')),
    exact: true,
  },
  {
    path: '/charts/chartjs',
    Component: lazy(() => import('pages/charts/chartjs')),
    exact: true,
  },
  {
    path: '/charts/C3',
    Component: lazy(() => import('pages/charts/C3')),
    exact: true,
  },
  {
    path: '/icons',
    Component: lazy(() => import('pages/icons')),
    exact: true,
  },
  {
    path: '/icons/feather-icons',
    Component: lazy(() => import('pages/icons/feather-icons')),
    exact: true,
  },
  {
    path: '/icons/fontawesome',
    Component: lazy(() => import('pages/icons/fontawesome')),
    exact: true,
  },
  {
    path: '/icons/linearicons-free',
    Component: lazy(() => import('pages/icons/linearicons-free')),
    exact: true,
  },
  {
    path: '/icons/icomoon-free',
    Component: lazy(() => import('pages/icons/icomoon-free')),
    exact: true,
  },
  {
    path: '/advanced/form-examples',
    Component: lazy(() => import('pages/advanced/form-examples')),
    exact: true,
  },
  {
    path: '/advanced/email-templates',
    Component: lazy(() => import('pages/advanced/email-templates')),
    exact: true,
  },
  {
    path: '/advanced/pricing-tables',
    Component: lazy(() => import('pages/advanced/pricing-tables')),
    exact: true,
  },
  {
    path: '/advanced/invoice',
    Component: lazy(() => import('pages/advanced/invoice')),
    exact: true,
  },
  {
    path: '/advanced/utilities',
    Component: lazy(() => import('pages/advanced/utilities')),
    exact: true,
  },
  {
    path: '/advanced/grid',
    Component: lazy(() => import('pages/advanced/grid')),
    exact: true,
  },
  {
    path: '/advanced/typography',
    Component: lazy(() => import('pages/advanced/typography')),
    exact: true,
  },
  {
    path: '/advanced/colors',
    Component: lazy(() => import('pages/advanced/colors')),
    exact: true,
  },
  {
    path: '/nested',
    Component: lazy(() => import('pages/nested')),
    exact: true,
  },
  {
    path: '/nested/1',
    Component: lazy(() => import('pages/nested/1')),
    exact: true,
  },
  {
    path: '/nested/2',
    Component: lazy(() => import('pages/nested/2')),
    exact: true,
  },
  {
    path: '/userManagement',
    Component: lazy(() => import('pages/userManagement')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/doctorDashboard',
    Component: lazy(() => import('pages/doctorDashboard')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/patientProfile',
    Component: lazy(() => import('pages/patientProfile')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/patientProfileForDoctor/:id',
    Component: lazy(() => import('pages/patientProfileForDoctor')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/patientHealthManagement',
    Component: lazy(() => import('pages/patientHealthManagement')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/invoiceList',
    Component: lazy(() => import('pages/invoiceList')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/patientDetail/:id',
    Component: lazy(() => import('pages/patientDetail')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/patientInfo/:id',
    Component: lazy(() => import('pages/patientInfo')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/companyUserList/:id',
    Component: lazy(() => import('pages/companyUserList')),
    exact: true,
  },
  // VB:REPLACE-END:ROUTER-CONFIG
  {
    path: '/auth/widgetsComponents',
    Component: lazy(() => import('pages/auth/widgetsComponents')),
    exact: true,
  },
  {
    path: '/auth/login',
    Component: lazy(() => import('pages/auth/login')),
    exact: true,
    restrictLoggedInUser: true,
  },
  {
    path: '/auth/forgot-password',
    Component: lazy(() => import('pages/auth/forgot-password')),
    exact: true,
  },
  {
    path: '/auth/register',
    Component: lazy(() => import('pages/auth/register')),
    exact: true,
    restrictLoggedInUser: true,
  },
  {
    path: '/auth/lockscreen',
    Component: lazy(() => import('pages/auth/lockscreen')),
    exact: true,
  },
  {
    path: '/auth/inactive',
    Component: lazy(() => import('pages/auth/disabled-user')),
    exact: true,
  },
  {
    path: '/auth/unauthorizedPatient',
    Component: lazy(() => import('pages/auth/unauthorizedPatient')),
    exact: true,
  },

  {
    path: '/auth/complete-new-password',
    Component: lazy(() => import('pages/auth/complete-new-password')),
    exact: true,
  },
  {
    path: '/auth/complete-forgot-password',
    Component: lazy(() => import('pages/auth/complete-forgot-password')),
    exact: true,
  },
  {
    path: '/users',
    Component: lazy(() => import('pages/users')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/addEvents',
    Component: lazy(() => import('pages/addEvents')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/viewEvents',
    Component: lazy(() => import('pages/viewEvents')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/eventWorkShops',
    Component: lazy(() => import('pages/viewEventWorkShops')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/workshop',
    Component: lazy(() => import('pages/workShop')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/events',
    Component: lazy(() => import('pages/events')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/editEvents/:eventId',
    Component: lazy(() => import('pages/editEvents ')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/changePassword',
    Component: lazy(() => import('pages/changePassword')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/book',
    Component: lazy(() => import('pages/bookDoctors')),
    exact: true,
    authGuard: true,
  },
  {
    path: '/company/dashboard',
    Component: lazy(() => import('pages/companyDashboard')),
    exact: true,
    authGuard: true,
  },
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  const { authorized, selectedCompanyInfo } = useSelector((state) => state.user)
  console.log('🚀 ~ file: router.js ~ line 676 ~ Router ~ selectedCompanyInfo', selectedCompanyInfo)
  console.log('🚀 ~ file: router.js ~ line 676 ~ Router ~ authorized', authorized)
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={(state) => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Redirect to="/dashboard" />} />

                    {routes.map(({ path, Component, exact, authGuard, restrictLoggedInUser }) => {
                      if (authGuard) {
                        return (
                          <GuardedRoute
                            path={path}
                            key={path}
                            exact={exact}
                            className={routerAnimation}
                            component={Component}
                            currentUser={authorized}
                          />
                        )
                      }
                      return (
                        <PublicRoute
                          path={path}
                          key={path}
                          exact={exact}
                          className={routerAnimation}
                          component={Component}
                          currentUser={authorized}
                          restrictLoggedInUser={restrictLoggedInUser}
                        />
                      )
                    })}
                    <Route render={() => <System404 />} />
                  </Switch>
                  {/* video componets here */}
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
