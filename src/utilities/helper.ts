function isMobile() {
  return window.innerWidth <= 600
}

function getViewsList() {
  return [
    {
      name: 'Home',
      icon: 'isax isax-home',
      view: ''
    },
    {
      name: 'Library',
      icon: 'isax isax-folder-open',
      view: ''
    },
    {
      name: 'Learning',
      icon: 'isax isax-colorfilter',
      view: ''
    },
    {
      name: 'Profile',
      icon: 'isax isax-user',
      view: ''
    }
  ]
}
export { isMobile, getViewsList }
