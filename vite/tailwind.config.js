import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export const content = [
  "../public/**/*.html",
  './src/js/**/*.js'
]
export const theme = {
  container: {
    center: true,
    padding: '1.25rem',
  },
  colors: {
    blue: '#1b3252',
    red: colors.red,
    green: colors.green,
    accent: '#22B6E5',
    transparent: 'transparent',
    white: colors.white,
    black: colors.black,
    gray: colors.gray,
    deep: '#26282A'
  },
  extend: {
    fontFamily: {
      'sans': ['Roboto', ...defaultTheme.fontFamily.sans],
    },
    transitionTimingFunction: {
      "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
      "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
    },
  },
}
export const plugins = []

