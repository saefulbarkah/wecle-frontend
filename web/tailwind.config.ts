import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--quick-sand)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--source-serif)'],
      },
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          ...colors.indigo,
        },
        success: {
          DEFAULT: '#059669',
          ...colors.emerald,
        },
        danger: {
          DEFAULT: '#f43f5e',
          ...colors.rose,
        },
        secondary: {
          DEFAULT: '#71717a',
          ...colors.zinc,
        },
      },
    },
  },
  plugins: [],
};
export default config;
