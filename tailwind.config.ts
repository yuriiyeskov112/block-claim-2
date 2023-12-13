import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'body-pattern': "url('/back_img.svg')"
      },
      fontFamily: {
        'sans': ["DM Sans"]
      },
      transitionProperty: {
        'height': 'height'
      },
    },
  },
  plugins: [],
}
export default config
