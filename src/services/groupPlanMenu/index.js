function getGroupPlan() {
  return [
    // VB:REPLACE-START:MENU-CONFIG
    {
      url: '/test',
      title: 'Dashboard *',
      key: '1',
      icon: 'fa fa-home',
    },
    {
      url: '/groups',
      title: 'Manage Account',
      key: '2',
      icon: 'fa fa-users',
      children: [
        {
          url: '/groupPlan',
          title: 'Manage Groups',
          key: '3',
        },
        {
          url: '/companyDetails',
          title: 'Manage Employees',
          key: '4',
        },
      ],
    },
    {
      url: '/test',
      title: 'Reports *',
      key: '5',
      icon: 'fa fa-file-text-o',
      children: [
        {
          url: '/test',
          title: 'Employee Report *',
          key: '6',
        },
        {
          url: '/test',
          title: 'Usage Report *',
          key: '7',
        },
        {
          url: '/userProfile',
          title: 'Profile',
          key: '8',
        },
      ],
    },
  ]
}
export default { getGroupPlan }
