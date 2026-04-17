import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        border: {
          DEFAULT: 'var(--border-color)',
        },
        accent: {
          DEFAULT: '#378ADD',
          success: '#639922',
          warning: '#BA7517',
          danger: '#E24B4A',
          info: '#378ADD',
        },
        category: {
          green: '#639922',
          coral: '#D85A30',
          pink: '#D4537E',
          blue: '#378ADD',
          purple: '#7F77DD',
          teal: '#1D9E75',
          amber: '#BA7517',
          gray: '#888780',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'SF Pro Display',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        '2xs': ['0.6875rem', '1rem'],     // 11px
        xs: ['0.75rem', '1rem'],           // 12px
        sm: ['0.8125rem', '1.25rem'],      // 13px
        base: ['0.875rem', '1.25rem'],     // 14px
        lg: ['1rem', '1.5rem'],            // 16px
        xl: ['1.25rem', '1.75rem'],        // 20px
        '2xl': ['1.5rem', '2rem'],         // 24px
        '3xl': ['2rem', '2.25rem'],        // 32px
        '4xl': ['2.25rem', '2.5rem'],      // 36px
      },
    },
  },
  plugins: [],
} satisfies Config;
