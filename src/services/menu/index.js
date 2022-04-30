import CONSTANT from '../../lib/constant'

function getMenuData() {
  return [
    // VB:REPLACE-START:MENU-CONFIG
    {
      category: true,
      title: 'Dashboards',
      key: 'q7r3hr',
    },
    {
      icon: 'icmn-home2',
      title: 'Company',
      key: 'sdfs',
      url: '/company',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN],
      type: 'company',
      children: [
        {
          url: '/company',
          title: 'Company',
          key: '',
          // icon: 'icmn-office',
        },
        {
          url: '/addCompany',
          title: 'Add Company',
          key: '',
        },
        {
          url: '/editCompany',
          title: 'Edit Company',
          key: '',
        },
        {
          title: 'Company Detail',
          key: '',
          url: '/companyDetails',
          // icon: 'icmn-stats-bars',
        },
        {
          url: '/addNewEmployee',
          title: 'Add New Employee',
          key: '',
        },
        {
          url: '/editEmployee',
          title: 'Edit Employee',
          key: '',
        },
        {
          url: '/inviteRegisterEmployee',
          title: 'Register Employee',
          key: '',
          // icon: 'icmn-checkmark',
        },
        {
          url: '/uploadCsv',
          title: 'Upload CSV',
          key: '',
          // icon: 'icmn-download3',
        },
      ],
    },

    {
      title: 'Groups Plan',
      key: 'swswd',
      url: '/groups',
      icon: 'icmn-users',
      children: [
        {
          url: '/groups',
          title: 'Groups plan',
          key: '',
          // icon: 'icmn-command',
        },
        {
          url: '/groupPlan',
          title: 'Add Groups plan',
          key: '',
          // icon: 'icmn-clipboard',
        },
        // {
        //   url: '/editGroups',
        //   title: 'Edit Group Plan',
        //   key: '',
        // },
      ],
    },

    // groupDetails

    // {
    //   title: 'Groups Plan',
    //   key: 'grfg',
    //   url: '/groupPlan',
    //   icon: 'fe fe-user-check',
    //   children: [
    //     {
    //       url: '/groupPlan',
    //       title: 'Groups Plan',
    //       key: '',
    //     },
    //     {
    //       url: '/editGroups',
    //       title: 'Edit Groups',
    //       key: '',
    //     },
    //   ],
    // },

    {
      // icon: 'fa fa-users',
      title: 'Clinic Dashboard',
      key: '',
      url: '/dashboard',
      icon: 'icmn-office',
      children: [
        {
          url: '/dashboard',
          title: 'Clinics Dashboard',
          key: '',
          // icon: 'icmn-codepen',
        },
        {
          url: '/clinics',
          title: 'Clinics',
          key: '',
          // icon: 'icmn-office',
        },
        {
          url: '/addNewClinic',
          title: 'Add New Clinic',
          key: 'icmn-plus',
        },
        {
          url: '/editClinic',
          title: 'Edit Clinic',
          key: '',
        },
        {
          url: '/clinicDetails',
          title: 'Clinic Details',
          key: '',
        },
        {
          url: '/appointmentManagerSetting',
          title: 'AppointmentManager',
          key: '',
        },
        {
          url: '/bookAppointmentByDoctor',
          title: 'BookAppointment',
          key: '',
        },
        {
          url: '/expertAdvice',
          title: 'Expert Advice',
          key: '',
        },
        {
          url: '/userProfileDoctor',
          title: 'User Profile Doctor',
          key: '',
        },
        {
          url: '/appointmentByDoctor',
          title: 'Appointment ByDoctor',
          key: '',
        },
        {
          url: '/scheduleAppointment',
          title: 'Schedule Appointment',
          key: '',
        },
        {
          title: 'Edit Doctor',
          key: '',
          url: '/editDoctor',
        },
        {
          url: '/addNewProvider',
          title: 'AddNew Provider',
          key: '',
        },
        {
          // icon: 'fa fa-users',
          title: 'Doctor Service',
          key: '',
          url: '/doctorService',
        },
      ],
    },

    {
      url: '/userProfile',
      title: 'User Profile',
      key: 'sfsefse',
      icon: 'icmn-user-tie',
    },
    {
      url: '/userManagement',
      title: 'User Management',
      key: 'sfsefssw',
      icon: 'icmn-user-tie',
    },
    {
      url: '/doctorDashboard',
      title: 'Doctor Dashboard',
      key: 'sfsefssww',
      icon: 'icmn-user-tie',
    },
    {
      url: '/patientProfile',
      title: 'Patient Profile',
      key: 'sfsefsssww',
      icon: 'icmn-user-tie',
    },
    {
      url: '/claimEntry',
      title: 'Claim Entry',
      key: 'sfsefs65e',
      icon: 'icmn-target',
    },

    // {
    //   icon: 'fa fa-users',
    //   title: 'Dashboard',
    //   key: '',
    //   url: '/DashboardMain',
    // },

    // {
    //   category: true,
    //   title: 'Apps & Pages',
    //   key: '2t2ghm',
    // },
    // {
    //   title: 'Apps',
    //   key: '6rq4ze6',
    //   url: '/apps',
    //   icon: 'fe fe-database',
    //   children: [
    //     {
    //       title: 'Profile',
    //       key: 'e38wke',
    //       url: '/apps/profile',
    //     },
    //     {
    //       title: 'Calendar',
    //       key: 'y08dt9',
    //       url: '/apps/calendar',
    //     },
    //     {
    //       title: 'Gallery',
    //       key: 'lzh7g9',
    //       url: '/apps/gallery',
    //     },
    //     {
    //       title: 'Messaging',
    //       key: 'jdwic9',
    //       url: '/apps/messaging',
    //     },
    //     {
    //       title: 'Mail',
    //       key: '4dwoxc',
    //       url: '/apps/mail',
    //     },
    //   ],
    // },
    // {
    //   title: 'Extra Apps',
    //   key: 'c20gta',
    //   url: '/extra-apps',
    //   icon: 'fe fe-hard-drive',
    //   children: [
    //     {
    //       title: 'Github Explore',
    //       key: '8ba63s',
    //       url: '/extra-apps/github-explore',
    //     },
    //     {
    //       title: 'Github Discuss',
    //       key: 'b0rmp9',
    //       url: '/extra-apps/github-discuss',
    //     },
    //     {
    //       title: 'Digitalocean Droplets',
    //       key: 'cmzpxs',
    //       url: '/extra-apps/digitalocean-droplets',
    //     },
    //     {
    //       title: 'Digitalocean Create',
    //       key: 'ldmum',
    //       url: '/extra-apps/digitalocean-create',
    //     },
    //     {
    //       title: 'Google Analytics',
    //       key: 'dae7ki',
    //       url: '/extra-apps/google-analytics',
    //     },
    //     {
    //       title: 'Wordpress Post',
    //       key: '4iz2vq',
    //       url: '/extra-apps/wordpress-post',
    //     },
    //     {
    //       title: 'Wordpress Posts',
    //       key: '36v7m',
    //       url: '/extra-apps/wordpress-posts',
    //     },
    //     {
    //       title: 'Wordpress Add',
    //       key: 'uo8k1f',
    //       url: '/extra-apps/wordpress-add',
    //     },
    //     {
    //       title: 'Todoist List',
    //       key: 'dhg65',
    //       url: '/extra-apps/todoist-list',
    //     },
    //     {
    //       title: 'Jira Dashboard',
    //       key: 'jdhtkr',
    //       url: '/extra-apps/jira-dashboard',
    //     },
    //     {
    //       title: 'Jira Agile Board',
    //       key: '98jp2',
    //       url: '/extra-apps/jira-agile-board',
    //     },
    //     {
    //       title: 'Helpdesk Dashboard',
    //       key: 'brmh5',
    //       url: '/extra-apps/helpdesk-dashboard',
    //     },
    //   ],
    // },
    // {
    //   title: 'Ecommerce',
    //   key: 'aw5fgi',
    //   url: '/ecommerce',
    //   icon: 'fe fe-shopping-cart',
    //   children: [
    //     {
    //       title: 'Dashboard',
    //       key: 'agiw5f',
    //       url: '/ecommerce/dashboard',
    //     },
    //     {
    //       title: 'Orders',
    //       key: '2av8s2',
    //       url: '/ecommerce/orders',
    //     },
    //     {
    //       title: 'Product Catalog',
    //       key: 's1khgb',
    //       url: '/ecommerce/product-catalog',
    //     },
    //     {
    //       title: 'Product Details',
    //       key: 'vd6efh',
    //       url: '/ecommerce/product-details',
    //     },
    //     {
    //       title: 'Cart',
    //       key: 'y4smrt',
    //       url: '/ecommerce/cart',
    //     },
    //   ],
    // },

    // {
    //   title: 'Auth Pages',
    //   key: 'czhl14',
    //   url: '/auth',
    //   icon: 'fe fe-user',
    //   children: [
    //     {
    //       title: 'Login',
    //       key: 'fbre',
    //       url: '/auth/login',
    //     },
    //     {
    //       title: 'Forgot Password',
    //       key: 'jtjsjp',
    //       url: '/auth/forgot-password',
    //     },
    //     {
    //       title: 'Register',
    //       key: 'v2u9ie',
    //       url: '/auth/register',
    //     },
    //     {
    //       title: 'Lockscreen',
    //       key: '61qkmj',
    //       url: '/auth/lockscreen',
    //     },
    //     {
    //       title: 'Page 404',
    //       key: '92rb3h',
    //       url: '/auth/404',
    //     },
    //     {
    //       title: 'Page 500',
    //       key: 'tbmkob',
    //       url: '/auth/500',
    //     },
    //   ],
    // },
    // {
    //   category: true,
    //   title: 'UI Kits',
    //   key: 'evz6c8',
    // },
    // {
    //   title: 'Ant Design',
    //   key: 'qelxw',
    //   url: '/ui-kits/antd',
    //   icon: 'fe fe-bookmark',
    // },
    // {
    //   title: 'Bootstrap',
    //   key: 'l1gqx8',
    //   url: '/ui-kits/bootstrap',
    //   icon: 'fe fe-bookmark',
    // },
    // {
    //   category: true,
    //   title: 'Components',
    //   key: '2kw0b',
    // },
    // {
    //   title: 'Widgets',
    //   key: '90c2s4',
    //   url: '/widgets',
    //   icon: 'fe fe-image',
    //   children: [
    //     {
    //       title: 'General',
    //       key: 'oomius',
    //       url: '/widgets/general',
    //     },
    //     {
    //       title: 'Lists',
    //       key: '40yu9r',
    //       url: '/widgets/lists',
    //     },
    //     {
    //       title: 'Tables',
    //       key: 'nuf1vf',
    //       url: '/widgets/tables',
    //     },
    //     {
    //       title: 'Charts',
    //       key: 'mw15uj',
    //       url: '/widgets/charts',
    //     },
    //   ],
    // },
    // {
    //   title: 'Cards',
    //   key: 'c075qe',
    //   url: '/cards',
    //   icon: 'fe fe-credit-card',
    //   children: [
    //     {
    //       title: 'Basic Cards',
    //       key: 'j3q7kr',
    //       url: '/cards/basic',
    //     },
    //     {
    //       title: 'Tabbed Cards',
    //       key: '25rap8',
    //       url: '/cards/tabbed',
    //     },
    //   ],
    // },
    // {
    //   title: 'Tables',
    //   key: '62sqvb',
    //   url: '/tables',
    //   icon: 'fe fe-grid',
    //   children: [
    //     {
    //       title: 'Ant Design',
    //       key: '3gyey5',
    //       url: '/tables/antd',
    //     },
    //     {
    //       title: 'Bootstrap',
    //       key: 'amvqq',
    //       url: '/tables/bootstrap',
    //     },
    //   ],
    // },
    // {
    //   title: 'Charts',
    //   key: '783vor',
    //   url: '/charts',
    //   icon: 'fe fe-pie-chart',
    //   children: [
    //     {
    //       title: 'Chartist.js',
    //       key: 'jlx0h',
    //       url: '/charts/chartistjs',
    //     },
    //     {
    //       title: 'Chart.js',
    //       key: '7yv6f',
    //       url: '/charts/chartjs',
    //     },
    //     {
    //       title: 'C3',
    //       key: 'dxcyvo',
    //       url: '/charts/C3',
    //     },
    //   ],
    // },
    // {
    //   title: 'Icons',
    //   key: 'fla1pc',
    //   url: '/icons',
    //   icon: 'fe fe-star',
    //   children: [
    //     {
    //       title: 'Feather Icons',
    //       key: '677srg',
    //       url: '/icons/feather-icons',
    //     },
    //     {
    //       title: 'Fontawesome',
    //       key: '3ghw6l',
    //       url: '/icons/fontawesome',
    //     },
    //     {
    //       title: 'Linearicons',
    //       key: 'bwvp9',
    //       url: '/icons/linearicons-free',
    //     },
    //     {
    //       title: 'Icomoon Free',
    //       key: 'lwyu1r',
    //       url: '/icons/icomoon-free',
    //     },
    //   ],
    // },
    // {
    //   category: true,
    //   title: 'Advanced',
    //   key: 'krwgag',
    // },
    // {
    //   title: 'Form Examples',
    //   key: 'jjiyzn',
    //   url: '/advanced/form-examples',
    //   icon: 'fe fe-menu',
    // },
    // {
    //   title: 'Email Templates',
    //   key: '81n64m',
    //   url: '/advanced/email-templates',
    //   icon: 'fe fe-mail',
    // },
    // {
    //   title: 'Pricing Tables',
    //   key: 'jk7lfk',
    //   url: '/advanced/pricing-tables',
    //   icon: 'fe fe-command',
    // },
    // {
    //   title: 'Invoice',
    //   key: 'kf8csg',
    //   url: '/advanced/invoice',
    //   icon: 'fe fe-file-text',
    // },
    // {
    //   title: 'Utilities',
    //   key: 'buvas4',
    //   url: '/advanced/utilities',
    //   icon: 'fe fe-hard-drive',
    // },
    // {
    //   title: 'Grid',
    //   key: 'thqbnl5',
    //   url: '/advanced/grid',
    //   icon: 'fe fe-grid',
    // },
    // {
    //   title: 'Typography',
    //   key: '59lm7a',
    //   url: '/advanced/typography',
    //   icon: 'fe fe-type',
    // },
    // {
    //   title: 'Colors',
    //   key: '97ptgj',
    //   url: '/advanced/colors',
    //   icon: 'fe fe-feather',
    // },
    // {
    //   title: 'Nested Items',
    //   key: '7nnrzj',
    //   url: '/nested',
    //   icon: 'fe fe-layers',
    //   children: [
    //     {
    //       title: 'Level 1',
    //       key: '9314t',
    //       url: '/nested/1',

    //       children: [
    //         {
    //           title: 'Level 2',
    //           key: '423uh',
    //           url: '/nested/2',
    //         },
    //       ],
    //     },
    //   ],
    // },

    // VB:REPLACE-END:MENU-CONFIG
  ]
}

function getClinicMenu() {
  const clinicRoutes = [
    {
      url: '/dashboard',
      title: 'Dashboard',
      key: '1',
      icon: 'fa fa-home',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
      type: 'clinic',
    },

    {
      url: '/clinics',
      title: 'Manage Clinic',
      key: '2',
      icon: 'fa fa-hospital-o',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
      type: 'clinic',
      children: [
        {
          url: '/clinicDetails',
          title: 'Clinic Detail',
          key: '3',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },

        {
          url: '/addPatientFromAdmins',
          title: 'Add Patient',
          key: '4',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/patientlist',
          title: 'Patients list ',
          key: '5',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        // {
        //   url: '/clinicStaff',
        //   title: 'Staff',
        //   key: '4',
        // },
        // {
        //   url: '/clinicDoctors',
        //   title: 'Doctors',
        //   key: '44',
        // },
        {
          url: '/appointmentManagerSetting',
          title: 'provider',
          key: '2928',
          icon: 'fa fa-hospital-o',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
          doctorBased: true,
          children: [
            {
              url: '/appointmentManagerSetting',
              title: 'Appointment',
              key: '289',
              keyRoles: [
                CONSTANT.ROLES.SUPER_ADMIN,
                CONSTANT.ROLES.ADMIN,
                CONSTANT.ROLES.STAFF,
                CONSTANT.ROLES.DOCTOR,
              ],
            },
            {
              url: '/userManagement',
              title: 'Management',
              key: '28s9',
              keyRoles: [
                CONSTANT.ROLES.SUPER_ADMIN,
                CONSTANT.ROLES.ADMIN,
                CONSTANT.ROLES.STAFF,
                CONSTANT.ROLES.DOCTOR,
              ],
            },
            {
              url: '/doctorService',
              title: 'Services',
              key: '28sw9sw',
              keyRoles: [
                CONSTANT.ROLES.SUPER_ADMIN,
                CONSTANT.ROLES.ADMIN,
                CONSTANT.ROLES.STAFF,
                CONSTANT.ROLES.DOCTOR,
              ],
            },
            {
              url: '/invoiceList',
              title: 'Invoice List',
              key: '28sw9sssw',
              keyRoles: [
                CONSTANT.ROLES.SUPER_ADMIN,
                CONSTANT.ROLES.ADMIN,
                CONSTANT.ROLES.STAFF,
                CONSTANT.ROLES.DOCTOR,
              ],
            },
            // {
            //   url: '/services',
            //   title: 'Reminders',
            //   key: '28sqw9ws',
            // },
            // {
            //   url: '/services',
            //   title: 'Billing',
            //   key: '28sw9',
            // },
          ],
        },
      ],
    },
    {
      url: '/#',
      title: 'Doctor',
      key: '2',
      icon: 'fa fa-hospital-o',
      keyRoles: [CONSTANT.ROLES.DOCTOR],
      type: 'clinic',
      children: [
        {
          url: '/appointmentManagerSetting',
          title: 'Appointment',
          key: '2928',
          icon: 'fa fa-hospital-o',
          children: [
            {
              url: '/appointmentManagerSetting',
              title: 'Appointment',
              key: '289',
              keyRoles: [CONSTANT.ROLES.DOCTOR],
            },
            {
              url: '/userManagement',
              title: 'Management',
              key: '28s9',
              keyRoles: [CONSTANT.ROLES.DOCTOR],
            },
            {
              url: '/doctorService',
              title: 'Services',
              key: '28sw9sw',
              keyRoles: [CONSTANT.ROLES.DOCTOR],
            },
            // {
            //   url: '/services',
            //   title: 'Reminders',
            //   key: '28sqw9ws',
            // },
            // {
            //   url: '/services',
            //   title: 'Billing',
            //   key: '28sw9',
            // },
          ],
        },
      ],
    },
    // {
    //   url: '/reports',
    //   title: 'Reports *',
    //   key: '5',
    //   icon: 'fa fa-file-text-o',
    //   keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
    //   type: 'clinic',
    //   children: [
    //     // {
    //     //   url: '/patientAppotments',
    //     //   title: 'Patient Appointments *',
    //     //   key: '7',
    //     //   // icon: 'fa fa-calendar',
    //     // },
    //     {
    //       url: '/bookAppointmentByDoctor',
    //       title: 'Appointments by Doc',
    //       key: '8',
    //       // icon: 'fa fa-user-md',
    //     },
    //     // {
    //     //   url: '/claimEntry',
    //     //   title: 'Billing',
    //     //   key: '10',
    //     //   // icon: 'fa fa-paste',
    //     // },
    //   ],
    // },
    {
      url: '/addevents',
      title: 'Events',
      key: '123123231',
      icon: 'fa fa-calendar-o',
      type: 'clinic',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
      children: [
        {
          url: '/addEvents',
          title: 'Add Event',
          key: '213qdsad23',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
        },
        {
          url: '/viewEvents',
          title: 'Edit Events',
          key: 'uiouioyuioasdasdas',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
        },
        {
          url: '/workshop',
          title: 'Register for Workshop',
          key: 'sadsdasdasdsd',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
        },
        {
          url: '/events',
          title: 'Register for Events',
          key: 'e343243',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
        },
      ],
    },
    {
      url: '/userProfile',
      title: 'Profile',
      key: 'sss9jshs',
      icon: 'fa fa-user-md',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
      type: 'clinic',
    },

    {
      url: '/company/dashboard',
      title: 'Dashboard',
      key: '345656',
      icon: 'icmn-home2',
      menuItemBasedOnCom: true,
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
      type: 'company',
    },
    {
      url: '/clinics',
      title: 'Manage Accounts',
      key: '2',
      icon: 'fa fa-hospital-o',
      menuItemBasedOnCom: true,
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
      type: 'company',
      children: [
        {
          url: '/groups',
          title: 'Manage Groups',
          key: '421',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
        },
        {
          url: '/manageEmployees',
          title: 'Manage Employees',
          key: '4skj',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
        },
        // {
        //   url: '/appointmentManagerSetting',
        //   title: 'provider',
        //   key: '2928',
        //   icon: 'fa fa-hospital-o',
        //   children: [
        //     {
        //       url: '/appointmentManagerSetting',
        //       title: 'Appointment',
        //       key: '289',
        //     },
        //     {
        //       url: '/userManagement',
        //       title: 'Management',
        //       key: '28s9',
        //     },
        //     {
        //       url: '/doctorService',
        //       title: 'Services',
        //       key: '28sw9sw',
        //     },
        //     {
        //       url: '/services',
        //       title: 'Reminders',
        //       key: '28sqw9ws',
        //     },
        //     {
        //       url: '/services',
        //       title: 'Billing',
        //       key: '28sw9',
        //     },
        //   ]
        // }
      ],
    },

    {
      url: '/clinics',
      title: 'Report',
      key: 'ss2',
      icon: 'fa fa-hospital-o',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
      type: 'company',
      children: [
        {
          url: '/clinicStaff',
          title: 'Employee Report',
          key: '42sss1',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
        },
        {
          url: '/clinicStaff',
          title: 'Usage Report',
          key: '4skddj',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
        },
      ],
    },
    {
      url: '/addevents',
      title: 'Events zsdffsdaf',
      key: '123123231',
      icon: 'fa fa-calendar-o',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
      children: [
        {
          url: '/addEvents',
          title: 'Add Event',
          key: '213qdsad23',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
        },
        {
          url: '/viewEvents',
          title: 'Edit Events',
          key: 'asdasdasdpuiood',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
        },
        {
          url: '/workshop',
          title: 'Register for Workshop',
          key: 'poipoipofkjb',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
        },
        {
          url: '/events',
          title: 'Register for Events',
          key: 'e343243',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
        },
      ],
    },

    {
      url: '/users',
      title: 'Manage Users',
      key: 'sss9jshs13',
      icon: 'fa fa-user-md',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN],
      type: 'company',
    },

    {
      url: '/addEvents',
      title: 'Events',
      key: '123123231',
      icon: 'fa fa-calendar-o',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
      type: 'company',
      children: [
        {
          url: '/addEvents',
          title: 'Add Event',
          key: '213qdsad23',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
        },
        {
          url: '/viewEvents',
          title: 'Edit Events',
          key: '123asds2',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
        },
        {
          url: '/workshop',
          title: 'Register for Workshop',
          key: 'dfgffgdasdsdsafg',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
        },
        {
          url: '/events',
          title: 'Register for Events',
          key: 'e343243',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.DOCTOR],
        },
      ],
    },
    {
      url: '/userProfile',
      title: 'Profile',
      key: 'sss9jshs',
      icon: 'fa fa-user-md',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
      type: 'company',
    },
    {
      url: '/userProfile',
      title: 'Profile',
      key: 'sss9jshs',
      icon: 'fa fa-user-md',
      keyRoles: [CONSTANT.ROLES.DOCTOR],
      type: 'clinic',
    },
  ]
  return clinicRoutes
}

function getClinicDoctorMenu() {
  return [
    // VB:REPLACE-START:MENU-CONFIG
    {
      url: '/dashboard',
      title: 'Dashboard',
      key: '1',
      icon: 'fa fa-home',
      keyRoles: [
        CONSTANT.ROLES.SUPER_ADMIN,
        CONSTANT.ROLES.ADMIN,
        CONSTANT.ROLES.STAFF,
        CONSTANT.ROLES.DOCTOR,
      ],
    },
    {
      url: '/analytics',
      title: 'Analytics',
      key: '85',
      icon: 'fa fa-bar-chart',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.STAFF],
    },
    {
      url: '/clinics',
      title: 'Doctor',
      key: '2',
      icon: 'fa fa-hospital-o',
      keyRoles: [
        CONSTANT.ROLES.SUPER_ADMIN,
        CONSTANT.ROLES.ADMIN,
        CONSTANT.ROLES.STAFF,
        CONSTANT.ROLES.DOCTOR,
      ],
      children: [
        {
          url: '/clinicDetails',
          title: 'Clinic Detail',
          keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN, CONSTANT.ROLES.STAFF],
        },
        {
          url: '/appointmentManagerSetting',
          title: 'Appointments',
          key: '',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/managements',
          title: 'Schedule',
          key: '',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/doctorService',
          title: 'Services',
          key: '',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/callHistory',
          title: 'Call History',
          key: '',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/patientListForDoctor',
          title: 'Patients List',
          key: '',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/invoiceList',
          title: 'Invoice List',
          key: '',
          keyRoles: [CONSTANT.ROLES.DOCTOR],
        },
      ],
    },
    {
      url: '/addEvents',
      title: 'Events',
      key: '123123231',
      icon: 'fa fa-calendar-o',
      keyRoles: [
        CONSTANT.ROLES.SUPER_ADMIN,
        CONSTANT.ROLES.ADMIN,
        CONSTANT.ROLES.STAFF,
        CONSTANT.ROLES.DOCTOR,
      ],

      children: [
        {
          url: '/addEvents',
          title: 'Add Event',
          key: '213qdsad23',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/viewEvents',
          title: 'Edit Events',
          key: '123asds2',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/workshop',
          title: 'Register for Workshop',
          key: 'registerFroWorkshop',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/events',
          title: 'Register for Events',
          key: 'e343243',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
      ],
    },
    {
      url: '/userProfile',
      title: 'Profile',
      key: 'sss9jshs',
      icon: 'fa fa-user-md',
      keyRoles: [
        CONSTANT.ROLES.SUPER_ADMIN,
        CONSTANT.ROLES.ADMIN,
        CONSTANT.ROLES.STAFF,
        CONSTANT.ROLES.DOCTOR,
      ],
    },
  ]
}

function getAssistedMenu() {
  return [
    // VB:REPLACE-START:MENU-CONFIG
    {
      url: '/dashboard',
      title: 'Dashboard',
      key: '1',
      icon: 'fa fa-home',
      keyRoles: [
        CONSTANT.ROLES.SUPER_ADMIN,
        CONSTANT.ROLES.ADMIN,
        CONSTANT.ROLES.STAFF,
        CONSTANT.ROLES.DOCTOR,
      ],
    },

    {
      url: '/clinics',
      title: 'Manage living',
      key: '2',
      icon: 'fa fa-hospital-o',
      keyRoles: [CONSTANT.ROLES.SUPER_ADMIN, CONSTANT.ROLES.ADMIN],
      type: 'clinic',
      children: [
        {
          url: '/clinicDetails',
          title: 'Assisted Living Detail',
          key: '3',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },

        {
          url: '/addPatientFromAdmins',
          title: 'Add Patient',
          key: '4',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/patientlist',
          title: 'Patient list ',
          key: '5',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        // {
        //   url: '/clinicStaff',
        //   title: 'Staff',
        //   key: '4',
        // },
        // {
        //   url: '/clinicDoctors',
        //   title: 'Doctors',
        //   key: '44',
        // },
        {
          url: '/appointmentManagerSetting',
          title: 'provider',
          key: '2928',
          icon: 'fa fa-hospital-o',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
          doctorBased: true,
          children: [
            {
              url: '/appointmentManagerSetting',
              title: 'Appointment',
              key: '289',
              keyRoles: [
                CONSTANT.ROLES.SUPER_ADMIN,
                CONSTANT.ROLES.ADMIN,
                CONSTANT.ROLES.STAFF,
                CONSTANT.ROLES.DOCTOR,
              ],
            },
            {
              url: '/userManagement',
              title: 'Management',
              key: '28s9',
              keyRoles: [
                CONSTANT.ROLES.SUPER_ADMIN,
                CONSTANT.ROLES.ADMIN,
                CONSTANT.ROLES.STAFF,
                CONSTANT.ROLES.DOCTOR,
              ],
            },
            {
              url: '/doctorService',
              title: 'Services',
              key: '28sw9sw',
              keyRoles: [
                CONSTANT.ROLES.SUPER_ADMIN,
                CONSTANT.ROLES.ADMIN,
                CONSTANT.ROLES.STAFF,
                CONSTANT.ROLES.DOCTOR,
              ],
            },
            {
              url: '/invoiceList',
              title: 'Invoice List',
              key: '28sw9sssw',
              keyRoles: [
                CONSTANT.ROLES.SUPER_ADMIN,
                CONSTANT.ROLES.ADMIN,
                CONSTANT.ROLES.STAFF,
                CONSTANT.ROLES.DOCTOR,
              ],
            },
            // {
            //   url: '/services',
            //   title: 'Reminders',
            //   key: '28sqw9ws',
            // },
            // {
            //   url: '/services',
            //   title: 'Billing',
            //   key: '28sw9',
            // },
          ],
        },
      ],
    },
    {
      url: '/addEvents',
      title: 'Events',
      key: '123123231',
      icon: 'fa fa-calendar-o',
      keyRoles: [
        CONSTANT.ROLES.SUPER_ADMIN,
        CONSTANT.ROLES.ADMIN,
        CONSTANT.ROLES.STAFF,
        CONSTANT.ROLES.DOCTOR,
      ],

      children: [
        {
          url: '/addEvents',
          title: 'Add Event',
          key: '213qdsad23',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/viewEvents',
          title: 'Edit Events',
          key: '123asds2',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/workshop',
          title: 'Register for Workshop',
          key: 'registerFroWorkshop',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
        {
          url: '/events',
          title: 'Register for Events',
          key: 'e343243',
          keyRoles: [
            CONSTANT.ROLES.SUPER_ADMIN,
            CONSTANT.ROLES.ADMIN,
            CONSTANT.ROLES.STAFF,
            CONSTANT.ROLES.DOCTOR,
          ],
        },
      ],
    },
    {
      url: '/userProfile',
      title: 'Profile',
      key: 'sss9jshs',
      icon: 'fa fa-user-md',
      keyRoles: [
        CONSTANT.ROLES.SUPER_ADMIN,
        CONSTANT.ROLES.ADMIN,
        CONSTANT.ROLES.STAFF,
        CONSTANT.ROLES.DOCTOR,
      ],
    },
  ]
}

export default { getClinicMenu, getMenuData, getClinicDoctorMenu, getAssistedMenu }
