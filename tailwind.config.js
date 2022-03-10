module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        hrl: "url('../assets/hrl-normal.svg')",
        'hrl-condensed': "url('../assets/hrl-condensed.svg')",
      },

      spacing: {
        128: '32rem',
        144: '36rem',
      },
      colors: {
        accent: {
          DEFAULT: '#84B3B6', // CYAN - for button, bar, underline
          darker: '#859EC5', // CYAN-BLUE - hover
        },
        tertiary: {
          1: '#4FD37E', // TEALISH GREEN
          2: '#FBE105', // YELLOW
          3: '#FB8B0C', // ORANGE
          4: '#6F3DCA', // BLUISH PURPLE
        },
        nyush: {
          violet: '#402297',
          red: '#A22F49',
        },
        gray: {
          100: '#FBFBFB',
          200: '#EAEAEA',
          300: '#DFDFDF',
          400: '#999999',
          500: '#7F7F7F',
          600: '#666666',
          700: '#4C4C4C',
          800: '#333333',
          900: '#191919',
        },
        blue: {
          100: '#E6F0FD',
          200: '#CCE2FC',
          300: '#99C5FA',
          400: '#66A9F7',
          500: '#338CF5',
          600: '#0070F4',
          700: '#0064DA',
          800: '#0059C2',
          900: '#004391',
        },
        teal: {
          100: '#E6FFFA',
          200: '#B2F5EA',
          300: '#81E6D9',
          400: '#4FD1C5',
          500: '#3ABAB4',
          600: '#319795',
          700: '#2C7A7B',
          800: '#285E61',
          900: '#234E52',
        },
      },
      boxShadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, 0.16)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
        default:
          '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
        none: 'none',
      },
      fontFamily: {
        sans: ['Inter', 'Oxygen', 'ui-sans-serif', 'sans-serif', 'Segoe UI'],
        serif: ['ui-serif', 'serif'],
        mono: ['ui-monospace', 'Menlo', 'Monaco', 'Consolas', 'Courier New'],
        display: ['Inter', 'ui-sans-serif'],
        body: ['Source Sans Pro', 'Roboto', 'ui-sans-serif'],
      },
    },
  },

  variants: {
    extend: {
      transitionProperty: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
