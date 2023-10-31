function isMobile() {
  return window.innerWidth <= 600
}

function getViewsList() {
  return [
    {
      name: 'Home',
      icon: 'Home',
      view: ''
    },
    {
      name: 'Library',
      icon: 'FolderOpen',
      view: ''
    },
    {
      name: 'Learning',
      icon: 'Colorfilter',
      view: ''
    },
    {
      name: 'Profile',
      icon: 'User',
      view: ''
    }
  ]
}
export { isMobile, getViewsList }
