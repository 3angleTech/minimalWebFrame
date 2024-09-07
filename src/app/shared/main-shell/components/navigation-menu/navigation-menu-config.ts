import { INavigationMenuNodeDefinition } from './navigation-menu-node-structure';

export const navigationMenuDefinition: INavigationMenuNodeDefinition = {
  label: 'Root',
  route: '/',
  children: [
    {
      icon: 'house',
      label: 'Home',
      route: '/home',
      children: [],
    },
    {
      icon: 'chart-line',
      label: 'Reports',
      route: '/reports',
      children: [
        {
          label: 'Sales',
          route: '/reports/sales',
          children: [],
        },
        {
          label: 'Expenses',
          route: '/reports/expenses',
          children: [],
        },
        {
          label: 'Performance',
          route: '/reports/performance',
          children: [],
        },
      ],
    },
    {
      icon: 'user',
      label: 'Profile',
      route: '/profile',
      children: [],
    },
    {
      icon: 'cogs',
      label: 'Settings',
      route: '/settings',
      children: [],
    },
    {
      icon: 'tools',
      label: 'Sandbox',
      route: '/sandbox',
      children: [
        {
          label: 'Styling Guide',
          route: '/sandbox/styling-guide',
          children: [],
        },
        {
          label: 'Dialogs',
          route: '/sandbox/dialogs',
          children: [],
        },
      ],
    },
  ],
};
