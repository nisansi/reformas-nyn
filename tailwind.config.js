/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta elegante: neutros cálidos + acento azul-petróleo
        ink: {
          50: '#f6f7f8',
          100: '#eceef0',
          200: '#d5d9dc',
          300: '#b1b8be',
          400: '#86909a',
          500: '#67717c',
          600: '#525b66',
          700: '#444b54',
          800: '#3a3f46',
          900: '#1f2329',
          950: '#14171b',
        },
        sand: {
          50: '#faf8f4',
          100: '#f3efe6',
          200: '#e7ddca',
          300: '#d6c5a3',
          400: '#c1a977',
          500: '#ae9152',
          600: '#947644',
          700: '#785e3a',
          800: '#634e35',
          900: '#534130',
          950: '#2f2117',
        },
        teal: {
          50: '#f0faf9',
          100: '#d9f2ee',
          200: '#b3e5dd',
          300: '#80d3c8',
          400: '#48baac',
          500: '#2a9d8f',
          600: '#1d7d72',
          700: '#1a6560',
          800: '#19524f',
          900: '#184440',
          950: '#0c2927',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(31, 35, 41, 0.08), 0 4px 16px -4px rgba(31, 35, 41, 0.06)',
        card: '0 4px 24px -8px rgba(31, 35, 41, 0.12)',
        lift: '0 12px 32px -12px rgba(31, 35, 41, 0.22)',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
