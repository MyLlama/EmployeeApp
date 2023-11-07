import profileIcon from '../assets/icons/profile-icon.svg'
import homeIcon from '../assets/icons/home-icon.svg'
import libraryIcon from '../assets/icons/library-icon.svg'
import learningIcon from '../assets/icons/learning-icon.svg'
import heartIcon from '../assets/icons/heart-icon.svg'
import savedIcon from '../assets/icons/saved-icon.svg'
import corusesIcon from '../assets/icons/courses-icon.svg'
import settingsIcon from '../assets/icons/setting-icon.svg'
import logout from '../assets/icons/logout-icon.svg'

function isMobile() {
  return window.innerWidth <= 600
}

function getViewsList() {
  return [
    {
      name: 'Home',
      icon: homeIcon,
      route: '/home'
    },
    {
      name: 'Library',
      icon: libraryIcon,
      route: ''
    },
    {
      name: 'Learning',
      icon: learningIcon,
      route: '/learning'
    },
    {
      name: 'Profile',
      icon: profileIcon,
      route: '/profile'
    }
  ]
}
function quickActions() {
  return [
    {
      name: 'Favorite',
      icon: heartIcon,
      background:
        'radial-gradient(104.17% 104.17% at 77.62% 22.26%, #FF9AAC 0%, rgba(255, 223, 213, 0.91) 100%)',
      color: '#E33F49',
      variant: 'text'
    },
    {
      name: 'Saved',
      icon: savedIcon,
      background: 'radial-gradient(107.87% 107.87% at 82.89% 25.12%, #6EDA93 0%, #D3FFE2 100%)',
      color: '#0E8336',
      variant: 'text'
    },
    {
      name: 'Courses',
      icon: corusesIcon,
      background: 'radial-gradient(125.04% 125.04% at 79.81% 16.31%, #F19D60 0%, #FCF0E2 100%)',
      color: '#AA5110',
      variant: 'text'
    },
    {
      name: 'Settings',
      icon: settingsIcon,
      background: 'radial-gradient(114.12% 114.12% at 86.32% 13.29%, #A9A9A9 0%, #E8E8E8 100%)',
      color: '#3A3A3A',
      variant: 'text'
    },
    {
      name: 'Logout',
      icon: logout,
      background: 'rgba(242, 161, 161, 0.06)',
      color: '#E33F49',
      variant: 'outlined'
    }
  ]
}
export { isMobile, getViewsList, quickActions }
