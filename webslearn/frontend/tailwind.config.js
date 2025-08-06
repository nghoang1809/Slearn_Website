/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SLearn Custom Color Palette
        'header': '#0E1C2B',
        'main': '#25303D',
        'accent': '#1DE9B6',
        'card': '#2D3748',
        'border': '#374151',
        'text-header': '#0E1C2B',
        'text-white': '#FFFFFF',
        'text-gray-light': '#D1D5DB',
        'text-gray-medium': '#9CA3AF',
        'text-gray-dark': '#6B7280',
        'success': '#22C55E',
        'btn-gray': '#4B5563',
        'btn-gray-light': '#374151',
        'danger': '#EF4444',
        // Override default colors with SLearn palette
        gray: {
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#2D3748',
          900: '#25303D',
        },
        teal: {
          400: '#1DE9B6',
          500: '#1DE9B6',
          600: '#17C6A3',
        },
      },
      backgroundColor: {
        'header': '#0E1C2B',
        'main': '#25303D',
        'accent': '#1DE9B6',
        'card': '#2D3748',
      },
      textColor: {
        'header': '#0E1C2B',
        'accent': '#1DE9B6',
        'success': '#22C55E',
        'danger': '#EF4444',
      },
      borderColor: {
        'custom': '#374151',
        'accent': '#1DE9B6',
      }
    },
  },
  plugins: [],
}
