import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    OpenLlama: 'Open Llama',
    EnterUsername: 'Enter your Username',
    EnterPassword: 'Enter your Password',
    Username: 'Enter Username',
    Password: 'Enter Password',
    RememberMe: 'Remember me',
    ForgotPassword: 'Forgot Password?',
    Home: 'Home',
    Library: 'Library',
    Learning: 'Learning',
    Profile: 'Profile',
    Llama: 'MyLlama',
    InvalidCredentials: 'Invalid Credentials',
    MetricMaps: 'Metric Maps',
    JobTitle: 'Job Title:',
    QuickActions: 'Quick Actions',
    Favorite: 'Favorite',
    Saved: 'Saved',
    Courses: 'Courses',
    Settings: 'Settings',
    Logout: 'Logout',
    ForToday: 'For Today',
    InProgressTasks: 'In-progress tasks',
    CurrentCourse: 'Current Course',
    CourseOutline: 'Course Outline',
    days: 'days',
    Completed: 'Completed',
    Ongoing: 'Ongoing',
    CheckProgress: 'Check Progress',
    Chapters: 'Chapters',
    CurrentlyOngoing: 'Currently Ongoing',
    CourseProgress: 'Course Progress',
    CPTA :'Check Progress, tasks, activity'

  }
}

const i18n = createI18n({
  locale: 'en', // Default locale
  messages
})

export default i18n
