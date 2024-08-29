import { INavigationMenuNodeDefinition } from './navigation-menu-node-structure';

export const navigationMenuDefinition: INavigationMenuNodeDefinition = {
  label: 'Root',
  route: '/',
  children: [
    {
      icon: 'home',
      label: 'Home',
      route: '/home',
      children: [],
    },
    {
      icon: 'assessment',
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
      icon: 'person',
      label: 'Profile',
      route: '/profile',
      children: [],
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: '/settings',
      children: [],
    },
    {
      icon: 'construction',
      label: 'Sandbox',
      route: '/sandbox',
      children: [
        {
          label: 'Typography',
          route: '/sandbox/typography',
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
