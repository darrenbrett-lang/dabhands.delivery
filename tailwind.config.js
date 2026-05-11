/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dab-cream': '#F5F3EE',
        'dab-charcoal': '#121212',
        'dab-charcoal-alt': '#171717',
        'dab-green': '#B7FF00',
        'dab-taupe': '#8A847C',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
