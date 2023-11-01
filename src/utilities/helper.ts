function isMobile() {
  return window.innerWidth <= 600
}

function getViewsList() {
  return [
    {
      name: 'Home',
      icon: 'Home',
      route: '/home'
    },
    {
      name: 'Library',
      icon: 'FolderOpen',
      route: ''
    },
    {
      name: 'Learning',
      icon: 'Colorfilter',
     route: ''
    },
    {
      name: 'Profile',
      icon: 'User',
     route: '/profile'
    }
  ]
}
function quickActions() {
  return [
    {
      name: 'Favorite',
      icon: 'isax isax-heart',
      background:
        'radial-gradient(104.17% 104.17% at 77.62% 22.26%, #FF9AAC 0%, rgba(255, 223, 213, 0.91) 100%)',
      color: '#E33F49',
      variant: 'text'
    },
    {
      name: 'Saved',
      icon: 'isax isax-archive-1',
      background: 'radial-gradient(107.87% 107.87% at 82.89% 25.12%, #6EDA93 0%, #D3FFE2 100%)',
      color: '#0E8336',
      variant: 'text'
    },
    {
      name: 'Courses',
      icon: 'isax isax-book-1',
      background: 'radial-gradient(125.04% 125.04% at 79.81% 16.31%, #F19D60 0%, #FCF0E2 100%)',
      color: '#AA5110',
      variant: 'text'
    },
    {
      name: 'Settings',
      icon: 'isax isax-setting-2',
      background: 'radial-gradient(114.12% 114.12% at 86.32% 13.29%, #A9A9A9 0%, #E8E8E8 100%)',
      color: '#3A3A3A',
      variant: 'text'
    },
    {
      name: 'Logout',
      icon: 'isax isax-logout',
      background: 'rgba(242, 161, 161, 0.06)',
      color: '#E33F49',
      variant: 'outlined'
    }
  ]
}
export { isMobile, getViewsList, quickActions }
