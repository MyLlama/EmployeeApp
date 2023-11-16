import profileIcon from '../assets/icons/profile-icon.svg'
import homeIcon from '../assets/icons/home-icon.svg'
import libraryIcon from '../assets/icons/library-icon.svg'
import learningIcon from '../assets/icons/learning-icon.svg'

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

export { isMobile, getViewsList }
