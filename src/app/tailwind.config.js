import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        1: 'var(--spacing-xs)',
        2: 'var(--spacing-sm)',
        3: 'var(--spacing-md)',
        4: 'var(--spacing-lg)',
        5: 'var(--spacing-xl)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-xxl)',
      },
      borderWidth: {
        small: '1px',
        medium: '1.5px',
        large: '2px',
      },
      colors: {
        danger: '#ff5656',
        primary: {
          100: '#ffffff',
          200: '#f6f6f6',
          300: '#eeeeee',
          400: '#efeff2',
          500: '#d4d4d4',
          600: '#a8a8a8',
          700: '#707070',
          800: '#515151',
          900: '#262626',
        },
        status: {
          success: '#daffef',
          warning: '#fcecd3',
          danger: '#ffdddd',
        },
      },
      fontSize: {
        xs: ['var(--font-size-xs)'],
        sm: ['var(--font-size-sm)'],
        md: ['var(--font-size-md)'],
        lg: ['var(--font-size-lg)'],
        xl: ['var(--font-size-xl)'],
      },
      fontFamily: {
        // base font family — maps to CSS variable set in src/app/globals.css
        base: ['var(--font-family-base)'],
        // also update sans to include the variable as primary fallback
        sans: ['var(--font-family-base)', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
        extrabold: 'var(--font-weight-extrabold)',
        black: 'var(--font-weight-black)',
      },
      lineHeight: {
        base: 'var(--line-height-base)',
        sm: 'var(--line-height-sm)',
        md: 'var(--line-height-md)',
        lg: 'var(--line-height-lg)',
      },
      letterSpacing: {
        sm: 'var(--letter-spacing-sm)',
        md: 'var(--letter-spacing-md)',
      },
    },
  },
  plugins: [
    heroui({
      layout: {
        radius: {
          small: 'var(--radius-sm)',
          medium: 'var(--radius-md)',
          large: 'var(--radius-lg)',
        },
        borderWidth: {
          small: '1px',
          medium: '1.5px',
          large: '2px',
        },
      },
      themes: {
        light: {
          colors: {
            danger: '#ff5656',
            primary: {
              100: '#ffffff',
              200: '#f6f6f6',
              300: '#eeeeee',
              400: '#efeff2',
              500: '#d4d4d4',
              600: '#a8a8a8',
              700: '#707070',
              800: '#515151',
              900: '#262626',
            },
            status: {
              success: '#daffef',
              warning: '#fcecd3',
              danger: '#ffdddd',
            },
          },
          layout: {
            radius: {
              small: 'var(--radius-sm)',
              medium: 'var(--radius-md)',
              large: 'var(--radius-lg)',
            },
            borderWidth: {
              small: '1px',
              medium: '1.5px',
              large: '2px',
            },
          },
        },
      },
    }),
  ],
};

export default config;
