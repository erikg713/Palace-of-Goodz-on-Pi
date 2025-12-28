/** @type {import('tailwindcss').Config} */
export default {
  // 1. Define paths to all of your template files
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      // 2. Add custom design tokens here (e.g., Palace of Goodz branding)
      colors: {
        brand: {
          light: '#f7fafc',
          DEFAULT: '#1a202c',
          dark: '#171923',
        },
        accent: '#38b2ac',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },

  // 3. Add official plugins to handle specific UI needs
  plugins: [
    require('@tailwindcss/forms'),      // Better styling for input fields
    require('@tailwindcss/typography'), // For styling markdown/CMS content
    require('@tailwindcss/aspect-ratio'),
  ],
}
